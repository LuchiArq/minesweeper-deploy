import React from 'react'
import Record from './Record'
import {useSelector,} from 'react-redux'
import './recordsContainer.css';

const RecordsContainer  = () =>{
    
const {records} = useSelector((store) => store.userReducer)
const {Facil,Medio,Dificil} = records 

    return(
        <div className="recordContainer">
            <h2 className="recordContainer-title">Records</h2>
            <div className="recordContainer-records">
            {
                <>
                    <Record difficulty={"Facil"} score={records.Facil && records.Facil.score}/>
                    <Record difficulty={"Medio"} score={records.Medio && records.Medio.score}/>
                    <Record difficulty={"Dificil"} score={records.Dificil && records.Dificil.score}/>
                </>     
            }
              
            </div>
        </div>
    )
}

export default RecordsContainer