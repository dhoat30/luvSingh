'use client'
import React, { useState, useEffect } from "react"; 
import dynamic from "next/dynamic";
import Image from "next/image";
import PlayIcon from "../Icons/PlayIcon";
import styles from "./Video.module.scss";
const ReactPlayer = dynamic(
  () => import("react-player").then(mod => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);
// import BackgroundGradientHero from "../Icons/BackgroundGradientHero";
export default function Video({
  videoID,
  placeholderImage,
  className,
  showCompressedImage,
  priority=false
}) {
  const imageURL = showCompressedImage
    ? placeholderImage?.sizes?.large
    : placeholderImage?.url;
  const [videoLoaded, setVideoLoaded] = useState(false); // New state for tracking video load

  // Function to load and play the video
  const handleImageClick = () => {
    setVideoLoaded(true);
  };
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.videoWrapper}`}>
          


        {!videoLoaded && (
          <>
            <div className={`${styles.videoOverlay}`}></div>
            <Image
              onClick={handleImageClick}
              src={imageURL} // Replace with your placeholder image path
              fill
              alt={placeholderImage.alt}
              style={{
                objectFit: "cover", 
                borderRadius: "12px"
                // cover, contain, none
              }}
              sizes="(max-width: 1200px) 100vw, 80vw"
              priority={priority}

            />
            <div className={`${styles.buttonStyled} flex align-center` }  onClick={handleImageClick}>
              <PlayIcon />
            </div  >
          </>
        )}

        {videoLoaded && (
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${videoID}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: "12px",
              overflow: "hidden",
              background: "var(--dark-surface-container-high"
            }}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
          />
        )}
        
      </div>
    </div>
  );
}
