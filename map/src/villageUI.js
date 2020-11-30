function setImage(){
    backgroundImg = new Image();
    backgroundImg.src = "backgroundImg/village.jpg";

    for(let i=2; i<14; i++){
        items[i] = new Image();
        items[i].src = `itemImg/${i}.png`;
    }
    //console.log(ghost);
}

function drawVillage(){
    var width = canvas.width;
    var height = canvas.height;
    bufferCtx.drawImage(backgroundImg, 0, 0, width, height); 

    bufferCtx.strokeStyle = color.lightRed;
    bufferCtx.fillStyle = color.lightRed;
    bufferCtx.lineWidth = canvas.height*0.02;  
    bufferCtx.beginPath();
    bufferCtx.moveTo(0,canvas.height*0.25);
    bufferCtx.lineTo(canvas.width*0.1,canvas.height*0.25);
    bufferCtx.lineTo(canvas.width*0.1,canvas.height*0.85);
    bufferCtx.lineTo(0,canvas.height*0.85);

    bufferCtx.stroke();

    bufferCtx.fillRect(canvas.width*0.0, canvas.height*0.18, canvas.width*0.1, canvas.height*0.08);
    bufferCtx.strokeRect(canvas.width*0.0, canvas.height*0.19, canvas.width*0.1, canvas.height*0.05);
    bufferCtx.moveTo(0,canvas.height*0.25);
    bufferCtx.fillStyle = color.lightBlack;  
    
    bufferCtx.font = `Bold ${canvas.height*0.04}px Noto Sans KR`;
    bufferCtx.fillText('사냥 지대', canvas.width*0.006,  canvas.height*0.24);
}