const faceapi = require('face-api.js');
var video = document.querySelector("#videoElement");
let inputSize = 512
let scoreThreshold = 0.5
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      onPlay();
    })
    .catch(function (error) {
      console.log("Something went wrong!");
      console.log(error)
    });
}

function updateTimeStats(timeInMs) {
  forwardTimes = [timeInMs].concat(forwardTimes).slice(0, 30)
  const avgTimeInMs = forwardTimes.reduce((total, t) => total + t) / forwardTimes.length
  $('#time').val(`${Math.round(avgTimeInMs)} ms`)
  $('#fps').val(`${faceapi.round(1000 / avgTimeInMs)}`)
}
async function onPlay() {
  console.log("inside onPlay")
  const videoEl = document.getElementById('videoElement');
  console.log('videoEl ', videoEl);

  if (videoEl.paused || videoEl.ended )
    return setTimeout(() => onPlay())


  const options = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold }); //getFaceDetectorOptions()

  const ts = Date.now()

  const result = await faceapi.detectSingleFace(videoEl, options)
    .withAgeAndGender()

  updateTimeStats(Date.now() - ts)

  if (result) {
    const canvas = $('#overlay').get(0)
    const dims = faceapi.matchDimensions(canvas, videoEl, true)

    const resizedResult = faceapi.resizeResults(result, dims)
    if (withBoxes) {
      faceapi.draw.drawDetections(canvas, resizedResult)
    }
    const { age, gender, genderProbability } = resizedResult

    // interpolate gender predictions over last 30 frames
    // to make the displayed age more stable
    const interpolatedAge = interpolateAgePredictions(age)
    new faceapi.draw.DrawTextField(
      [
        `${faceapi.round(interpolatedAge, 0)} years`,
        `${gender} (${faceapi.round(genderProbability)})`
      ],
      result.detection.box.bottomLeft
    ).draw(canvas)
  }

  setTimeout(() => onPlay())
}
