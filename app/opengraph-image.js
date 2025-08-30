import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'PenDocs - Cybersecurity Documentation'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/jpeg'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img 
          src="https://raw.githubusercontent.com/FrederickStempfle/PenDocs/main/public/public-og.png" 
          alt="PenDocs"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
