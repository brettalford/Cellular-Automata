
let cells=[];
let bias=[1,0,0,0,0,0,0,0,0];
let w=1;

function setup(){
    frameRate(35);
    createCanvas(200,200);
    let total= width/w;
    //setting up 2d
    for (let i=0;i<total;i++){
        cells[i]=[];
        for(let j = 0;j<total;j++){
            cells[i][j]=[]
            cells[i][j][0]=bias[floor(random(4))];
            if(cells[i][j][0]==1){
                cells[i][j][1]=100;
            }
            else{
                cells[i][j][1]=0;
            }
        }
    }
}


function draw(){
    let len=cells[0].length; 
    let total= width/w;
    //basically filling it with randomness to start
    for(let i =0; i<total; i++){
        
        for (let j=0; j<len;j++){
            noStroke();
            //uncomment for flipped scheme
            fill(/*255-*/cells[i][j][0]*255);
            square(i*w,j*w,w);
        }
    }

    
    //determining current cell values and next cells
    let nextCells=[];
    for(let i=0;i<len;i++){
        nextCells[i]=[];
        for(let j=0;j<len;j++){
            //getting values for state
            let upLeft = cells[(i - 1 + total) % total][(j - 1 + total) % total][0];
            let upMid = cells[i][(j - 1 + total) % total][0];
            let upRight = cells[(i + 1) % total][(j - 1 + total) % total][0];
            let left = cells[(i - 1 + total) % total][j][0];
            let current = cells[i][j][0];
            let right = cells[(i + 1) % total][j][0];
            let botLeft = cells[(i - 1 + total) % total][(j + 1) % total][0];
            let botMid = cells[i][(j + 1) % total][0];
            let botRight = cells[(i + 1) % total][(j + 1) % total][0];


            //getting values for age
            let age = cells[i][j][1];
            let upLeftAge = cells[(i - 1 + total) % total][(j - 1 + total) % total][1];
            let upMidAge = cells[i][(j - 1 + total) % total][1];
            let upRightAge = cells[(i + 1) % total][(j - 1 + total) % total][1];
            let leftAge = cells[(i - 1 + total) % total][j][1];
            let rightAge = cells[(i + 1) % total][j][1];
            let botLeftAge = cells[(i - 1 + total) % total][(j + 1) % total][1];
            let botMidAge = cells[i][(j + 1) % total][1];
            let botRightAge = cells[(i + 1) % total][(j + 1) % total][1];
            //funciton to change state
            let [nextState,nextAge]=changeState(upLeft,upMid,upRight,left,current,right,botLeft,botMid,botRight,age,upLeftAge,upMidAge,upRightAge,leftAge,rightAge,botLeftAge,botMidAge,botRightAge);



            nextCells[i][j] = [nextState,nextAge];

        }
    }
    cells=nextCells;


}


function changeState(upLeft,upMid,upRight,left,current,right,botLeft,botMid,botRight,age,upLeftAge,upMidAge,upRightAge,leftAge,rightAge,botLeftAge,botMidAge,botRightAge){
    let newAge=age-1;
    let neighborval=upLeft+upMid+upRight+left+right+botLeft+botMid+botRight;
    let neighborsAges=[upLeftAge,upMidAge,upRightAge,leftAge,rightAge,botLeftAge,botMidAge,botRightAge];
    let neighborAgeGreater=0;
    for(let i=0;i<8;i++){
        if(neighborsAges[i]>=50){
            neighborAgeGreater++;
        }
    }

    //if currently dead
    if(current==0){
        //if exactly 3 next will be alive and are of reproductive age, reproduce
        if((neighborval)==3&&neighborAgeGreater>=2){
            newAge=100;
            return [1,100];
        }
        else{
            return [0,0]
        }
    }

    //if more than 3 neighbors harm by overcrowding
    else if((neighborval)>3){
        //stress from overcrowding (removed for now)
        newAge=newAge-0*(neighborval-3);
        //if alive still
        if (newAge>0){
            return [1,newAge];
        }
        //if not
        else{
            return [0,0];
        }
    }

    //if already alive and 3 survives if age is not death age
    else if((neighborval)==3 && current==1&& newAge>0){
        return [1,newAge];
    }
    //if already alive and 2 survives if age is not death age
    else if((neighborval)==2 && current==1 &&newAge>0){
        return [1,newAge];
    }


    //1 neighbor
    else if(neighborval==1&&current==1){
        newAge-=50;
        if (newAge<1){
            return [0,0];
        }
        else{
            return [1,newAge];
        }
    }

    //0 neighbor
    else if(neighborval==0&&current==1){
        newAge-=99;
        if (newAge<1){
            return [0,0];
        }
        else{
            return [1,newAge];
        }
    }

    else return [0,0]
    
}