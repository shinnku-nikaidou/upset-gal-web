// this config just to change every react component states
// import cookie from 'react-cookies'
import { globalTheme } from "./theme";

export let storage = localStorage;

export const setisPC = (v: boolean) => (globalTheme.mobile = v);

// random_onedrive_account_id
export const RAI: string = (() => {
    let a = Math.floor(Math.random() * 3) + 1
    console.log(`正在使用第${a}个onedrive帐号为您提供服务。`)
    return a.toString()
})()
