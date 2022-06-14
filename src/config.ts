// this config just to change every react component states
// import cookie from 'react-cookies'
import { globalTheme } from "./theme";
import { indexType } from "./type";

export let storage = localStorage;

export const setisPC = (v: boolean) => (globalTheme.mobile = v);

const onedrive_accounts = ["mkw", "02", "gal", "gal2"];

// random_onedrive_account_id
export const RAI: string = (() => {
  let a = Math.floor(Math.random() * onedrive_accounts.length);
  console.log(
    `Using the ${onedrive_accounts[a]} onedrive account to provide the service`
  );
  return onedrive_accounts[a];
})();

export const key_map = {
  0: "win",
  1: "Android直装",
  2: "krkr",
  3: "ons",
  4: "rpg",
  5: "生肉",
  6: "模拟器",
  7: "Artroid",
};

let key: indexType;
export const set_key = (newkey: indexType) => (key = newkey);
export const get_key = () => key;

export const version = "v1.3.0";
