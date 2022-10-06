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

export interface BGIState {
  url: string;
  changeURL: (newURL: string) => any;
}

export interface ThemeState {
  mode: Mode;
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
}

export type TKey = keyof typeof keyMap | "10" | null;
