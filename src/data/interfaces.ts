import type { DirectionType } from "antd/es/config-provider";
import { keyMap } from "./consts";

export type Item = {
  "@type": "folder" | "file";
  date: string;
  name: string;
  size: string;
}

export type Mode = "light" | "dark";

export type Theme = {
  mode: Mode;
  url: string;
  color: {
    primaryColor: string;
    errorColor: string;
    warningColor: string;
    successColor: string;
    infoColor: string;
  };
  mobile: boolean;
  direction?: DirectionType;
  hasBGImage: boolean;
}

export interface ThemeState {
  changeURL: any;
  mode: Mode;
  url: string;
  color: {
    primaryColor: string;
    errorColor: string;
    warningColor: string;
    successColor: string;
    infoColor: string;
  };
  direction?: DirectionType;
  hasBGImage: boolean;

  changePrimaryColor: Function;
  changeDirection: (dir: DirectionType) => any;
  changeMode: Function;
  changeBGI: Function;
}

export type TKey = keyof typeof keyMap | "10" | null;
