import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleField = () => {
  const points = useRef()
  const particleCount = 500

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
    }

    return [positions, velocities]
  }, [])

  useFrame((state) => {
    if (!points.current) return

    const positions = points.current.geometry.attributes.position.array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Add subtle movement
      positions[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.001
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.5 + i) * 0.001
      positions[i3 + 2] += velocities[i3 + 2]

      // Wrap around boundaries
      if (positions[i3] > 10) positions[i3] = -10
      if (positions[i3] < -10) positions[i3] = 10
      if (positions[i3 + 1] > 10) positions[i3 + 1] = -10
      if (positions[i3 + 1] < -10) positions[i3 + 1] = 10
      if (positions[i3 + 2] > 10) positions[i3 + 2] = -10
      if (positions[i3 + 2] < -10) positions[i3 + 2] = 10
    }

    points.current.geometry.attributes.position.needsUpdate = true
    points.current.rotation.y = time * 0.02
    points.current.rotation.x = time * 0.01
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const FloatingOrbs = () => {
  const orb1 = useRef()
  const orb2 = useRef()
  const orb3 = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (orb1.current) {
      orb1.current.position.x = Math.sin(time * 0.3) * 3
      orb1.current.position.y = Math.cos(time * 0.4) * 2
      orb1.current.position.z = Math.sin(time * 0.2) * 2
    }

    if (orb2.current) {
      orb2.current.position.x = Math.cos(time * 0.4) * 4
      orb2.current.position.y = Math.sin(time * 0.3) * 3
      orb2.current.position.z = Math.cos(time * 0.35) * 2
    }

    if (orb3.current) {
      orb3.current.position.x = Math.sin(time * 0.35) * 5
      orb3.current.position.y = Math.cos(time * 0.45) * 2.5
      orb3.current.position.z = Math.sin(time * 0.25) * 3
    }
  })

  return (
    <>
      <mesh ref={orb1} position={[2, 1, -3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.1} />
      </mesh>
      <mesh ref={orb2} position={[-3, -1, -4]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#bf00ff" transparent opacity={0.1} />
      </mesh>
      <mesh ref={orb3} position={[0, 2, -5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#ff00f5" transparent opacity={0.1} />
      </mesh>
    </>
  )
}

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 5, 25]} />
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingOrbs />
      </Canvas>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900" />
      <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent" />
    </div>
  )
}

export default ParticleBackground
