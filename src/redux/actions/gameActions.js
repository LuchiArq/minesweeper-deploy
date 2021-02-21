import axios from 'axios'
import {LoadStateLocalStorage} from '../../helpers/localStorage'
export const NEW_GAME = "NEW_GAME";
export const LOAD_GAME = "LOAD_GAME";
export const SAVE_GAME = "SAVE_GAME";
export const START = "START";
export const PLANT_FLAG = "PLANT_FLAG";
export const SAVE_TIME ="SAVE_TIME";
export const SET_STATE = "SET_STATE";
export const LOADDING_GAME="LOADDING_GAME";


export function SaveGame(game){
    return function(dispatch){
        dispatch(Request())
        axios.post("https://nogcpvu4tb.execute-api.us-east-2.amazonaws.com/dev/table/createTable",game,{
            headers:{
                Authorization:LoadStateLocalStorage("dataUser").token
            }})

        .then(resp=>{})
        .catch(err=>{
            console.log("ERROR AL GUARDADO DEL JUEGO ", err)
        })
    }
}

export function LoadGame(game){
    return {
        type:LOAD_GAME,
        payload:game
    }
}

 export function SuccessSaveGame(saveGame){
    return{
        type:SAVE_GAME,
        payload:saveGame.data
    }
}

function Request(){
    return{
        type:LOADDING_GAME,
    }
}

export function newGame(dataGame){
    return{
        type:NEW_GAME,
        dataGame
    }
}

export function start(){
    return{
        type:START
    }
}

export function plantFlag(cell){
    return{
        type:PLANT_FLAG,
        cell
    }
}

export function saveTime(time){
    return{
        type:SAVE_TIME,
        time
    }
}

export function setStateGame(state){
    return{
        type:SET_STATE,
        state
    }
}
