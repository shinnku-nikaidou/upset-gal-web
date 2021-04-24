// this config just to change every react component states

let readmeState = {
    visible: true
}

let getReadmeState = () => readmeState
let setReadmeState = (newState) => {
    readmeState = newState
}

// FeedBack

let feedbackvisible = false

let getfeedbackvisible = () => feedbackvisible
let setfeedbackvisible = (bool) => { feedbackvisible = bool }

export { getReadmeState, setReadmeState, getfeedbackvisible, setfeedbackvisible }
