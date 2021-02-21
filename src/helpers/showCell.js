const showCell = (game,y,x) =>{
    let newTableGame = revealCell(game,y,x)
    if(newTableGame.lose){
       let gameLose = lose(newTableGame.table,game.minesLocation)
        return {lose:true,table:gameLose} 
    }

    return {lose:false,table:newTableGame}
}


function lose(table,mines){
    for(let i=0;i<mines.length;i++){
        table[mines[i].y][mines[i].x].show=true
    }

    return table
}

function revealCell(game,y,x){
    let table = game.table
    if(table[y][x].flag){
        return table
    }
    table[y][x].show=true
    
    if(table[y][x].value==='x'){
        return {lose:true,
                table}
    } 
    if(table[y][x].value!==0){
        table[y][x].show=true 
        return table
    }
    let arr = getArea(game,y,x)
    arr.forEach(data=>{
        if(data.value!==0 && table[data.y][data.x].show===false && table[data.y][data.x].flag===false){
            table[data.y][data.x].show=true
        }
        if(data.value===0 && table[data.y][data.x].show===false && table[data.y][data.x].flag===false){
            table[data.y][data.x].show=true
            revealCell(game,data.y,data.x)
        }
    })
    return table

}

function getArea(game,y,x){
    let table = game.table
    let row = game.row
    let columns = game.columns
    let arr =[]
        //arriba
        if(y>0){
            arr.push(table[y-1][x])
        }
        //arriba derecha
        if(y>0 && x<columns-1){
            arr.push(table[y-1][x+1])
        }
        //derecha
        if( x<columns-1){
            arr.push(table[y][x+1])
        }
        //abajo derecha
        if(y<row-1 && x<columns-1){
            arr.push(table[y+1][x+1])
        }
        //abajo
        if(y<row-1){
            arr.push(table[y+1][x])
        }
        //abajo izquierda
        if(y<row-1 && x>0){
            arr.push(table[y+1][x-1])
        }
        //izquierda
        if(x>0){
            arr.push(table[y][x-1])
        }
        //arriba izquierda
        if(y>0 && x>0){
            arr.push(table[y-1][x-1])
        }
    return arr
}


export default showCell