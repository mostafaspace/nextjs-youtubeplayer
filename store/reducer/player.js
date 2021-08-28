import {SAVE_VIDEO, SAVE_VIDEO_TIME} from '../actions/playerTypes';
const initialState = {
    videoId: '',
    timestamp: 0,
    videoTime: 0
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_VIDEO:
            console.log('payload', action.payload)
            return {...state, ...action.payload};
        case SAVE_VIDEO_TIME:
            return {...state, ...action.payload};



        default: return state;

    }
};

export default playerReducer;
