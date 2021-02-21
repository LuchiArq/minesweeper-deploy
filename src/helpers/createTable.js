const createTable = (row,columns,mines) => {
     //se crea el tablero
    let minesLocation=[]
    let table = new Array(parseInt(row))
         for(let i=0;i<table.length;i++){
            table[i]=new Array(parseInt(columns))
        }
    
       for(let i=0;i<table.length;i++){
        for(let j=0;j<table[i].length;j++){
            table[i][j]={
                value:0,
                y:i,
                x:j,
                flag:false,
                show:false,
            }
        }
       }
    // se colocan minas de manera aleatoria por todo el tablero
    while(mines>0){
        let y = Math.floor(Math.random() * row)
        let x = Math.floor(Math.random() * columns)
        if(table[y][x].value !== 'x'){
            table[y][x].value = 'x'
            minesLocation.push({x:x,y:y})
            mines--
        }
    }

    //contar minas de celdas vecinas

    for(let i =0; i<row; i++){
        for(let j=0; j<columns;j++){
            
            //arriba
            if(i>0 && table[i-1][j].value==='x'){
                table[i][j].value!=='x' && table[i][j].value++
            }
            //arriba derecha
            if(i>0 && j<columns-1 && table[i-1][j+1].value==='x'){
                table[i][j].value!=='x' && table[i][j].value++
            }
            //derecha
            if( j<columns-1 && table[i][j+1].value==='x'){
                table[i][j].value!=='x' && table[i][j].value++
            }
            //abajo derecha
            if(i<row-1 && j<columns-1 &&  table[i+1][j+1].value==='x'){
                table[i][j].value!=='x' && table[i][j].value++
            }
            //abajo
            if(i<row-1 && table[i+1][j].value==='x'){
                table[i][j].value!=='x' && table[i][j].value++
            }
            //abajo izquierda
            if(i<row-1 && j>0 && table[i+1][j-1].value==='x'){
                table[i][j].value!=='x' && table[i][j].value++
            }
            //izquierda
            if(j>0 && table[i][j-1].value==='x'){
                table[i][j].value!=='x' && table[i][j].value++
            }
            //arriba izquierda
            if(i>0 && j>0 && table[i-1][j-1].value==='x'){
                table[i][j].value!=='x' && table[i][j].value++
            }

        }
    }
       return {
                table,
                row,
                columns,
                minesLocation
            } 
    
}

export default createTable