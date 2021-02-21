import React,{useState} from 'react'
import axios from 'axios';
import { ReactComponent as Flag } from '../../assets/flag.svg';
import { ReactComponent as SaveIcon } from '../../assets/saveIcon.svg';
import { ReactComponent as Back } from '../../assets/back.svg';
import {LoadStateLocalStorage,SaveStateLocalStorage} from '../../helpers/localStorage'
import './headerGame.css'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import Timer from './Timer'
import Button from '../Button/Button'
import Pause from '../Modal/Pause/Pause'
import SaveGame from '../Modal/SaveGame/SaveGame'
import {getSavedGames} from '../../redux/actions/userActions'
import {setStateGame} from  '../../redux/actions/gameActions'

const HeaderGame = ({flag,again,game}) =>{

const dispatch = useDispatch()
const [loading,setLoading] = useState(false);
const [contiunue,setContinue] =useState(false)
const [modalPause,setModalPause]= useState(false)
const [modalSave,setModalSave]= useState(false)
const {state,difficulty,time,mines,id} = useSelector(store=> store.gameReducer)
const {name} = useSelector(store=> store.userReducer)

const saveNewGame = () =>{
    let obj={
        id:id,
        score:time,
        difficulty:difficulty,
        state:"saved",
        game:JSON.stringify(game),
        flag:JSON.stringify(flag)
    }
    SaveStateLocalStorage("game",{row:game.row,
                                columns:game.columns,
                                difficulty:difficulty,
                                mines:game.minesLocation.length})
    setLoading(true)
    if(!id){
        
        axios.post("https://nogcpvu4tb.execute-api.us-east-2.amazonaws.com/dev/table/createTable",obj, {
            headers:{
                Authorization: LoadStateLocalStorage("dataUser").token
        }})
        .then(res=>{
            //console.log(res)
            setLoading(false)
            setContinue(true)
            dispatch(getSavedGames())
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
    if(id){
        axios.put("https://nogcpvu4tb.execute-api.us-east-2.amazonaws.com/dev/table/saveTable",obj, {
            headers:{
            Authorization:LoadStateLocalStorage("dataUser").token
        }})
        .then(res=>{
            setLoading(false)
            setContinue(true)
            dispatch(getSavedGames())
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
   
}

function OpenModalPause(){
    setModalPause(!modalPause)
}

function OpenModalSave(){
    setModalSave(!modalSave)
}

const save=()=>{
    setContinue(false)

    if(!state || state==="win" || state==="loss"){
        return
    }
   if(state==="in progress"){
        dispatch(setStateGame("saved"))
   }
   if(state==="saved"){
       dispatch(setStateGame("in progress"))
  }
  setModalSave(!modalSave)
}

function pause(){
    !state && setModalPause(!modalPause)

     if(state==="in progress"){
         dispatch(setStateGame("pause"))
    }
    if(state==="pause"){
        dispatch(setStateGame("in progress"))
   }
   setModalPause(!modalPause)
}
   return(

       <div className="headerGame">
           {
            name? <Link className="headerGame-link-back" to="/profile">
                        <Back className="headerGame-icon-back"/>
                    </Link>
                :
                <Link className="headerGame-link-back" to="/">
                        <Back className="headerGame-icon-back"/>
                </Link>
           }
            
           { modalPause && <Pause closeModal={OpenModalPause} pause={pause} active={modalPause}/>}
            
           
           {modalSave &&  <SaveGame 
                    saveNewGame={saveNewGame}
                    name={name} 
                    contiunue={contiunue} 
                    loading={loading} 
                    closeModal={OpenModalSave} 
                    pause={save} 
                    active={modalSave}/>}
            
            {
                state==="win"||state==="loss"?
                <span className="headerGame-pause">
                    <Button onClick={again} buttonType="primary">Reintentar</Button>
                </span>
                :
                <span className="headerGame-pause">
                    <Button onClick={pause} buttonType="primary">Pausa</Button>
                </span>
            }
           <div className="headerGame-TimeAndFlag">
                <Timer/>
                <div className="headerGame-Flag">
                    <h2>{mines-flag.length}</h2><Flag className="headerGame-icon"/>
                </div>
           </div>
           <div className="headerGame-icon-container">
                <SaveIcon style={{cursor:"pointer"}} className="headerGame-icon" onClick={save} />
           </div>
       </div>
   )
}

export default HeaderGame