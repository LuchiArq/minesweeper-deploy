import {
    GET_SAVED_GAMES,
    GET_RECORDS,
    LOGOUT,
    SUCCES_REGISTER,
    SUCCES_LOGIN,
    SUCCES_PROFILE,
    LOADING_USER,
    NEW_RECORD,
    POST_SAVED_GAMES,
    ERROR_USER,
    DATA_USER,
    SUCCESS,
    DELETE
} from '../actions/userActions.js'

const initalState = {
    success: "",
    error: "",
    loading: false,
    token: "",
    records: {
        Facil: null,
        Medio: null,
        Dificil: null
    },
    name: "",
    savedGames: []
}

export default (state = initalState, action) => {
    switch (action.type) {
        case DELETE: {
            return{
                ...state,
                saveGames:state.savedGames.filter(game=> game._id !== action.payload)
            }
        }
        case SUCCESS: {
            return {
                ...state,
                welcome: ""
            }
        }
        case DATA_USER: {
            return {
                ...state,
                token: action.payload.token,
                error: "",
                loading: false,
                records: {
                    ...state.records,
                    Facil: action.payload.records.Facil && action.payload.records.Facil[0],
                    Medio: action.payload.records.Medio && action.payload.records.Medio[0],
                    Dificil: action.payload.records.Dificil && action.payload.records.Dificil[0]
                },
                name: action.payload.userName,
                savedGames: action.payload.tables
            }
        }

        case POST_SAVED_GAMES: {
            return {
                ...state,
                savedGame: state.savedGames.concat(action.payload)
            }
        }

        case NEW_RECORD: {
            return {
                ...state,
                records: {
                    ...state.records,
                    [action.payload.difficulty]: state.records[action.payload.difficulty] && state.records[action.payload.difficulty].score > action.payload.score ? action.payload : action.payload
                }

            }
        }

        case LOGOUT: {
            return {
                ...state,
                error: "",
                success: "",
                loading: false,
                token: "",
                records: {
                    ...state.records,
                    Facil: null,
                    Medio: null,
                    Dificil: null
                },
                name: "",
                savedGames: []
            }
        }

        case GET_SAVED_GAMES: {
            return {
                ...state,
                loading: false,
                error: "",
                savedGames: action.savedGames
            }
        }
        case GET_RECORDS: {
            return {
                ...state,
                loading: false,
                error: "",
                records: {
                    ...state.records,
                    Facil: action.records.Facil && action.records.Facil[0],
                    Medio: action.records.Medio && action.records.Medio[0],
                    Dificil: action.records.Dificil && action.records.Dificil[0]
                }
            }
        }
        case LOADING_USER: {
            return {
                ...state,
                error: "",
                loading: true
            }
        }
        case ERROR_USER: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case SUCCES_REGISTER: {
            return {
                ...state,
                success: true,
                loading: false,
                token: action.payload.token,
                name: action.payload.userName
            }
        }
        case SUCCES_LOGIN: {
            return {
                ...state,
                success: true,
                records: {
                    ...state.records,
                    Facil: action.payload.records.Facil[0],
                    Medio: action.payload.records.Medio[0],
                    Dificil: action.payload.records.Dificil[0]
                },
                savedGames: action.payload.tables,
                loading: false,
                error: "",
                token: action.payload.token,
                name: action.payload.userName
            }
        }

        case SUCCES_PROFILE: {
            return {
                ...state,
                token: action.payload
            }
        }

        default: return state;
    }
}