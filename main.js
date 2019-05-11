// const faceapi = require('face-api.js');

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  console.log('test');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
      console.log(error)
    });
}
