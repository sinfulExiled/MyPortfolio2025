import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    // Per-mount state. Under React StrictMode the effect runs twice in dev
    // (mount -> cleanup -> remount); everything below must be created fresh
    // here and fully torn down in the returned cleanup so the second mount
    // starts from a clean slate and matches the production (single-mount)
    // render.
    let cancelled = false;
    let rafId = 0;
    let debounce: number | undefined;
    let loadedCharacter: THREE.Object3D | null = null;

    let rect = canvasDiv.current.getBoundingClientRect();
    let container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer;

    const clock = new THREE.Clock();

    const light = setLighting(scene);
    let progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    const disposeObject = (object: THREE.Object3D) => {
      object.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((m: THREE.Material) => m.dispose());
          } else {
            material?.dispose();
          }
        }
      });
    };

    loadCharacter().then((gltf) => {
      if (!gltf) return;
      // The first (torn-down) StrictMode mount can resolve after cleanup;
      // don't touch the discarded scene — just release the GPU resources.
      if (cancelled) {
        disposeObject(gltf.scene);
        return;
      }
      const animations = setAnimations(gltf);
      hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
      mixer = animations.mixer;
      let character = gltf.scene;
      loadedCharacter = character;
      scene.add(character);
      headBone = character.getObjectByName("spine006") || null;
      screenLight = character.getObjectByName("screenlight") || null;
      progress.loaded().then(() => {
        setTimeout(() => {
          if (cancelled) return;
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });
      window.addEventListener("resize", onResize);
    });

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    const onResize = () => {
      if (loadedCharacter) {
        handleResize(renderer, camera, canvasDiv, loadedCharacter);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };
    const onTouchMove = (e: TouchEvent) =>
      handleTouchMove(e, (x, y) => (mouse = { x, y }));
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", onTouchMove);
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(debounce);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      if (loadedCharacter) disposeObject(loadedCharacter);
      const environment = scene.environment;
      scene.environment = null;
      environment?.dispose();
      scene.clear();
      renderer.dispose();
      if (
        canvasDiv.current &&
        renderer.domElement.parentNode === canvasDiv.current
      ) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
