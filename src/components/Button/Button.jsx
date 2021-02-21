import React from 'react'
import './button.css'

const Button  = ({children,buttonType,onClick}) =>{
    return(
        <button onClick={onClick} className={`button button-${buttonType}`}> {children}</button>
    )
}

Button.defaultProps = {
    buttonType: 'primary'
}

export default Button