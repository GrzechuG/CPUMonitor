
cpuUsage = 10; //%
topStr = ''
diskUsage = 0;
ssid = 'NONE'
let usageAnim = 0;
let usageAnim_speed = 1;
let cpuAnim = 0;
let ip;
let wifi;
let backgroundImg;
let iwconfig;
let baseX = 150;
let baseY = 200;
let font1;
let warnings;
let errors;
let apiStatus="Offline";
function preload(){
  wifi = loadImage("images/wifi.png");
  backgroundImg = loadImage("images/background.jpg");
  font1 = loadFont("zero_hour.ttf")
//img.mask(wifi);

}
function setup(){

  resizeCanvas(windowWidth, windowHeight);

  ApiCollect();


}


function drawDot(i,w, r){

  stroke(0,0,255);
  //fill(0,0,0)

  dotX= baseX+110+sin(i)*r;
  dotY = baseY+110+cos(i)*r;
  ellipse(dotX,dotY,w,w);

}

function ApiCollect(){

  httpGet('cpuMonServ.php?mode=status', 'text', false, function(response) {
    apiStatus = response.replace("\n","");
    if(apiStatus!="Online"){
      apiStatus="Offline";
    }
  })
  httpGet('cpuMonServ.php?mode=cpu', 'text', false, function(response) {
    cpuUsage = response.replace("\n","");
  })
  httpGet('cpuMonServ.php?mode=top', 'text', false, function(response) {
    topStr = response;
  })

  httpGet('cpuMonServ.php?mode=disk', 'text', false, function(response) {
    diskUsage = response.replace("%\n","");
    //diskUsage=90;
  })

  httpGet('cpuMonServ.php?mode=ssid', 'text', false, function(response) {
    ssid = response.replace("\n","");
  })

  httpGet('cpuMonServ.php?mode=ip', 'text', false, function(response) {
    ip = response;
  })

  httpGet('cpuMonServ.php?mode=iwconfig', 'text', false, function(response) {
    iwconfig = response;
  })

  httpGet('cpuMonServ.php?mode=warnings', 'text', false, function(response) {
    warnings = response.replace("\n","");
  })
  httpGet('cpuMonServ.php?mode=errors', 'text', false, function(response) {
    errors = response.replace("\n","");
  })


}

i=0;
num = 0;

function draw(){

  if(usageAnim<diskUsage){
      usageAnim+=0.38;
  }else{
    if(usageAnim>diskUsage){
      usageAnim-=0.38;
    }

  }

  if(cpuAnim<cpuUsage){
    cpuAnim+=0.1;
  }else{
    if(cpuAnim>cpuUsage)
    cpuAnim-=0.1;
  }
  cpuAnim = round(cpuAnim,2);



  background(0);
  image(backgroundImg, 0-150, 0-150, windowWidth+250, windowHeight+250);
  if(num>350){
    num=0;
    ApiCollect();
}


  num++;
  //cpuUsage =100;
  fill(color(200,200,210));
  for(j=0; j<((cpuAnim));j++){
    siz = (cpuAnim-j)/3.14;
    if(siz>20){
      siz=20;
    }
    drawDot(i-j,(siz), 100-j);
  }


  i+=0.0006*cpuAnim;

 // fill(color(255,255,255));
  stroke(color(255,255,255));
  text("CPU:\n"+cpuAnim+"%", baseX+100-15, baseY+100-15);
  textSize(20);

  text(topStr, baseX+50, baseY+110+140)
  console.log(diskUsage);
  textSize(20);
  //Disk usage:
  rect(baseX+310, baseY+10, 100, 200);
  fill(20,200,255);
  // fill(0,200,0);
  // if(diskUsage>=60){
  //   fill(220,160,0);
  // }
  //
  if(diskUsage>=90){
      fill(200,0,0);

  }

  //fill(0+2.25*diskUsage, 0-2.25*diskUsage, 0);

  rect(baseX+310, baseY+10+200-usageAnim*2, 100, 200 - (200-usageAnim*2));
  fill(255,255,255)
  text("Disk:\n"+round(usageAnim)+"%", baseX+(310+100/2)-10, baseY+(10+200/2)-10)

  //Errors:
  noStroke();
  if(errors>0){
    fill(255,0,0);
  }else{
    fill(0,255,0);
  }
  text("Errors today:"+errors,baseX+(310), baseY+300)

  if(warnings>0){
    fill(255,255,0);
  }else{
    fill(0,255,0);
  }

  text("Warnings today:"+(warnings-errors),baseX+(310), baseY+330)


  if(apiStatus == "Online"){
    fill(0,255,0);

    }else{
      fill(255,0,0);
    }


  text("Api status: "+apiStatus,baseX, baseY-50)

    fill(255,255,255)
  //Wifi:
  image(wifi, baseX+500,baseY+10, 100,100);
  text("Wifi",baseX+620, baseY+50)
  text("Ssid: "+ssid,baseX+620,baseY+70)
  text("Ip Adress: "+ip, baseX+620,baseY+90)
  text("Iwconfig: "+iwconfig, baseX+500,baseY+130)








}
