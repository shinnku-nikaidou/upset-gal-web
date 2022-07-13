import type { DirectionType } from "antd/es/config-provider";
import { keyMap } from "./consts";

import { globalTheme } from "../theme";

export type Item = {
  "@type": "folder" | "file";
  date: string;
  name: string;
  size: string;
}

export type Theme = {
  color: {
    primaryColor: string;
    errorColor: string;
    warningColor: string;
    successColor: string;
    infoColor: string;
  };
  backgroundImage?: string;
  mobile: boolean;
  direction?: DirectionType;
  hasBGImage: boolean;
}

export const setIsPC = (v: boolean) => (globalTheme.mobile = v);

export type TKey = keyof typeof keyMap | "10" | null;
