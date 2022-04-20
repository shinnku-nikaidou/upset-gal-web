// this config just to change every react component states
// import cookie from 'react-cookies'
import { globalTheme } from "./theme";

export let storage = localStorage;

export const setisPC = (v: boolean) => (globalTheme.mobile = v);

// random_onedrive_account_id
export const RAI: string = (() => {
    let a = Math.floor(Math.random() * 2) + 1
    console.log(a)
    return a.toString()
})()
