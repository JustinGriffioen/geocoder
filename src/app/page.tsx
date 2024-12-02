import Map from '@/components/Map';
import DataPanel from '@/components/DataPanel';

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <DataPanel />
      <Map />
    </main>
  );
}