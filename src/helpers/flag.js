export const plantFlag = (table,x,y) =>{
    if(table[x][y].show){
        return table
    }
    table[x][y].flag = !table[x][y].flag
    return table
}

