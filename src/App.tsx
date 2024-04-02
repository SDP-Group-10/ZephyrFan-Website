import { useRef, useState } from 'react'

import './App.css'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Model } from './Fan'
import { Environment, Scroll, ScrollControls } from '@react-three/drei'
import 'non.geist'
import QR from './QR'
import styled from 'styled-components'
import {
  IconoirProvider,
  FaceId,
  PeaceHand,
  PerspectiveView,
} from 'iconoir-react'

// This code does not represent my abilities
// Very much on a time crunch
// I would have loved to make this more responsive and clean

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  height: 100vh;
  width: 50%;

  @media (max-width: 768px) {
    width: 80%;
  }
`
const Page = ({ children }: { children: any }) => {
  return <PageWrapper>{children}</PageWrapper>
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
        width: '100%',
      }}>
      <div
        style={{
          display: 'flex',
          paddingBottom: '3rem',
          position: 'fixed',
          width: '100%',
          maxWidth: '768px',
          padding: 'auto 100px',
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
            gap: '2rem',
            alignItems: 'center',
            paddingLeft: '1rem',
          }}>
          <img
            src="./logo.svg"
            alt="logo"
            width={32}
            height={32}
            onClick={() => setShowQR((prev) => !prev)}
          />

          <a href="#">About</a>
        </div>
        <a
          style={{
            padding: '0.4rem 0.8rem',
            backgroundColor: 'white',
            borderRadius: '10rem',
            border: 'none',
            marginRight: '1rem',
            color: 'black',
            textDecoration: 'none',
            cursor: 'pointer',
          }}>
          Pitch
        </a>
      </div>
      {showQR && <QR />}
    </div>
  )
}
function App() {
  return (
    <>
      <IconoirProvider
        iconProps={{
          color: '#AAAAAA',
          strokeWidth: 1,
          width: '1em',
          height: '1em',
        }}>
        <Navbar />
        <Canvas
          style={{ height: '100vh', width: '100vw' }}
          camera={{ position: [0, 0, 5] }}>
          <ScrollControls pages={5} damping={0.1}>
            <MouseTilt>
              <Model />
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
                    padding: '1rem',
                  }}>
                  <Page>
                    <img src="./logo.svg" alt="logo" width={96} height={96} />
                    <h1
                      style={{
                        color: 'white',
                        fontFamily: 'Geist Variable',
                        textAlign: 'left',
                        margin: 0,
                        fontWeight: 500,
                      }}>
                      ZephyrFan
                    </h1>
                  </Page>
                  <Page>
                    <p>We are building</p>
                    <h1 style={{ margin: 0, fontWeight: 500 }}>
                      AI-powered
                      <br />
                      Smart Fan
                    </h1>
                  </Page>
                  <Page>
                    <PeaceHand />
                    <h3 style={{ margin: 0 }}>Gesture tracking</h3>
                    <p style={{ margin: 0 }}>
                      Use your hands to control the fan from anywhere in the
                      room. Customise your gestures on the companion app.
                    </p>
                    <br />

                    <FaceId />
                    <h3 style={{ margin: 0 }}>Face tracking</h3>
                    <p style={{ margin: 0 }}>
                      Face tracking allows for accurate targetting and rejects
                      any unwanted hand gestures that are not acompanied with
                      line of sight with the fan.
                    </p>

                    <br />

                    <PerspectiveView />
                    <h3 style={{ margin: 0 }}>Object detection</h3>
                    <p style={{ margin: 0 }}>
                      When sharing a room with many people, the fan will split
                      its air flow to accomodate everyone in the room!
                    </p>
                  </Page>
                  <Page>
                    <h2 style={{ margin: 0 }}>Companion app</h2>
                    <p style={{ margin: 0 }}>
                      Customise your experience and control your fan from your
                      phone.
                    </p>
                    <img
                      src="./Phone.png"
                      alt="phone"
                      style={{ width: '50%' }}
                    />
                  </Page>
                  <Page>
                    <Person name="Alex" role="Research" imgSrc="./alex.jpeg" />
                    <Person name="Mika" role="Software" imgSrc="./mika.jpeg" />
                    <Person
                      name="Tomas"
                      role="Software"
                      imgSrc="./tomas.jpeg"
                    />
                    <Person
                      name="Kaleb"
                      role="Hardware"
                      imgSrc="./kaleb.jpeg"
                    />
                    <Person
                      name="James"
                      role="Hardware"
                      imgSrc="./james.jpeg"
                    />
                    <Person name="Dan" role="Hardware" imgSrc="./dan.jpeg" />
                    <Person name="Jago" role="Hardware" imgSrc="./jago.jpg" />
                  </Page>
                </div>
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </IconoirProvider>
    </>
  )
}

export default App
