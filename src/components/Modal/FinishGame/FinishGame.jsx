import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../Button/Button'
import FlagAndTime from '../FlagAndTime.jsx'
import ReactDom from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as Cheers } from '../../../assets/cheers.svg';
import { ReactComponent as Close } from '../../../assets/close.svg';
import './finishGame.css'
import { SaveGame } from '../../../redux/actions/gameActions'
import { Record } from '../../../redux/actions/userActions'

const FinishGame = ({ newGame, title, textButton, closeModal, active }) => {
    const dispatch = useDispatch()
    const { records } = useSelector(state => state.userReducer)
    const { difficulty, time, state } = useSelector(state => state.gameReducer)
    const [nr, setNr] = useState(null)
    const currentRecord = records[difficulty] && records[difficulty].score
    const [closeModalBackground, setCloseBackground] = useState('')
    const [closeModalContent, setCloseModalContent] = useState('')

    useEffect(() => {
        state === "win" && SaveNewRecord()
    }, [time])


    if (!active) {
        return null
    }

    function close() {
        setCloseBackground("CloseModalFondo")
        setCloseModalContent("CloseModal")
        setTimeout(() => {
            setCloseBackground("")
            setCloseModalContent("")
            closeModal()
        }, 300)
    }

    const setNewRecod = () => {
        let newRecord = {
            difficulty: difficulty,
            score: time,
            state: state
        }
        setNr(<p className="newRecord">
            <Cheers className="newRecord-icon" />
                         Nuevo Record
            <Cheers className="newRecord-icon" />
        </p>)

        dispatch(SaveGame(newRecord))
        dispatch(Record(newRecord))
    }

    const SaveNewRecord = () => {

        if (difficulty === "Personalizado" || state==="loss") return
        if (!currentRecord && time !== 0) {
            setNewRecod()
        }
        if (currentRecord > time && time !== 0) {
            setNewRecod()
        }
    }


    return ReactDom.createPortal(
        <div>
            <div tabIndex={-1}
                className={`fondo openFondo ${closeModalBackground ? closeModalBackground : ""}`}
                onClick={close}>
            </div>
            <div className="modal-container">
                <div className={`modal slideIn ${closeModalContent ? closeModalContent : ""}`}>
                    <Close className="close-button" onClick={close} />
                    <div className="finishContainer">
                        <div className="finish-title">
                            <h2 className="modal-title-big finish-title" >{title}</h2>
                            {nr ? nr : null}
                        </div>
                        <div className="finish-body">
                            <FlagAndTime />
                        </div>
                        <div className="finish-button">
                            <Link to='/'>
                                <Button onClick={newGame} buttonType="login">Salir</Button>
                            </Link>
                            <Button onClick={newGame} buttonType="primary">{textButton}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        document.getElementById('root')
    )

}

export default FinishGame