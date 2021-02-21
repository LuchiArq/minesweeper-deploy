import React, { useState } from 'react'
import { ReactComponent as IconProfile } from '../../assets/iconProfile.svg';
import { useSelector, useDispatch } from 'react-redux'
import { SetStateSuccess ,Logout} from '../../redux/actions/userActions'
import { Link } from 'react-router-dom'
import CreateGame from '../Modal/CreateGame/CreateGame'
import Register from '../Modal/Register/Register'
import Rules from '../Modal/Rules/Rules'
import Button from '../Button/Button'
import Login from '../Modal/Login/Login'
import './home.css'

const Home = () => {


    const [modalCreateGame, setModalCreateGame] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRules, setModalRules] = useState(false)

    const dispatch = useDispatch()
    const { name } = useSelector(store => store.userReducer)

    const logout = ()=>{dispatch(Logout())}

    function OpenModalRules() {
        setModalRules(!modalRules)
    }

    function OpenModalRegister() {
        setModalRegister(!modalRegister)
        dispatch(SetStateSuccess())
    }

    function OpenModalGame() {
        setModalCreateGame(!modalCreateGame)
    }
    function OpenModalLogin() {
        setModalLogin(!modalLogin)
    }
    return (
        <div className="home">

            {modalCreateGame && <CreateGame closeModal={OpenModalGame} active={modalCreateGame} />}

            { modalRegister && <Register closeModal={OpenModalRegister} active={modalRegister} />}

            { modalLogin && <Login closeModal={OpenModalLogin} active={modalLogin} />}

            {modalRules && <Rules closeModal={OpenModalRules} active={modalRules} />}

            <div className="home-container">
                <div className="home-container-buttonGroup">
                        <Button onClick={name ? logout: OpenModalRegister} buttonType={name ? 'login':'secondary'} children={name?'Cerrar sesion':'Registrarse'} />
                        {
                            name ?
                                <Link to="/profile">
                                    <div className="profile-name">
                                        <h2>{name}</h2>
                                        <IconProfile className="iconProfile" />
                                    </div>
                                </Link> :
                                <Button onClick={OpenModalLogin} buttonType='login' children='Iniciar sesion' />
                        }
                </div>
                <div className="home-container-welcome">
                    <p className="home-title">Buscaminas</p>
                    <p className="home-text"> El objetivo del juego es despejar un campo de minas sin detonar ninguna.</p>
                    <p className="home-text"> Buena Suerte!</p>
                    <span className="home-button-rules" >
                        <Button onClick={OpenModalRules} buttonType='secondary' children='Reglas' />
                    </span>
                </div>
                <div className="home-button-jugar">
                    <Button onClick={OpenModalGame} buttonType='primary button-large'>Jugar</Button>
                </div>
                <div className="home-text-aclaracion">
                    <p>Registrate para poder guardar tus partidas, sino puede continuar como usuario invitado</p>
                </div>
            </div>
        </div>
    )
}
export default Home