import { DirectionType } from "antd/lib/config-provider";

export type Item = {
  "@type": "folder" | "file";
  date: string;
  name: string;
  size: string;
};

type indexType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 10;

type key_map_type = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Theme = {
  // mode: "light" | "dark";
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
};
