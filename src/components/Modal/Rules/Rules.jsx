import React,{useState} from 'react'
import Button from '../../Button/Button'
import ReactDom from 'react-dom'
import { ReactComponent as Close } from '../../../assets/close.svg';
import './rules.css'
const Rules = ({active,closeModal}) =>{

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
                <Close className="close-button" onClick={close}/>
                <div className="rules">
                    <h2 className="modal-title-big">Reglas</h2>
                    <div className="rules-cointainer-text">
                        <p className="rules-text">
                            • El objetivo del juego es despejar un campo de minas sin detonar ninguna.
                        </p>
                        <p className="rules-text">
                            • Algunas casillas tienen un número, el cual indica la cantidad de minas que hay en las casillas circundantes. Así, si una casilla tiene el número 3, significa que de las ocho casillas que hay alrededor hay 3 con minas y 5 sin minas. 
                        </p>
                        <p className="rules-text">
                            • Si se descubre una casilla sin número indica que ninguna de las casillas vecinas tiene mina y éstas se descubren automáticamente.
                        </p>
                        <p className="rules-text">
                            • Si se descubre una casilla con una mina se pierde la partida.
                        </p>
                        <p className="rules-text">
                            • Se puede poner una marca (boton secundario) en las casillas que el jugador piensa que hay minas para ayudar a descubrir las que están cerca.
                        </p> 
                    </div>
                            <Button onClick={close} buttonType='primary'>Continuar</Button>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('root')
    )
}
export default Rules

Rules.defaultProps = {
    active: false
}