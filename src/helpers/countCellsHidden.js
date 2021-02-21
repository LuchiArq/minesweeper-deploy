export const countCellsHidden = (game) =>{
    let table = game.table
    let arr=[];

    table.forEach(row=>{
        return(
            row.forEach(cell=>{
                if(cell.show===false){
                    arr.push({x:cell.x,y:cell.y})
                }
            })
        )
    })
    return arr
}
export const showAll = (game) =>{
    let table = game.table
    table.forEach(row=>{
        return(
            row.forEach(cell=>{
                if(cell.value!=='x'){
                    cell.show=true
                }
            })
        )
    })
    return table

}

