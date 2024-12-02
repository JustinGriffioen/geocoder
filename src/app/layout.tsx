import './globals.css'

export const metadata = {
  title: 'Geocoder',
  description: 'AI-powered geocoding application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}