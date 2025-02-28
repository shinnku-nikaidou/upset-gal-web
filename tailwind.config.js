/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/react'

export const content = [
  // ...
  // make sure it's pointing to the ROOT node_module
  './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
  extend: {},
}
export const darkMode = 'class'
plugins = [heroui()]
