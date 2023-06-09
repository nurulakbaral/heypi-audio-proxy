const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')

app.use(cors())

app.get('/api/audio', async (req, res) => {
  try {
    const response = await axios.get('https://heypi.com/api/chat/voice?messageSid=D9tNCo8nQUayNiPPLds9y&voice=voice4', {
      responseType: 'arraybuffer',
      headers: {
        Cookie:
          '__cf_bm=nqfAnahhtHyIdeIeEYOnZYrzLwGiBicqg3sERyqrtdI-1686316191-0-AeqH77g2KVkw2kCpUXsGovIgqjreE7u+8zBT96jTJiq2mWYu8T0gYRNbo7xW7KYjf3mTBxPwt3S9nTRdTtMp2cE=; __Host-session=3rPcQCtu6nBX8MqdT2zES',
      },
    })

    const audioData = response.data

    // Convert audioData to base64
    const base64Data = audioData.toString('base64')

    // Send the base64 data in the response
    res.send(base64Data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})
// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001')
})

// ```
// 'use client'

// import React, { useState, useEffect } from 'react'
// export default function Home() {
//   const [audioData, setAudioData] = useState(null)
//   console.log('🪲 - audioData:', audioData)

//   useEffect(() => {
//     const fetchAudioData = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/audio')
//         const base64Data: any = await response.text()
//         setAudioData(base64Data)
//       } catch (error) {
//         console.error(error)
//       }
//     }

//     fetchAudioData()
//   }, [])

//   return (
//     <div>
//       {audioData && (
//         <audio controls>
//           <source src={`data:audio/mp3;base64,${audioData}`} type='audio/mp3' />
//         </audio>
//       )}
//     </div>
//   )
// }
// ```
