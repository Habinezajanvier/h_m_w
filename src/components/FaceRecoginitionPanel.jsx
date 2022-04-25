import "../assets/styles/components/faceRecoginitionPanel.scss";
import Card from "./Card";
import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { create } from "ipfs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import worker from "../workerThreads";
import { create as createIPFSClient, urlSource } from "ipfs-http-client";
import { setTimeout } from "timers";

const FaceRecoginitionPanel = () => {
  const [initalizing, setInitializing] = useState(false);
  const [init, setInit] = useState(false);
  const [isRecStart, setIsRecStart] = useState(false);
  const [uploadPending, setIUploadPending] = useState(true);
  const videoRef = useRef();
  const canvasref = useRef();
  const panelRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("adjk", init);
  }, [init]);

  useEffect(() => {
    const loadModels = async () => {
      const Model_URI = process.env.REACT_APP_FACE_API_MODELS_URI;

      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(Model_URI),
        faceapi.nets.faceLandmark68Net.loadFromUri(Model_URI),
        faceapi.nets.faceRecognitionNet.loadFromUri(Model_URI),
        faceapi.nets.faceExpressionNet.loadFromUri(Model_URI),
      ]).then(startVideo);
    };
    startVideo();
    loadModels();

    // worker.postMessage(
    //   Promise.all([
    //     faceapi.nets.tinyFaceDetector.loadFromUri(
    //       process.env.REACT_APP_FACE_API_MODELS_URI
    //     ),
    //     // faceapi.nets.faceLandmark68Net.loadFromUri(Model_URI),
    //     faceapi.nets.faceRecognitionNet.loadFromUri(
    //       process.env.REACT_APP_FACE_API_MODELS_URI
    //     ),
    //     // faceapi.nets.faceExpressionNet.loadFromUri(Model_URI),
    //   ]).then(startVideo)
    // );

    // worker.onmessage = function(message){
    //   console.log(message)
    // }
  }, []);

  const startVideo = () => {
    navigator.getUserMedia(
      {
        video: {},
      },
      (stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = function (e) {};
        setInit(true);
        return stream;
      },
      (err) => {
        console.error(err);
        setInit(false);
      }
    );
  };

  useEffect(() => {
    // if (isRecStart) {
    //   console.log("rec btn clicked")
    videoRef.current &&
      videoRef.current.addEventListener("play", async () => {
        console.log("rec startred");
        var node = await create();
        const results = await node.add("=^.^= meow meow");
        if (!results) console.log("Error Setting data to ipfs");
        else console.log(results);
        const cid = results.path;
        console.log("CID created via ipfs.add:", cid);
        const data = await node.cat(cid);
        console.log("Data read back via ipfs.cat:", data);
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        panelRef.current.append(canvas);
        const displaySize = {
          width: videoRef.current.width,
          height: videoRef.current.height,
        };
        faceapi.matchDimensions(canvas, displaySize);
        var capturedFrameArray = [];

        let isMyFileNotUploaded = true;
        let ipfs_client = createIPFSClient();
        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          // extracting face from camera
          if (
            resizedDetections.length > 0 &&
            resizedDetections[0].detection.score > 0.7
            // resizedDetections[0].expressions.happy > 0.5
          ) {
            let coordX = resizedDetections[0].detection._box._x;
            let coordY = resizedDetections[0].detection._box._y;
            let cWidth = resizedDetections[0].detection._box._width;
            let cHeight = resizedDetections[0].detection._box._height;

            // calculating coords and with/height from video frame
            const regionsToExtract = [
              new faceapi.Rect(coordX, coordY, cWidth, cHeight),
            ];

            // etracting faces from video frame via faceapi
            let faceImages = await faceapi.extractFaces(
              videoRef.current,
              regionsToExtract
            );

            // checking if face avilable
            if (faceImages.length === 0) {
              console.log("No face found");
            } else {
              const outputImage = "";
              faceImages.forEach(async (cnv) => {
                let cnvImg = cnv.toDataURL();
                // console.log("face found ", cnvImg);
                // if (cnvImg) {
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 3000);
                // }
                console.log("image found");
                // const file = await ipfs.add(urlSource('https://ipfs.io/images/ipfs-logo.svg'))
                if (isMyFileNotUploaded) {
                  // console.log("ipfs", ipfs_client);
                  const file = await ipfs_client.add("abcdef");
                  console.log("uploaded file:", file);
                  isMyFileNotUploaded = false;
                }
                // setTimeout(() => {
                //   navigate("/dashboard");
                // }, 3000);
              });
            }

            // document.getElementById("screenshot").appendChild(img);
          }

          // console.log("detedtions",detections)
          // console.log("canvas",canvas);
          // if number of faces == 1
          // for 3 seconds capture the face

          if (capturedFrameArray.length < 30) {
            capturedFrameArray.push(canvas.toDataURL());
            if (node) {
              window.ipfs = node;
              const data = await node.add(canvas.toDataURL("image/jpeg"), 0.1);
              // sign the data
              // call the mutation
              window.data = data;
              console.log(data.pat);
            }
          }

          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);

          // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          // console.log(resizedDetections)
          // console.log(detections)
        }, 100);
      });
    // }
  }, [isRecStart]);

  return (
    <div
      className={`faceRecoginitionPanel card-shadow ${init ? "" : "d-none"}`}
      ref={panelRef}
    >
      {init && (
        <div className="goBack-arrow">
          <KeyboardBackspaceIcon className="c-pointer" />
        </div>
      )}

      <div>
        {init && <div className="record-head flex-center-center">Karnatak</div>}

        <video ref={videoRef} autoPlay muted width="667" height="501" />
        {/* <canvas ref={canvasref} className={"detection-canvas"}></canvas> */}
        {init && (
          <div className="record-footer">
            <div className="rec-footer-option c-pointer">Reset</div>
            <div
              className={`rec-btn ${isRecStart ? "active-rec-btn" : ""}`}
              onClick={() => setIsRecStart(!isRecStart)}
            ></div>
            <div></div>
            <div className="rec-time c-poiinter">0:56sec</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceRecoginitionPanel;
