import React,{useState,useEffect} from 'react'
import {login , SetError} from '../../../redux/actions/userActions'
import { useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import ReactDom from 'react-dom'
import Button from '../../Button/Button'
import LoadingAnimation from '../../Loading/Loading'
import { ReactComponent as Close } from '../../../assets/close.svg';
import './login.css'

const Login = ({closeModal,active}) =>{
const dispatch = useDispatch()
const history = useHistory();
const [closeModalBackground,setCloseBackground] = useState('')
const [closeModalContent,setCloseModalContent] = useState('')
const {error,loading,token} = useSelector(store=>store.userReducer)
const [dataLogin, setDataLogin] = useState({
    name:"",
    password:""
})

useEffect(()=>{
    dispatch(SetError(""))
    token && history.push('/profile')
},[token])

const handlerOnchange=(e)=>{
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value
    })
  }
const handlerOnsubmite = (e) =>{
    e.preventDefault();
    dispatch(login(dataLogin))
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

if(!active){
    return null   
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
                <div className="login">
                    <div className="login-texto">
                        <h2 className="modal-title-small">Ingresar</h2>
                    </div>
                    <form className="modal-body login-form" onSubmit={handlerOnsubmite}>
                        <label className="login-form-label" htmlFor="user">Usuario
                            <input onChange={handlerOnchange} required name="name" className="register-form-input" placeholder="Usuario"/>
                        </label>

                        <label className="login-form-label" htmlFor="password">Contraseña
                            <input onChange={handlerOnchange} required type="password" name="password" className="login-form-input" placeholder="*******"/>
                        </label>
                        
                        <div className="login-submit">
                            {
                                
                                loading ? 
                                <LoadingAnimation/> : 
                                error ?
                                <>
                                <Button buttonType={"primary"}>Iniciar sesion</Button>
                                <small className="message-error">{error}</small>
                                </>
                                :
                                <Button buttonType={"primary"}>Iniciar sesion</Button>
                            }
                        </div>    
                        
                    </form>
                </div>
            </div>
        </div>
    </div>,
     
     document.getElementById('root')
)}
    
  
Login.defaultProps = {
    active: false
}
export default Login