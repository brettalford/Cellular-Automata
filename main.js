
let cells=[];
let bias=[1,1,0,0,0,0,0,0,0];
let w=2;

function setup(){
    frameRate(25);
    createCanvas(250,250);
    let total= width/w;

    for (let i=0;i<total;i++){
        cells[i]=[];
        for(let j = 0;j<total;j++){
            cells[i][j]=bias[floor(random(4))];
        }
    }
}


function draw(){
    let len=cells[0].length; 
    let total= width/w;
    //basically filling it with randomness to start
    for(let i =0; i<total; i++){
        
        for (j=0; j<len;j++){
            noStroke();
            //uncomment for flipped colors
            fill(/*255-*/cells[i][j]*255);
            square(i*w,j*w,w);
        }
    }

    let nextCells=[];
    for(let i=0;i<len;i++){
        nextCells[i]=[];
        for(let j=0;j<len;j++){
            let upLeft=cells[(i-1+len)%len][(j-1+len)%len];
            let upMid=cells[(i+1+len)%len][(j-1+len)%len];
            let upRight=cells[i][(j-1+len)%len];
            let left=cells[(i-1+len)%len][j];
            let current=cells[i][j];
            let right=cells[(i+1+len)%len][j];
            let botLeft=cells[(i-1+len)%len][(j+1+len)%len];
            let botMid=cells[i][(j+1+len)%len];
            let botRight=cells[(i+1+len)%len][(j+1+len)%len];
            
            let nextState=changeState(upLeft,upMid,upRight,left,current,right,botLeft,botMid,botRight)
            nextCells[i][j]=nextState;
        }

    }
    cells=nextCells;


}


function changeState(upLeft,upMid,upRight,left,current,right,botLeft,botMid,botRight){
    //if more than 3 neighbors death by overcrowding
    if((upLeft+upMid+upRight+left+right+botLeft+botMid+botRight)>3){
        return 0;
    }
    //if exactly 3 next will be alive either through reproduction or survives
    else if((upLeft+upMid+upRight+left+right+botLeft+botMid+botRight)==3){
        return 1;
    }
    //if already alive and 2 survives
    else if((upLeft+upMid+upRight+left+right+botLeft+botMid+botRight)==2 && current==1){
        return 1;
    }
    //else dies
    else{
        return 0;
    }
}