// this config just to change every react component states
// import cookie from 'react-cookies'
import { globalTheme } from "./theme";

export let setisPC = (v: boolean) => {
  globalTheme.mobile = !v;
};

