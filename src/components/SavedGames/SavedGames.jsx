import React,{useState} from 'react'
import './savedGames.css';
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { ReactComponent as Reloj } from '../../assets/reloj.svg';
import { ReactComponent as Close } from '../../assets/close.svg';
import {LoadGame} from '../../redux/actions/gameActions'
import DeleteSavedGame from '../Modal/DeleteSavedGame/DeleteSavedGame'
import Button from '../Button/Button';


const SavedGames  = () =>{

const {savedGames} = useSelector((store) => store.userReducer)
const dispatch =useDispatch()
const history = useHistory()
const [modalDelteGame,setModalDeleteGame] = useState()
const [gameId, setGameId] = useState()

 const setDate = (date) =>{
    return Date(date).split(" ").slice(1,3).join().replace(","," ")
 } 

 const OpenModalDeleteGame=(id)=>{
    setGameId(id)
    setModalDeleteGame(!modalDelteGame)
}

 function load(game){
    dispatch(LoadGame(game))
    history.push("/game")

 }

    return(
        <div className="savedGames">
         {modalDelteGame &&<DeleteSavedGame gameId={gameId} closeModal={OpenModalDeleteGame} active={modalDelteGame}/>}
            <h2 className="savedGames-title">Partidas Guardadas</h2>

            <div className="savedGame-games">
                {
                    savedGames.length ? savedGames.map((data,index)=>{
                        return(
                        <div key={index} className="savedGame-games-game">
                            
                            <div className="savedGame-games-button" >
                                <Button onClick={()=>{load(data)}} buttonType="secondary">Continuar</Button>
                            </div>
                            <span className="savedGame-games-data">{data.difficulty ==="Personalizado" ? "Person.":data.difficulty}</span>
                            <span className="savedGame-games-data-time">{data.score}s<Reloj className="savedGame-games-reloj"/></span>
                            <span className="savedGame-games-data">{setDate(data.createAt)}</span>
                            <Close onClick={()=>{OpenModalDeleteGame(data._id)}} className="savedGame-games-trash"/>
                        </div>
                           
                        
                        )
                    })  : <h4 >No existen partidas guardadas</h4>  }
            </div> 
        </div>
    )
}

export default SavedGames