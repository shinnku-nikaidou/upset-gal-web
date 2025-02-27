'use client'
import { HeroUIProvider } from '@heroui/react'
import { Provider } from '@/components/ui/provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Provider>{children}</Provider>
    </HeroUIProvider>
  )
}
