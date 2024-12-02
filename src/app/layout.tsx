import './globals.css';

export const metadata = {
  title: 'AI-Powered Geocoding Application',
  description: 'Advanced geocoding with AI-powered data analysis and visualization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}