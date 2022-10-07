export const VERSION = "v4.1.2-rc1";

export default function checkversion() {
  const ver = localStorage.getItem('VERSION');
  if (ver !== VERSION) {
    localStorage.clear()
  }
  localStorage.setItem('VERSION', VERSION)
}

export const onedriveAccounts = ["mkw", "02", "gal", "gal2"];

export const keyMap = {
  "0": "win",
  "1": "Android直装",
  "2": "krkr",
  "3": "ons",
  "4": "rpg",
  "5": "生肉",
  "6": "模拟器",
  "7": "Artroid",
};
