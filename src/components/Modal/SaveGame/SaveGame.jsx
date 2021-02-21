import React, { useState } from 'react'
import Button from '../../Button/Button'
import FlagAndTime from '../FlagAndTime.jsx'
import LoadingAnimation from '../../Loading/Loading'
import ReactDom from 'react-dom'
import { ReactComponent as Close } from '../../../assets/close.svg';
import './saveGame.css';


const SaveGame = ({ pause, saveNewGame, loading, contiunue, closeModal, name, active }) => {

    const [closeModalBackground, setCloseBackground] = useState('')
    const [closeModalContent, setCloseModalContent] = useState('')

    if (!active) {
        return null
    }

    function close() {
        setCloseBackground("CloseModalFondo")
        setCloseModalContent("CloseModal")
        setTimeout(() => {
            setCloseBackground("")
            setCloseModalContent("")
            pause()
            closeModal()
        }, 300)
    }

    if (!name) {
        return ReactDom.createPortal(
            <div>
                <div tabIndex={-1}
                    className={`fondo openFondo ${closeModalBackground ? closeModalBackground : ""}`}
                    onClick={close}>
                </div>
                <div className="modal-container">
                    <div className={`modal slideIn ${closeModalContent ? closeModalContent : ""}`}>
                        <Close onClick={close} className="close-button" />
                        <div className="saveGame">
                            <h2 className="modal-title-big saveGame-title" >Guardar</h2>
                            <div className="saveGame-data">
                                <h2 className="message-error">Registrate para guardar tus partidas</h2>
                            </div>
                            <div className="saveGame-button">
                                <Button onClick={close} buttonType="primary">Continuar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,

            document.getElementById('root')
        )
    }

    return ReactDom.createPortal(
        <div>
            <div tabIndex={-1}
                className={`fondo openFondo ${closeModalBackground ? closeModalBackground : ""}`}
                onClick={close}>
            </div>
            <div className="modal-container">
                <div className={`modal slideIn ${closeModalContent ? closeModalContent : ""}`}>
                    <Close onClick={close} className="close-button" />
                    <div className="saveGame">
                        <h2 className="modal-title-big saveGame-title" >Guardar</h2>
                        <div className="saveGame-data">
                            <FlagAndTime />
                        </div>
                        <div className="saveGame-button">
                            {
                                loading
                                    ? <LoadingAnimation />
                                    : <Button onClick={contiunue ? close : saveNewGame} buttonType="primary">
                                        {contiunue ? "Continuar" : "Guardar Juego"}
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        document.getElementById('root')
    )
}

export default SaveGame
