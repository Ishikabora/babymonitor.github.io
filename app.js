song="";
Status = "";
objects = [];

function preload(){
    song = loadSound("baby_Monitoring.mp3");
  }
  
  
  function setup() {
    canvas = createCanvas(380, 380);
    canvas.position(450, 300)
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    
  }

  function start()
  { 
   objectDetector = ml5.objectDetector('cocossd', modalLoaded);
   document.getElementById("status").innerHTML = "Status : Dectecting Objects";
 }
  
function modalLoaded()
{
  console.log("Modal Loaded");
  Status = true;
}

function gotResult(error,results)
{
  if (error)
  {
    console.log(error);
  }
   console.log(results);
   objects = results;
}

  function draw(){
  image(video, 0,0, 380, 380);
  if(Status != "")
  {
   r = random(255);
   g = random(255);
   b = random(255);
   objectDetector.detect(video , gotResult);
    for(i = 0; i < objects.length ; i++)
    {
    if (objects[i].label == "person"){
      document.getElementById("status").innerHTML = "Status : Baby Detected";
      document.getElementById("found").innerHTML = "Baby Found";
      song.stop();
      fill(r,g,b);
      percent = floor(objects[i].confidence*100);
      text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    }
    else{
      document.getElementById("status").innerHTML = "Status : Baby not Detected";
      document.getElementById("found").innerHTML = "Baby not found";
      song.play();
    }
    }
   }
  }
   
  
  
  