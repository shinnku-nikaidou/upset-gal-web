// this config just to change every react component states
// import cookie from 'react-cookies'

let ismobile = false;
let getismobile = () => ismobile;
let setismobile = (v: boolean) => {
  ismobile = v;
};

export { getismobile, setismobile };
