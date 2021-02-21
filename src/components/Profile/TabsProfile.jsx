import React,{useState} from 'react'
import './tabsProfile.css';
import Button from '../Button/Button'

const TabsProfile  = ({children}) =>{
const [activeTab,setActiveTab] = useState(children[0].props.label)

const HandleClick=(act)=>{
    setActiveTab(act)
}


    return(
        <>
            <ul className="tabsProfile">
                {children.map((list,i)=>{
                   const label= list.props.label
                    return(
                        <Button key={i} onClick={()=>{HandleClick(label)}} buttonType="secondary">{label}</Button>
                    )
                })}
            </ul>
                {children.map((child,i)=>{
                    if(activeTab===child.props.label)
                    return(
                    <div key={i} className="box-container-center">
                        <div className="box-container-center-child">
                            {child.props.children}
                        </div>
                    </div>
                    )
                })}
        </>
    )
}

export default TabsProfile