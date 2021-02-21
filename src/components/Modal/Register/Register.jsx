import React,{useState, useEffect} from 'react'
import Button from '../../Button/Button'
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector} from 'react-redux';
import ReactDom from 'react-dom'
import LoadingAnimation from '../../Loading/Loading'
import {register,SetError} from '../../../redux/actions/userActions'
import { ReactComponent as Cheers } from '../../../assets/cheers.svg';
import { ReactComponent as Close } from '../../../assets/close.svg';
import './registro.css'

const Register = ({active,closeModal}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {error,loading,success,name} = useSelector(store=>store.userReducer)
    const [dataRegister, setDataRegister] = useState({
        name:"",
        password:"",
        repeatPassword:""
    })

    const [closeModalBackground,setCloseBackground] = useState('')
    const [closeModalContent,setCloseModalContent] = useState('')
    useEffect(()=>{
        dispatch(SetError(""))
    },[])
    
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

 
    const handlerOnchange=(e)=>{
        setDataRegister({
            ...dataRegister,
            [e.target.name]: e.target.value
        })
    }

    const handlerOnsubmite = (e) =>{
        e.preventDefault();
        if(dataRegister.password===dataRegister.repeatPassword){
                dispatch(register({name:dataRegister.name,password:dataRegister.password}))
        }else{
            alert("las contraseñas no coinciden")
        }
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
                <div className="register">
                <div className="register-texto">
                    <h2 className={success ? "modal-title-big":"modal-title-small"}>{success? "Bienvenido" : "Registro"}</h2>
                </div>
                {
                        !success ?
                <>
                <form className="modal-body register-form" onSubmit={
                        (e=>{
                            handlerOnsubmite(e)
                        })
                            }>
                   
                            <label className="register-form-label" htmlFor="user">Usuario
                                <input onChange={handlerOnchange} required name="name" className="register-form-input" placeholder="Usuario"/>
                            </label>

                            <label className="register-form-label" htmlFor="password">Contraseña
                                <input onChange={handlerOnchange} required type="password" name="password" className="register-form-input" placeholder="*******"/>
                            </label>

                            <label className="register-form-label" htmlFor="password">Repetir Contraseña
                                <input onChange={handlerOnchange} required type="password" name="repeatPassword" className="register-form-input" placeholder="*******"/>
                            </label>
                     
                    
                    <div type="submit" className="register-submit">
                           
                        {
                            loading ?
                            <LoadingAnimation/> :
                            <Button buttonType={"primary"}>Registrarse</Button>     
                        }
                        {
                            error && <small className="message-error" >{error}</small>
                        }
                    </div>
                </form>
                </>
                :
                <div className="register-submit">
                    <Cheers></Cheers>
                    <h2 className="modal-title-small">{name}</h2>
                    <Button onClick={()=>{
                        close()
                        history.push("/profile")
                    }} buttonType={"primary"}>Continuar</Button>
                </div>

                }
            </div>
                </div>
            </div>
        </div>,
         
         document.getElementById('root')
    )}
       

export default Register