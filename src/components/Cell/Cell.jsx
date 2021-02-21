import React from 'react'
import { ReactComponent as Flag } from '../../assets/flag.svg';
import { ReactComponent as Bomb } from '../../assets/bomb.svg';
import { useDispatch, useSelector } from 'react-redux';
import {setStateGame,plantFlag} from '../../redux/actions/gameActions'
import './cell.css'

const Cell = ({flag,UpdateGame,celda})=>{
const dispatch = useDispatch()
const stateGame= useSelector((store)=>store.gameReducer.state)


const render = (celda)=>{
    if(celda.flag) return <Flag/>
    if(celda.show && celda.value!==0 && celda.value!=="x") return celda.value
    if(celda.show && celda.value==="x") return <Bomb className="bomb"/>
}



const setColor=(celda)=>{
    switch(celda.value){
        case 1:{
            return "#522546"
        }
        case 2:{
            return "#135293"
        }
        case 3:{
            return "#139374"
        }
        case 4:{
            return "#8A2478"
        }
        case 5:{
            return "#52517C"
        }
        case 6:{
            return "#EF5DA8"
        }
        case 7:{
            return "#5D5FEF"
        }
        case 8:{
            return "#931313"
        }

        default : {
            return
        }

    }
}

return (
    <div className={`celda ${celda.show ? 'celda-revealed':""}`} 
    style={{color: setColor(celda)}}
    onClick={()=>{
            if(celda.flag||stateGame==="win"||stateGame==="loss"){return}
            if(stateGame==="load"){
                dispatch(setStateGame("in progress"))
            }
            UpdateGame(celda.x,celda.y)
         }}
    onContextMenu={(e)=>{
        if(!celda.show){
            flag(e,celda.x,celda.y)
            dispatch(plantFlag({x:celda.x,y:celda.y}))
        }
        }}>
            
        {  
            render(celda)
        }
            
    </div>
    )
}

export default Cell