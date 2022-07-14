import type { DirectionType } from "antd/es/config-provider";
import { keyMap } from "./consts";

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

export type TKey = keyof typeof keyMap | "10" | null;
