// this config just to change every react component states
// import cookie from 'react-cookies'
// import { globalTheme } from "./theme";

export let storage = localStorage;

// export const setisPC = (v: boolean) => (globalTheme.mobile = v);

const onedrive_accounts = ["mkw", "02", "gal", "gal2"]

// random_onedrive_account_id
export const RAI: string = (() => {
    let a = Math.floor(Math.random() * onedrive_accounts.length)
    console.log(`Using the ${onedrive_accounts[a]} onedrive account to provide the service`)
    return onedrive_accounts[a]
})()
