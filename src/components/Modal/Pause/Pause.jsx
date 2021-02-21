import React,{useState} from 'react'
import Button from '../../Button/Button'
import ReactDom from 'react-dom'
import { ReactComponent as Close } from '../../../assets/close.svg';
import FlagAndTime from '../FlagAndTime.jsx'
import './pause.css'



const Pause = ({closeModal,active,pause}) =>{

    const [closeModalBackground,setCloseBackground] = useState('')
    const [closeModalContent,setCloseModalContent] = useState('')
    
    if(!active){
        return null   
    }

    function close(){
        setCloseBackground("CloseModalFondo")
        setCloseModalContent("CloseModal")
        setTimeout(()=>{
            setCloseBackground("")
            setCloseModalContent("")
            pause && pause()
            closeModal()
            },300)
    }

return ReactDom.createPortal(
    <div>
        <div tabIndex={-1} 
            className={`fondo openFondo ${closeModalBackground ? closeModalBackground :"" }`} 
            onClick={close}>
        </div>
        <div  className="modal-container">
            <div  className={`modal slideIn ${closeModalContent ? closeModalContent : ""}`}>
                <Close onClick={close} className="close-button"/>
                <div className="pause">
                    <h2 className="modal-title-big pause-title" >Pausa</h2>
                    <div className="pause-data">
                        <FlagAndTime/>
                    </div>
                    <div className="pause-button">    
                        <Button onClick={close} buttonType="primary">Continuar</Button>
                    </div> 
                </div>
            </div>
        </div>
    </div>,
     
     document.getElementById('root')
)}

export default Pause