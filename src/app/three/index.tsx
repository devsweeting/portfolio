"use client";
import React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import { Physics, useSphere } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA, Bloom } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Outlines } from "./Outlines";

const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

//Material on Sphere
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0,
  // metalness: 1.0,
  envMapIntensity: 1,
});

export default function Demo3d() {
  const { background } = useControls({
    background: {
      label: "Background",
      options: {
        White: "#dfdfdf",
        Red: "#F0605D",
        Green: "#73F587",
        Blue: "#7991DB",
        Yellow: "#FAF24F",
        Purple: "#D148E1",
      },
      value: "#dfdfdf",
    },
  });

  const { brightness } = useControls({
    brightness: {
      label: "Brightness",
      value: 0.5,
      step: 0.5,
      min: 0,
      max: 2.5,
    },
  });

  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}
    >
      {/* Original lighting in Demo is 0.5 */}
      {/* <ambientLight intensity={brightness} /> */}

      {/* Test */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Original Background Color */}
      <color attach="background" args={[background]} />

      {/* Original light shadow effect */}
      {/* <spotLight
        intensity={1}
        angle={0.2}
        penumbra={1}
        position={[30, 30, 30]}
        castShadow
        shadow-mapSize={[512, 512]}
      /> */}

      {/* Physics and 3D objects */}
      <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump />
      </Physics>

      <Environment files="/images/adamsbridge.hdr" />

      {/* Postprocessing effects */}
      <EffectComposer multisampling={0}>
        <N8AO
          halfRes
          color="black"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
          quality="high"
        />
        <Bloom mipmapBlur levels={7} intensity={1} />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3() }) {
  const texture = useTexture("/images/cross.jpg");

  const { outlines } = useControls({
    outlines: { label: "Outlines", value: 0.0, step: 0.01, min: 0, max: 0.05 },
  });

  const { sphereColor } = useControls({
    sphereColor: {
      label: "Color",
      options: {
        White: "#ffffff",
        Red: "#EF1F14",
        Green: "#2FF44F",
        Blue: "#2048DB",
        Yellow: "#FAF436",
        Purple: "#D212E1",
      },
      value: "#ffffff",
    },
  });

  // uncomment to adjust
  // const { quantity } = useControls({
  //   quantity: { value: 40, step: 1, min: 1, max: 40 }, // Initial value: 1
  // });
  const quantity = 40;

  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));
  useFrame((state) => {
    for (let i = 0; i < quantity; i++) {
      // Get current whereabouts of the instanced sphere
      if (ref.current !== null) {
        // Type casting ref.current to InstancedMesh
        const instancedMesh = ref.current as THREE.InstancedMesh;
        // Make sure getMatrixAt is available
        if (instancedMesh) {
          instancedMesh.getMatrixAt(i, mat);
          // Normalize the position and multiply by a negative force.
          // This is enough to drive it towards the center-point.
          api
            .at(i)
            .applyForce(
              vec
                .setFromMatrixPosition(mat)
                .normalize()
                .multiplyScalar(-40)
                .toArray(),
              [0, 0, 0]
            );
        }
      }
    }
  });

  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[sphereGeometry, baubleMaterial, quantity]}
    >
      <meshStandardMaterial color={sphereColor} map={texture} />
      <Outlines thickness={outlines} color={"black"} />
    </instancedMesh>
  );
}

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [ref, api] = useSphere(() => ({
    type: "Kinematic",
    args: [3],
    position: [0, 0, 0],
  }));
  useFrame((state) =>
    api.position.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
      0
    )
  );
  return (
    <mesh ref={ref} scale={0.2}>
      <sphereGeometry />
      <meshBasicMaterial color={[4, 4, 4]} toneMapped={false} />
      <pointLight intensity={8} distance={10} />
    </mesh>
  );
}
