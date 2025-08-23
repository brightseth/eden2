export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-6xl">
        <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8">
          EDEN2
        </h1>
        <p className="text-xl md:text-2xl mb-12 opacity-80">
          PROTOTYPE / NEW BEGINNING
        </p>
        <div className="flex flex-col gap-4 text-lg">
          <a 
            href="#" 
            className="hover:opacity-60 transition-opacity"
          >
            → EXPLORE
          </a>
          <a 
            href="#" 
            className="hover:opacity-60 transition-opacity"
          >
            → CREATE
          </a>
          <a 
            href="#" 
            className="hover:opacity-60 transition-opacity"
          >
            → CONNECT
          </a>
        </div>
      </main>
    </div>
  );
}