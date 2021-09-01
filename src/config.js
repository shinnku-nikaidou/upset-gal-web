// this config just to change every react component states

let readmeState = {
    visible: true
}

let getReadmeState = () => readmeState
let setReadmeState = (newState) => {
    readmeState = newState
}

// FeedBack
let ismobile = false;
let getismobile = () => ismobile
let setismobile = v => {
    ismobile = v
}

export { getReadmeState, setReadmeState, getismobile, setismobile }
