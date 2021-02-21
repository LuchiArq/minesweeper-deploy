import React,{useState,useEffect} from 'react'
import HeaderGame from '../HeaderGame/HeaderGame'
import Cell from '../Cell/Cell'
import showCell from '../../helpers/showCell.js'
import {plantFlag} from '../../helpers/flag.js'
import {countCellsHidden} from '../../helpers/countCellsHidden.js'
import {LoadStateLocalStorage} from '../../helpers/localStorage.js'
import createTable from '../../helpers/createTable.js'
import {setStateGame,newGame,saveTime} from '../../redux/actions/gameActions'
import { useSelector,useDispatch } from 'react-redux';
import FinishGame from  '../Modal/FinishGame/FinishGame'
import './table.css'

const Table =() => {

const dispatch = useDispatch()
const {flag,state,loadGame} = useSelector((store)=>store.gameReducer) 
const {row,columns,mines}= localStorage.game ? LoadStateLocalStorage("game") : {row:8,columns:8,mines:10}
const [game,setgame] = useState()
const [modalFinishGame, setModaFinishGame] = useState(false)


useEffect(()=>{
    loadGame && setgame(loadGame)
    !loadGame &&  localStorage.game && setgame(createTable(row,columns,mines)) 
    !loadGame && dispatch(newGame(LoadStateLocalStorage("game")))
},[]) 


// Funcion que genera otro tablero si la primera celda descuebierda posee una mina
const firstClick = (x,y)=>{
    if(loadGame) return
    let newgame = createTable(row,columns,mines)
    if(newgame.table[y][x].value==="x"){
       return firstClick(x,y)
   }
   let newtable=showCell(newgame,y,x)
   dispatch(setStateGame("in progress"))
   setgame({...game,
            table:newtable.table,
            minesLocation:newgame.minesLocation}) 
}
// en caso de perder o ganar se abre el modal
const OpenModalFinishGame =() =>{
    setModaFinishGame(!modalFinishGame)
}

const Update =(table)=>{
    setgame({...game,
        table:table})
}

//crea otro juego al darle a los botones "reintentar" o "jugar de nuevo"

const again=()=>{
    dispatch(saveTime(0))
    dispatch(setStateGame(""))
    dispatch(newGame(LoadStateLocalStorage("game")))
    modalFinishGame && setModaFinishGame(!modalFinishGame)
    setgame(createTable(row,columns,mines))
}

//obtiene y actualiza las posiciones de las banderas en el table 
const getFlag = (event,x,y)=>{
    event.preventDefault()
    let newTable = plantFlag(game.table,y,x)
    Update(newTable)
    }

// funcion que actualiza el juego al ir descubriendo el tablero
const UpdateGame = (x,y) =>{
    let newTable = showCell(game,y,x)

    if(newTable.lose){
        dispatch(setStateGame("loss"))
        OpenModalFinishGame()
        return
    }
    
    Update(newTable.table)
        
    if(countCellsHidden(game).length === game.minesLocation.length){
        dispatch(setStateGame("win"))
        OpenModalFinishGame()
        return
    }
} 

    return (
    <div className="mainContainerGame slideIn">
        
            <FinishGame 
                modalType={state} 
                title={state==="win"? "Ganaste":"Perdiste"} 
                textButton={state==="win"? "Jugar de Nuevo":"Reintentar"}
                newGame={again}
                newRecord={""}
                closeModal={OpenModalFinishGame} active={modalFinishGame}
                />
        
        <div className="game-container">
            <div className="game-container-headerGame">
                <HeaderGame game={game} again={again} flag={flag} mines={mines} />
            </div>
            <div className="game-container-table">
                <div className="game-container-table-sec">
                {     
                  game && game.table.length ?
                    game.table.map((filas,i) =>{
                        return (
                        <div className="table-game " key={i}> 
                    {     filas.map((celda,j)=>{
                            return <Cell  
                                    UpdateGame={!state?firstClick:UpdateGame}
                                    flag={getFlag}
                                    celda={celda} 
                                    key={j}/>
                        })}
                        </div> )
                })
                    :<div></div>
                }
                </div>
               
            </div>
        </div>
    </div>

    )
}

export default Table