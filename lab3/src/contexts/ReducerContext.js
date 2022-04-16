import { createContext } from "react";
import { useState } from "react";

export const ReducerContext = createContext([{}, () => {}]);

export const initState = {
    observed: []
}

export const reducer = (state, action) => {
    const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

    const {type, payload} = action;
    let newState;

    switch(type){
        case "follow": 
            state.observed = [...state.observed, payload ];
            // newState = {observed: [...state.observed, payload ]};
            console.log({newState});
            break;

        case "unfollow": 
            let new_followed = [];

            for (const followed of state.observed){
                if(!isEqual(followed, payload)){
                    new_followed = [...new_followed, followed];
                }
            }

            // state ={observed: state.observed.filter (followed => !isEqual(followed, payload))};
            state.observed = new_followed;
            // newState =  {observed: new_followed};
            break;

        default:
            console.error(`Incorrect action type ${type}`);

    }

    // return newState;
}

