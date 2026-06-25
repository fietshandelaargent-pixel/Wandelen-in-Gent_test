const CONFIG={overlayPath:'./assets/postcard-overlay.png',useFrontCamera:true,outputFormat:'png'};
const startScreen=document.getElementById('startScreen');
const cameraScreen=document.getElementById('cameraScreen');
const resultScreen=document.getElementById('resultScreen');
<p style="margin-top:15px;">
📸 Deel jouw postkaart met <strong>#maandvandevoetganger</strong>
</p>
``
const openCameraBtn=document.getElementById('openCameraBtn');
const captureBtn=document.getElementById('captureBtn');
const switchCameraBtn=document.getElementById('switchCameraBtn');
const retryBtn=document.getElementById('retryBtn');
const video=document.getElementById('video');
const overlay=document.getElementById('overlay');
const resultImage=document.getElementById('resultImage');
const downloadBtn=document.getElementById('downloadBtn');
let currentStream;let useFront=CONFIG.useFrontCamera;overlay.src=CONFIG.overlayPath;
function showScreen(s){startScreen.classList.remove('active');cameraScreen.classList.remove('active');resultScreen.classList.remove('active');s.classList.add('active')}
async function startCamera(){if(currentStream){currentStream.getTracks().forEach(t=>t.stop())}
const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:useFront?'user':'environment'}});
video.srcObject=stream;currentStream=stream}
function capturePhoto(){const canvas=document.createElement('canvas');
const w=video.videoWidth,h=video.videoHeight;canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');
if(useFront){ctx.translate(w,0);ctx.scale(-1,1)}ctx.drawImage(video,0,0,w,h);
if(useFront){ctx.setTransform(1,0,0,1,0,0)}
const img=new Image();img.src=CONFIG.overlayPath;
img.onload=()=>{ctx.drawImage(img,0,0,w,h);
const url=canvas.toDataURL('image/'+CONFIG.outputFormat);
resultImage.src=url;downloadBtn.href=url;showScreen(resultScreen)}}
openCameraBtn.onclick=async()=>{showScreen(cameraScreen);await startCamera()};
captureBtn.onclick=capturePhoto;
switchCameraBtn.onclick=async()=>{useFront=!useFront;await startCamera()};
retryBtn.onclick=()=>showScreen(cameraScreen);
