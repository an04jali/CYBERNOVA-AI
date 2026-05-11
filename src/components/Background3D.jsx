import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const Particles = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#00C6FF" wireframe />
    </mesh>
  )
}

const Background3D = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Particles />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  )
}

export default Background3D