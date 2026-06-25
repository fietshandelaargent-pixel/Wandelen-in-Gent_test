const openCameraBtn = document.getElementById("openCameraBtn");
const captureBtn = document.getElementById("captureBtn");
const switchCameraBtn = document.getElementById("switchCameraBtn");
const retryBtn = document.getElementById("retryBtn");

const video = document.getElementById("video");
const resultImage = document.getElementById("resultImage");
const downloadBtn = document.getElementById("downloadBtn");

const startScreen = document.getElementById("startScreen");
const cameraScreen = document.getElementById("cameraScreen");
const resultScreen = document.getElementById("resultScreen");

let stream;
let front = true;

function show(screen) {
  startScreen.classList.remove("active");
  cameraScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  screen.classList.add("active");
}

async function startCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: front ? "user" : "environment" }
  });

  video.srcObject = stream;
}

openCameraBtn.onclick = async () => {
  show(cameraScreen);
  await startCamera();
};

switchCameraBtn.onclick = async () => {
  front = !front;
  await startCamera();
};

captureBtn.onclick = () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const overlay = document.getElementById("overlay");
  ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

  const img = canvas.toDataURL();
  resultImage.src = img;
  downloadBtn.href = img;

  show(resultScreen);
};

retryBtn.onclick = () => {
  show(cameraScreen);
};
