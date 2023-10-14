import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ThemeState, Mode } from '@/types/theme'
import { DirectionType } from 'antd/lib/config-provider'

type ModeState = {
  mode: Mode
  setMode: (newmode: Mode) => void
}

export const useModeStore = create<ModeState>((set) => ({
  mode: 'light',
  setMode: (newmode: Mode) => set({ mode: newmode }),
}))

const useGlobalTheme = create<ThemeState>()(
  persist(
    (set) => ({
      url: 'default',
      direction: 'ltr',
      hasBGImage: true,
      color: '#52c41a',
      fontSize: 14,

      changeURL: (newURL: string) =>
        set(() => {
          console.log(`in changeURL, newURL is ${newURL}`)
          return { url: newURL }
        }),

      changeFontSize: (fontSize: number) => set(() => ({ fontSize: fontSize })),

      changePrimaryColor: (value: string) =>
        set(() => {
          console.log(`new PrimaryColor is ${value}`)
          return { color: value }
        }),

      changeDirection: (dir: DirectionType) => set(() => ({ direction: dir })),

      changeBGI: (flag: boolean) => {
        set(() => {
          console.log(`has bgi? ${flag}`)
          return { hasBGImage: flag }
        })
      },
    }),
    {
      name: 'legacy-theme', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useGlobalTheme
