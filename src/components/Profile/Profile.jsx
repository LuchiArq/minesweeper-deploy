import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './profile.css';
import Button from '../Button/Button';
import CreateGame from '../Modal/CreateGame/CreateGame'
import { ReactComponent as IconProfile } from '../../assets/iconProfile.svg';
import { useDispatch, useSelector } from 'react-redux';
import TabsProfile from './TabsProfile'
import RecordsContainer from './Records/RecordsContainer'
import SavedGames from '../SavedGames/SavedGames'
import {Logout} from '../../redux/actions/userActions'

const Profile  = () =>{

const {token,name} = useSelector((store) => store.userReducer)
const dispatch = useDispatch()
const history = useHistory()
const [modalCreateGame,setModalCreateGame]= useState(false)

const logout = ()=>{
    dispatch(Logout())
}

const  OpenModalGame=()=>{
    setModalCreateGame(!modalCreateGame)
}
 useEffect(()=>{
    !token && history.push("/")

},[token]) 

    return(
        <div className="profile">
            
           { modalCreateGame && <CreateGame closeModal={OpenModalGame} active={modalCreateGame}/>}
            
            <div className="profile-container">
                <div className="profile-container-header">
                    <Button onClick={logout} buttonType="login">Cerrar sesion</Button>
                    <div className="profile-name">
                        <h2>{name}</h2>
                        <IconProfile className="iconProfile"/>
                    </div>
                </div>
                <div className="profile-container-savedGame">
                    <TabsProfile>
                        <div className="box-container-center" label="Partidas">
                            <SavedGames/>
                        </div>
                        <div className="box-container-center" label="Tus Records">
                            <RecordsContainer />
                        </div>
                    </TabsProfile>
                </div>
                <div className="profile-buttons">
                 
                    <Button onClick={()=>history.push("/")} buttonType="secondary">Volver</Button>
                   
                    <Button onClick={OpenModalGame} buttonType="primary button-large">Jugar</Button>
                </div>
            </div>
        </div>
    )
}

export default Profile