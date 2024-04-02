import { useRef, useState } from 'react'

import './App.css'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Model } from './Fan'
import { Environment, Scroll, ScrollControls } from '@react-three/drei'
import 'non.geist'
import QR from './QR'

const Page = ({ children }: { children: any }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        height: '100vh',
        width: '50%',
      }}>
      {children}
    </div>
  )
}

const MouseTilt = ({ children }: { children: any }) => {
  const ref = useRef<any>()
  const { pointer } = useThree()
  // get current mouse position and slightly change the rotation of the model

  const lerp = (start: number, end: number, t: number) =>
    start * (1 - t) + end * t

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = lerp(
        ref.current.rotation.y,
        pointer.x / 100,
        0.1
      )
      ref.current.rotation.x = lerp(
        ref.current.rotation.x,
        pointer.y / 100,
        0.1
      )
    }
  })
  return <group ref={ref}>{children}</group>
}

const Person = ({
  name,
  role,
  imgSrc,
}: {
  name: string
  role: string
  imgSrc: string
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
      <img
        src={imgSrc}
        alt={name}
        width={72}
        height={72}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <p style={{ margin: 0 }}>{role}</p>
      </div>
    </div>
  )
}

const Navbar = () => {
  const [showQR, setShowQR] = useState(false)
  return (
    <div
      style={{
        maxWidth: '768px',
        margin: 'auto',
      }}>
      <div
        style={{
          display: 'flex',
          paddingBottom: '3rem',
          position: 'fixed',
          width: '100%',
          maxWidth: '768px',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          gap: '1rem',
          background:
            'linear-gradient(0deg, #24242400 0%, #242424eb 45%, #242424 50%)',
          height: '64px',
        }}>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}>
          <img src="/logo.svg" alt="logo" width={32} height={32} />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#">Pitch</a>
            <a href="#">About</a>
          </div>
        </div>
        <button
          onClick={() => setShowQR((prev) => !prev)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            border: 'none',
          }}>
          Connect
        </button>
      </div>
      {showQR && <QR />}
    </div>
  )
}
function App() {
  return (
    <>
      <Navbar />
      <Canvas
        style={{ height: '100vh', width: '100vw' }}
        camera={{ position: [0, 0, 5] }}>
        <ScrollControls pages={6} damping={0.1}>
          <MouseTilt>
            <Model position={[2, -2.5, 0]} scale={[0.2, 0.2, 0.2]} />
          </MouseTilt>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <Environment preset="sunset" />

          <Scroll></Scroll>
          <Scroll html>
            <div
              style={{
                width: '100vw',
              }}>
              <div
                style={{
                  maxWidth: '768px',
                  margin: 'auto',
                  display: 'grid',
                }}>
                <Page>
                  <img src="/logo.svg" alt="logo" width={96} height={96} />
                  <h1
                    style={{
                      color: 'white',
                      fontFamily: 'Geist Variable',
                      textAlign: 'left',
                      margin: 0,
                      fontSize: '5rem',
                      fontWeight: 500,
                    }}>
                    ZephyrFan
                  </h1>
                </Page>
                <Page>
                  <p>We are building</p>
                  <h1 style={{ margin: 0, fontWeight: 500, fontSize: '4rem' }}>
                    AI-powered
                    <br />
                    Smart Fan
                  </h1>
                </Page>
                <Page>
                  <h3 style={{ margin: 0 }}>Face tracking</h3>
                  <p style={{ margin: 0 }}>
                    Tempor eiusmod eu sint magna aute. Occaecat id consequat
                    nostrud excepteur elit enim do. Eu ea enim cupidatat cillum
                    anim ullamco sunt. Ut magna ut eu pariatur mollit in est
                    voluptate magna eiusmod velit consequat ipsum.{' '}
                  </p>
                  <br />

                  <h3 style={{ margin: 0 }}>Gesture tracking</h3>
                  <p style={{ margin: 0 }}>
                    Tempor eiusmod eu sint magna aute. Occaecat id consequat
                    nostrud excepteur elit enim do. Eu ea enim cupidatat cillum
                    anim ullamco sunt.{' '}
                  </p>

                  <br />

                  <h3 style={{ margin: 0 }}>Object detection</h3>
                  <p style={{ margin: 0 }}>
                    Tempor eiusmod eu sint magna aute. Occaecat id consequat
                    nostrud excepteur elit enim do.
                  </p>
                </Page>
                <Page>
                  <h2 style={{ margin: 0 }}>Companion app</h2>
                  <p style={{ margin: 0 }}>
                    Tempor eiusmod eu sint magna aute. Occaecat id consequat
                    nostrud excepteur elit enim do. Eu ea enim cupidatat cillum
                    anim ullamco sunt. Ut magna ut eu pariatur mollit in est
                    voluptate magna eiusmod velit consequat ipsum.{' '}
                  </p>
                  <img src="/Phone.png" alt="phone" width={250} />
                </Page>
                <Page>
                  <Person name="Tomas" role="Software" imgSrc="/tomas.jpeg" />
                  <Person name="James" role="Hardware" imgSrc="/james.jpeg" />
                  <Person name="Mika" role="Software" imgSrc="/mika.jpeg" />
                  <Person name="Alex" role="Research" imgSrc="/alex.jpeg" />
                  <Person name="Kaleb" role="Software" imgSrc="/kaleb.jpeg" />
                  <Person name="Dan" role="Hardware" imgSrc="/dan.jpeg" />
                  <Person name="Jago" role="Hardware" imgSrc="/jago.jpg" />
                </Page>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App
