import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

const QR = () => {
  const [code, setCode] = useState('')
  const BASE_URL = 'http://10.124.45.193:8080?code='

  useEffect(() => {
    setInterval(() => {
      fetch('http://10.124.45.193:8080/getCode')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setCode(data.code)
        })
    }, 5000)
  })

  const resetCode = () => {
    fetch('http://10.124.45.193:8080/resetCode')
  }

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
          padding: '3rem',
          gap: '1rem',
          backdropFilter: 'blur(10px)',
          alignItems: 'center',
          borderRadius: '1rem',
          backgroundColor: 'rgba(133, 133, 133, 0.5)',
        }}>
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'rgb(255, 255, 255)',
          }}>
          <QRCode value={BASE_URL + code} accentHeight={0} />
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

            alignItems: 'center',
          }}>
          <p
            style={{
              paddingLeft: '0.5rem',
            }}>
            {code || 'no code set'}
          </p>
          <button onClick={() => fetch('http://10.124.45.193:8080/resetCode')}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default QR
