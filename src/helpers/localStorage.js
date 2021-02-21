
export function SaveStateLocalStorage(stateName,data){
    try{
        localStorage.setItem(stateName,JSON.stringify(data))
        return JSON.parse(localStorage.getItem(stateName))
    }catch{
        return undefined
    }  
}

export function LoadStateLocalStorage(stateName){
    try{
       const data = JSON.parse(localStorage.getItem(stateName))
        return data
    }catch{
        return undefined
    }  
}