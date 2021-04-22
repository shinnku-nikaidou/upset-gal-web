// this config just to change every react component states

let readmeState = {
    visible: true
}

let getReadmeState = () => readmeState
let setReadmeState = (newState) => {
    readmeState = newState
}

export { getReadmeState, setReadmeState }
