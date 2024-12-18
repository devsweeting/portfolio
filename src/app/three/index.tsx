"use client";
import React, { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
// Environment
import { useTexture, useEnvironment } from "@react-three/drei";
import { Physics, useSphere } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA, Bloom } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Outlines } from "./Outlines";
import { InstancedBufferAttribute } from "three";
import { Leva } from "leva";

// https://r3f.docs.pmnd.rs/api/objects#using-3rd-party-objects-declaratively
extend({ Leva });

const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

//Material on Sphere
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.2,
  metalness: 1.0,
  envMapIntensity: 1,
});

export default function Demo3d() {
  const { background } = useControls({
    background: {
      options: {
        White: "#dfdfdf",
        Red: "#ff0000",
        Green: "#00ff00",
        Blue: "#0000ff",
        Yellow: "#ffff00",
        Purple: "#800080",
      },
      value: "#dfdfdf", // Default color
    },
  });

  const { brightness } = useControls({
    brightness: { value: 2.5, step: 0.5, min: 0, max: 2.5 },
  });

  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}
    >
      {/* <Leva
        fill // default = false,  true makes the pane fill the parent dom node it's rendered in
        flat // default = false,  true removes border radius and shadow
        oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
        collapsed // default = false, when true the GUI is collpased
      /> */}
      {/* O.G is 0.5 */}
      <ambientLight intensity={brightness} />

      {/* Test */}
      {/* <directionalLight
        position={[5, 10, 5]}
        intensity={0.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      /> */}

      <color attach="background" args={[background]} />
      <spotLight
        intensity={1}
        angle={0.2}
        penumbra={1}
        position={[30, 30, 30]}
        castShadow
        shadow-mapSize={[512, 512]}
      />

      {/* Physics and 3D objects */}
      <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump />
      </Physics>

      {/* Postprocessing effects */}
      <EffectComposer>
        <N8AO
          halfRes
          color="black"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
          quality="high"
        />
        <Bloom mipmapBlur levels={7} intensity={5} />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3() }) {
  const { outlines } = useControls({
    outlines: { value: 0.0, step: 0.01, min: 0, max: 0.05 },
  });
  // console.log("Outlines:", outlines);

  const { sphereColor } = useControls({
    sphereColor: {
      options: {
        White: "#ffffff",
        Red: "#ff0000",
        Green: "#00ff00",
        Blue: "#0000ff",
        Yellow: "#ffff00",
        Purple: "#800080",
      },
      value: "#ffffff", // Default color
    },
  });

  // uncomment to adjust
  // const { quantity } = useControls({
  //   quantity: { value: 40, step: 1, min: 1, max: 40 }, // Initial value: 1
  // });
  const quantity = 40;

  // console.log("colors", sphereColor);
  const texture = useTexture("/images/cross.jpg");
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));
  useFrame((state) => {
    console.log("state in useframe", state);
    for (let i = 0; i < quantity; i++) {
      // Get current whereabouts of the instanced sphere
      if (ref.current !== null) {
        ref.current.getMatrixAt(i, mat);
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
  });

  // Creates sphere's in random colors
  // useEffect(() => {
  //   const colors = [];
  //   for (let i = 0; i < 40; i++) {
  //     colors.push(Math.random(), Math.random(), Math.random()); // Random RGB values
  //   }
  //   const colorAttribute = new InstancedBufferAttribute(
  //     new Float32Array(colors),
  //     3
  //   );
  //   ref?.current?.geometry?.setAttribute("color", colorAttribute);
  // }, [ref]);

  useEnvironment;

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
  console.log("viewport", viewport);
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
      <pointLight intensity={2} distance={15} />
    </mesh>
  );
}
