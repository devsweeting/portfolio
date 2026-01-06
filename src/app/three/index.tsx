"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import { Physics, useSphere } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA, Bloom } from "@react-three/postprocessing";
import { Outlines } from "./Outlines";
import useIsMobile from "../utils/useIsMobile";

// Constants
const SPHERE_COUNT = 40;
const SPHERE_RADIUS = 1;
const POINTER_RADIUS = 3;
const POINTER_SCALE = 0.2;
const GRAVITY_FORCE = -40;
const MOBILE_CAMERA_Z = 30;
const DESKTOP_CAMERA_Z = 20;

const rfs = THREE.MathUtils.randFloatSpread;
// Increased segment count from 32,32 to 64,64 for smoother, more detailed spheres
const sphereGeometry = new THREE.SphereGeometry(SPHERE_RADIUS, 64, 64);

// Key change: roughness set to 0 (was 0.5) for more reflective, glass-like appearance
// metalness remains at 1.0
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0,
  metalness: 1.0,
  envMapIntensity: 1,
});

interface SpheresProps {
  background: string;
  brightness: number;
  sphereColor: string;
  reflectLevel: number;
  outlines: number;
  image: string;
}

interface ClumpProps {
  sphereColor: string;
  image: string;
  outlines: number;
  reflectLevel: number;
  mat?: THREE.Matrix4;
  vec?: THREE.Vector3;
}

export default function Spheres({
  background = "#dfdfdf",
  brightness = 0.5,
  sphereColor = "#ffffff",
  outlines = 0.0,
  image = "/images/cross.jpg",
  reflectLevel = 0.5,
}: SpheresProps) {
  const isMobile = useIsMobile();

  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0, isMobile ? MOBILE_CAMERA_Z : DESKTOP_CAMERA_Z],
        fov: 35,
        near: 1,
        far: 40,
      }}
    >
      <ambientLight intensity={brightness} />
      <color attach="background" args={[background]} />

      {/* Added spotLight for better definition and shadows like in demo */}
      <spotLight
        intensity={1}
        angle={0.2}
        penumbra={1}
        position={[30, 30, 30]}
        castShadow
        shadow-mapSize={[512, 512]}
      />

      <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump
          sphereColor={sphereColor}
          image={image}
          outlines={outlines}
          reflectLevel={reflectLevel}
        />
      </Physics>

      <Environment files="/images/sphereChrome.jpg" />

      {/* Added disableNormalPass for better performance */}
      <EffectComposer enableNormalPass multisampling={0}>
        <N8AO
          halfRes
          color="black"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
        />
        <Bloom mipmapBlur levels={7} intensity={1} />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}

function Clump({
  sphereColor,
  image,
  outlines,
  reflectLevel = 0.5,
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
}: ClumpProps) {
  const texture = useTexture(image);

  const [ref, api] = useSphere<THREE.InstancedMesh>(() => ({
    args: [SPHERE_RADIUS],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));

  useFrame(() => {
    if (!ref.current) return;

    for (let i = 0; i < SPHERE_COUNT; i++) {
      ref.current.getMatrixAt(i, mat);

      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(GRAVITY_FORCE)
            .toArray(),
          [0, 0, 0]
        );
    }
  });

  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[sphereGeometry, baubleMaterial, SPHERE_COUNT]}
    >
      {/* Use material-map like in demo for better texture application */}
      <meshStandardMaterial
        color={sphereColor}
        map={texture}
        roughness={reflectLevel}
        metalness={1.0}
        envMapIntensity={1}
      />
      <Outlines thickness={outlines} color="black" />
    </instancedMesh>
  );
}

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [ref, api] = useSphere<THREE.Mesh>(() => ({
    type: "Kinematic",
    args: [POINTER_RADIUS],
    position: [0, 0, 0],
  }));

  // Use state.pointer instead of state.mouse for better cross-platform support
  useFrame((state) =>
    api.position.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
      0
    )
  );

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const normalizedX = (touch.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(touch.clientY / window.innerHeight) * 2 + 1;

      api.position.set(
        (normalizedX * viewport.width) / 2,
        (normalizedY * viewport.height) / 2,
        0
      );
    };

    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [viewport, api]);

  return (
    <mesh ref={ref} scale={POINTER_SCALE}>
      <sphereGeometry />
      <meshBasicMaterial color={[4, 4, 4]} toneMapped={false} />
      <pointLight intensity={8} distance={10} />
    </mesh>
  );
}
