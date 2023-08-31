import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModal = () => {
  return (
    <Canvas
    shadows
    camera={{ position: [0, 0, 0], fov: 75 }}
    gl={{preserveDrawingBuffer:true}}
    className="w-full max-w-full translate-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModal;
