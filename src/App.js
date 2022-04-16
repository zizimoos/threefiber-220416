import { useState, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";

function Spin({ children }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01;
  });
  return <group ref={ref}>{children}</group>;
}

function Cube(props) {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scale, color } = useSpring({
    scale: hovered ? 1.2 : 1,
    color: active ? "hotpink" : "teal",
  });

  return (
    <a.mesh
      {...props}
      scale={scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <a.meshBasicMaterial color={color} />
    </a.mesh>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Spin>
        <Cube />
      </Spin>
      <Cube position={[1.5, 1, 1]} />
      <Cube position={[-1.5, 1, 1]} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
