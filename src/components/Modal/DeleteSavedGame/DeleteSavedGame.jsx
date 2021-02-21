import React, { useState } from 'react'
import Button from '../../Button/Button'
import {LoadStateLocalStorage} from '../../../helpers/localStorage'
import {getSavedGames,DeleteGame} from '../../../redux/actions/userActions'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import ReactDom from 'react-dom'
import LoadingAnimation from '../../Loading/Loading'
import { ReactComponent as Close } from '../../../assets/close.svg';
import './deleteSavedGame.css'

const DeleteSavedGame = ({ closeModal, active ,gameId}) => {
    const [loading,setLoading] = useState(false);
    const [closeModalBackground, setCloseBackground] = useState('')
    const [closeModalContent, setCloseModalContent] = useState('')
    const dispatch = useDispatch()
    const deleteGame = ()=>{
        let obj = {
            id:gameId
        }
        setLoading(true)
        axios.post("https://nogcpvu4tb.execute-api.us-east-2.amazonaws.com/dev/table/delete",obj,{
            headers: {
                Authorization:LoadStateLocalStorage("dataUser").token
            }
          })
        .then((res)=>{
            console.log(res)
            setLoading(false)
            close()
            dispatch(DeleteGame(gameId))
            dispatch(getSavedGames())
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }

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

    return ReactDom.createPortal(
        <div>
            <div tabIndex={-1}
                className={`fondo openFondo ${closeModalBackground ? closeModalBackground : ""}`}
                onClick={close}>
            </div>
            <div className="modal-container">
                <div className={`modal slideIn ${closeModalContent ? closeModalContent : ""}`}>
                    <Close onClick={close} className="close-button"/>
                    <div className="delete-modal">
                        <h2 className="modal-title-small">¿Seguro que quiere eliminar la partida?</h2>
                        <div className="delte-modal-button">
                            {
                                loading ?
                                <LoadingAnimation/>:
                                <Button onClick={deleteGame} buttonType="primary" children="Eliminar" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        document.getElementById('root')
    )
}

export default DeleteSavedGame

