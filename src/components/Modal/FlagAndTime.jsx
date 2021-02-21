import React from 'react'
import { ReactComponent as Flag } from '../../assets/flag.svg';
import { ReactComponent as Reloj } from '../../assets/reloj.svg';
import { ReactComponent as Cup } from '../../assets/cup.svg';
import './flagAndTime.css'
import {useSelector } from 'react-redux';

const FlagAndTime = () =>{
const {flag,time,mines,state} = useSelector((store)=>store.gameReducer)
    return(
            <>
                    {
                    state==="win"?
                    <div className="flagAndTime-body">
                        <Cup className="flagAndTime-icon"/>
                        <div className="flagAndTime-body-score">
                            {((time/100).toFixed(2)).toString().replace(".","")} <Reloj className="flagAndTime-icon" />
                        </div>
                        <Cup className="flagAndTime-icon"/>
                    </div>
                    :
                    
                    <div className="flagAndTime-body">
                        <div className="flagAndTime-body-score">
                            {((time/100).toFixed(2)).toString().replace(".","")} <Reloj className="flagAndTime-icon" />
                        </div>
                        <div className="flagAndTime-body-score">    
                            {mines-flag.length} <Flag className="flagAndTime-icon" />
                        </div>
                    </div>
                    
                    }
          </>
    )
}
export default FlagAndTime