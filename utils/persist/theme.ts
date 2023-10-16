import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ThemeState, Mode } from '@/types/theme'
import { DirectionType } from 'antd/lib/config-provider'

const useGlobalTheme = create<ThemeState>()(
  persist(
    (set) => ({
      url: 'default',
      direction: 'ltr',
      color: '#52c41a',
      fontSize: 14,
      mode: 'light',

      setMode: (newmode: Mode) => set({ mode: newmode }),

      changeURL: (newURL: string) =>
        set(() => {
          console.log(`in changeURL, newURL is ${newURL}`)
          return { url: newURL }
        }),

      changeFontSize: (fontSize: number) => set(() => ({ fontSize: fontSize })),

      setColor: (value: string) => set(() => ({ color: value })),

      changeDirection: (dir: DirectionType) => set(() => ({ direction: dir })),
    }),
    {
      name: 'legacy-theme', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useGlobalTheme
