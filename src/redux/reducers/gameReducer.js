import {PLANT_FLAG, SET_STATE, NEW_GAME, LOAD_GAME, SAVE_GAME,SAVE_TIME} from '../actions/gameActions.js'

const initalState={

    id:"",
    loadGame:"",
    state:"",
    time:null,
    difficulty:"",
    flag:[],
    mines:null
}

export default (state = initalState, action) =>{

    switch(action.type){


         
        case LOAD_GAME:{
            let data = JSON.parse(action.payload.game)
            return{
                ...state,
                id:action.payload._id,
                state:"load",
                loadGame:data,
                flag:JSON.parse(action.payload.flag),
                difficulty:action.payload.difficulty,
                time:action.payload.score,
                mines:data.minesLocation.length
            }
        }
        case SAVE_GAME:{
            return{
                ...state,
                savedGame:action.payload
            }
        }
       case NEW_GAME :{
        return{
            ...state,
            loadGame:"",
            
            state:"",
            flag:[],
            difficulty:action.dataGame.difficulty,
            mines:action.dataGame.mines
        }
       }
       case SET_STATE :{
           return{
            ...state,
            state:action.state,
           }
       }

       case PLANT_FLAG:{
           var existe = (state.flag.filter(cell=> cell.x === action.cell.x && cell.y === action.cell.y)[0])
           return{
               ...state,
               flag: existe ? state.flag.filter(cell=> cell.x !== action.cell.x || cell.y !== action.cell.y) : state.flag.concat(action.cell)
           }
       }
       case SAVE_TIME:{
           return{
               ...state,
               time: action.time
           }
       }

       default: return state;
    }
}