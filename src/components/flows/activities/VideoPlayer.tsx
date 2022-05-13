import React, { useCallback, useEffect, useState, useCallback } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/fantasy/index.css";
import "../../../assets/styles/components/videoPlayer.scss";
import nextIcon from "../../../assets/images/activities/next_icon.svg";
import prevIcon from "../../../assets/images/activities/prev_icon.svg";

export const VideoPlayer = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady, show, timestamp, height, width } = props;

  const [videos, setVideos] = useState([...options?.sources]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [video, setVideo] = useState(videos[videoIndex]);

  const canNext = videoIndex < videos.length;
  const canPrev = videoIndex - 1 >= 0;

  const handleVideoChange = (action: string) => {
    if (action === "next" && canNext) {
      setVideoIndex((prev) => prev + 1);
      setVideo(videos[videoIndex + 1]);
      console.log(video);
    }

    if (action === "prev" && canPrev) {
      setVideoIndex((prev) => prev - 1);
      setVideo(videos[videoIndex]);
      console.log(video);
    }
  };

  const manageVideo = useCallback(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        player.log("player is ready");
        onReady && onReady(video);
      }));

      // You can update player in the `else` block here, for example:
    } else {
      const videoElement = videoRef.current;
      const player = (playerRef.current = videojs(videoElement, options, () => {
        player.log("player is ready");
        onReady && onReady(player);
      }));
      player.autoplay(options.autoplay);
      player.src(video);
    }
  }, [options, videoRef, video]);

  useEffect(() => {
    manageVideo();
  }, []);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    show && (
      <div className="video-player-container">
        <div className="camera-details">
          <h1 className="cam-name">Cam 03</h1>
          <h1 className="time">{timestamp}</h1>
        </div>
        {canPrev && (
          <div className="prev-icon" onClick={() => handleVideoChange("prev")}>
            <img src={prevIcon} alt="prev icon" />
          </div>
        )}
        {canNext && (
          <div className="next-icon" onClick={() => handleVideoChange("next")}>
            <img src={nextIcon} alt="next icon" />
          </div>
        )}
        <div data-vjs-player className="video-player">
          <video
            ref={videoRef}
            className="video-js vjs-theme-fantasy video"
            width="740px"
            height="auto"
          />
        </div>
      </div>
    )
  );
};

export default VideoPlayer;
