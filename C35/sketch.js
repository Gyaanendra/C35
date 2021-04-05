var ball;
var database;
var ballPositionRef;
var newPosition;

function setup(){

    //create a database inside the variable database --> firebase.database()
database = firebase.database( ) ;

//use the variable ballPositionRef to refer to the position of the ball in the database --> database.ref()
ballPositionRef = database.ref('ball/position');

//variable ballPositionRef listens to the changes happening in the canvas --> .on("value",function1,function2)
ballPositionRef.on("value",readPosition);

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //refer to the database and update the x and y positions of the ball from the newPosition variable--> .update()
    database.ref('ball/position').update({
        'x':newPosition.x + x,
        'y':newPosition.y + y
    })
  
}

function readPosition(data){
//listened values are stored inside the variable newPosition --> data.val()
newPosition = data.val();

//match the ball's x and y positions to the database x and y positions
ball.x = newPosition.x;
ball.y = newPosition.y;
}


//database - ball --> x: 400, y:100
