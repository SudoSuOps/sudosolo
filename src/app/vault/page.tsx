'use client'

import { useState } from 'react'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from 'wagmi'
import { parseEther } from 'viem'
import { VAULT_ABI } from '@/lib/abi/vault'

const VAULT_ADDRESS = '0xa8A9fdF05779DFB3Bd877B2D2FCF3Aa6Bce06F2D'

export default function VaultPage() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('0.01')

  // Read vault balance
  const { data: vaultBalance } = useReadContract({
    abi: VAULT_ABI,
    address: VAULT_ADDRESS,
    functionName: 'vaultBalance'
  })

  // Read contract owner
  const { data: owner } = useReadContract({
    abi: VAULT_ABI,
    address: VAULT_ADDRESS,
    functionName: 'owner'
  })

  // Write functions
  const { data: hash, writeContract } = useWriteContract()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleDeposit = () => {
    writeContract({
      abi: VAULT_ABI,
      address: VAULT_ADDRESS,
      functionName: 'deposit',
      value: parseEther(amount)
    })
  }

  const handleWithdraw = () => {
    if (!address) return
    writeContract({
      abi: VAULT_ABI,
      address: VAULT_ADDRESS,
      functionName: 'withdraw',
      args: [address as `0x${string}`]
    })
  }

  return (
    <main className="flex flex-col items-center p-8 gap-4">
      <h1 className="text-3xl font-bold">Vault</h1>
      <p className="text-lg">
        Current Balance:{' '}
        {vaultBalance ? `${Number(vaultBalance) / 1e18} ETH` : 'Loading...'}
      </p>

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded"
        placeholder="Amount in ETH"
      />
      <button
        onClick={handleDeposit}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isLoading ? 'Depositing...' : 'Deposit'}
      </button>

      {address && address.toLowerCase() === owner?.toLowerCase() && (
        <button
          onClick={handleWithdraw}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Withdraw (Owner Only)
        </button>
      )}

      {isSuccess && <p className="text-green-500">Transaction successful!</p>}
    </main>
  )
}

