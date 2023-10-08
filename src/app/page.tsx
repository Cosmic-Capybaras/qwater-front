'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter();

  const moveToList = () => {
    router.push('/Locations');
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-20">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Created by&nbsp;
          <code className="font-mono font-bold">Cosmic Capybaras</code>
        </p>
      </div>
      <h1 className="relative z-10 text-4xl font-bold text-center text-white lg:text-6xl">
        Admin Panel QWater
      </h1>
      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src="/img/logo.jpg"
          alt="Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <button
        className="relative px-4 py-2 mt-8 text-sm font-bold text-white transition-all duration-200 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full shadow-lg hover:from-sky-600 hover:to-blue-600"
        onClick={moveToList}
      >
        List of locations
      </button>
    </main>
  )
}
