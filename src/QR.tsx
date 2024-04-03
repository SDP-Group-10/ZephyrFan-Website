import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { WarningTriangle } from 'iconoir-react'

const QR = () => {
  const [code, setCode] = useState('')
  const [validPassword, setValidPassword] = useState(false)

  useEffect(() => {
    setInterval(() => {
      fetch('http://10.126.13.69:8080/getCode')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setCode(data.code)
        })
    }, 5000)
  })

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          padding: '2rem',
          gap: '1rem',
          backdropFilter: 'blur(10px)',
          alignItems: 'center',
          borderRadius: '1rem',
          backgroundColor: 'rgba(133, 133, 133, 0.5)',
          WebkitBackdropFilter: 'blur(10px)',
        }}>
        <h3
          style={{
            color: 'white',
            padding: '0.5rem',
            borderRadius: '1rem',
            gap: '0.5rem',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 0,
          }}>
          <WarningTriangle
            width={24}
            height={24}
            color="white"
            strokeWidth={2}
          />{' '}
          Admin area
        </h3>
        <input
          type="password"
          placeholder="Admin password"
          style={{
            padding: '0.5rem',
            borderRadius: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            border: 'none',
          }}
          onChange={(e) => {
            if (e.target.value === 'group10') {
              setValidPassword(true)
            }
          }}
        />
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'rgb(255, 255, 255)',
            filter: `blur(${validPassword ? 0 : 7}px)`,
            opacity: validPassword ? 1 : 0.5,
            transition: 'filter 0.5s, opacity 0.5s',
          }}>
          <QRCode
            value={'https://demo.zephyrfan.live/?code=' + code}
            accentHeight={0}
          />
        </div>
        <div
          style={{
            color: 'white',
            padding: '0.5rem',
            borderRadius: '1rem',
            gap: '1rem',
            backgroundColor: 'rgba(133, 133, 133, 0.5)',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            filter: `blur(${validPassword ? 0 : 10}px)`,
            transition: 'filter 0.5s',

            alignItems: 'center',
          }}>
          <p
            style={{
              paddingLeft: '0.5rem',
            }}>
            {code || 'no code set'}
          </p>
          <button onClick={() => fetch('http://10.126.13.69:8080/resetCode')}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default QR
