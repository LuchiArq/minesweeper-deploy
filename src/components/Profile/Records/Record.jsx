import React from 'react'
import { ReactComponent as Reloj } from '../../../assets/reloj.svg';
import { ReactComponent as Cup } from '../../../assets/cup.svg';
import './record.css';

const Record  = ({difficulty,score}) =>{
    return(
      <div className="record">
          <h3 className="record-difficulty">
              {difficulty}
          </h3>
          <div className="record-cup">
            <Cup className="record-cup-icon"/>
          </div>
          <div className="record-score">
            <span className="record-score-data">{score ? ` ${score}s`: '---'}<Reloj className="record-score-reloj"/></span>
          </div>
      </div>
    )
}


export default Record