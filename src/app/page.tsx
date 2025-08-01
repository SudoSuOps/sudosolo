'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Did Someone Hit the Block Today?</h1>
      <ConnectButton />
    </main>
  )
}

