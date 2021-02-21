import React,{useState} from 'react'
import ReactDom from 'react-dom'
import Button from '../../Button/Button'
import { useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {useHistory} from 'react-router-dom'
import {SaveStateLocalStorage} from '../../../helpers/localStorage.js'
import { ReactComponent as Close } from '../../../assets/close.svg';
import {newGame} from '../../../redux/actions/gameActions'
import './createGame.css'

const CreateGame  = ({closeModal,active}) =>{

const defaultGame={difficulty:"Medio",columns:14,row:14,mines:40}

const [game,setGame] = useState(defaultGame)
const dispatch = useDispatch()
const history = useHistory();

function changeDifficulty(event){
    switch(event.target.value){
        case 'Facil':{
           return setGame({difficulty:"Facil",columns:8,row:8,mines:10})
        }
        case 'Medio':{
           return setGame({difficulty:"Medio",columns:14,row:14,mines:40})
        }
        case 'Dificil':{
           return setGame({difficulty:"Dificil",columns:30,row:14,mines:90})
        }
        case 'Personalizado':{
           return setGame({...game, difficulty:"Personalizado"})
        }
    }
}


const [closeModalBackground,setCloseBackground] = useState('')
const [closeModalContent,setCloseModalContent] = useState('')



function close(){
    setCloseBackground("CloseModalFondo")
    setCloseModalContent("CloseModal")
    setTimeout(()=>{
        setCloseBackground("")
        setCloseModalContent("")
        closeModal()
        },300)
}

function createGame(game){
    SaveStateLocalStorage("game",game)
    dispatch(newGame(game))
    history.push("/game")
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
            <Close className="close-button" onClick={close}/>
           <div className=" CreateGame">
              
               <h2 className="modal-title-small CreateGame-title">Elija una dificultad</h2>
               <div className="CreateGame-difficulty">
                   <select className="CreateGame-difficulty-dropdown" name="cars" id="cars" onChange={changeDifficulty}>
                       <option value="Facil">Facil</option>
                       <option selected value="Medio">Medio</option>
                       <option value="Dificil">Dificil</option>
                       <option value="Personalizado">Personalizado</option>
                   </select>
               </div>
               <Formik 
                   initialValues={game}
                   onSubmit={(values)=>{
                       game.difficulty==="Personalizado"?createGame({...values,difficulty:"Personalizado"}):createGame(game)
                   }}
                   validate={(values)=>{
                       const errors={}

                       //errores filas 
                       if(!values.row){
                           errors.row="La cantidad de filas no puede ser 0"
                       }else if(values.row<5){
                           errors.row="La cantidad de filas debe ser mayor o igual a 5"
                       }else if(values.row>34){
                           errors.row="La cantidad de filas debe ser menor o igual a 34"
                       }

                       //errores columnas 
                       if(!values.columns){
                           errors.columns="La cantidad de filas no puede ser 0"
                       }else if(values.columns<5){
                           errors.columns="La cantidad de columnas debe ser mayor o igual a 5"
                       }else if(values.columns>34){
                           errors.columns="La cantidad de columnas debe ser menor o igual a 34"

                       }

                       //errores cantidad de minas
                       if(!values.mines){
                           errors.mines="La cantidad de minas no puede ser 0"

                       }else if(values.mines<5){
                           errors.mines="La cantidad de minas debe ser mayor o igual a 5"
                       }else if(values.row>=5 && values.columns>=5 && values.mines>values.row*values.columns-10){
                           errors.mines=`La cantidad de minas no puede ser mayor a ${values.row*values.columns-10}`
                       }
                   
                       return errors;
                   }}
                   
               >
               {
                   ({values, handleChange,handleSubmit, errors, isSubmitting})=><form className="modal-body CreateGame-form" onSubmit={handleSubmit}>
                   <label className="CreateGame-form-label">
                       Filas
                       {game.difficulty==="Personalizado"?
                       <input  
                           className="CreateGame-form-input" 
                           min={5}
                           max={34}  
                           name="row"
                           type="number"  
                           onChange={handleChange}/>
                       :
                       <input 
                           className="CreateGame-form-input"  
                           disabled  
                           name="row"
                           value={game.row}/>
                       }
                   </label>
                       {errors.row ? <small className="message-error">{errors.row}</small>: ''}
                   <label  className="CreateGame-form-label">
                       Columnas
                       {game.difficulty==="Personalizado"?
                       <input  
                           className="CreateGame-form-input"  
                           min={5}
                           max={34}  
                           name="columns"
                           type="number"  
                           onChange={handleChange}/>
                       :
                       <input  
                           className="CreateGame-form-input"  
                           disabled  
                           name="columns"
                           value={game.columns}/>
                       }
                   </label>
                       {errors.columns ? <small className="message-error">{errors.columns}</small>: ''}

                   <label  className="CreateGame-form-label">
                       Minas
                       { game.difficulty==="Personalizado"?
                           <input className="CreateGame-form-input" 
                           min={5}
                           max={values.row*values.columns-10}
                           name="mines"
                           type="number"
                           onChange={handleChange}/>
                           :
                           <input className="CreateGame-form-input" 
                           name="mines" 
                           disabled
                           value={game.mines}/>
                       }
                   </label>
                       {errors.mines ? <small className="message-error">{errors.mines}</small>: ''}
                   <div className="CreateGame-button">
                       <button type="submit" className="button button-primary">Comenzar !</button>
                   </div>
               </form>  
 
               } 
           </Formik>
               
           </div>
       
            </div>
        </div>
    </div>,
     
     document.getElementById('root')
)}

export default CreateGame
