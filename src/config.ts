// this config just to change every react component states
// import cookie from 'react-cookies'

let ismobile = false;
let getisPC = () => ismobile;
let setisPC = (v: boolean) => {
  ismobile = v;
};

export { getisPC, setisPC };
