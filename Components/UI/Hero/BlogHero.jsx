
import React from "react";
import Image from "next/image";
import Video from "@/Components/UI/Video/Video";
export default function BlogHero({ className, videoID, featuredImage }) {
  return (
    <section className={className}>
      {videoID ? (
        <div className="video-wrapper">
          <Video placeholderImage={featuredImage} videoID={videoID} />
        </div>
      ) : (
        <div
          className="featured-image-wrapper"
          style={{
            position: "relative", 
            width: "100%", 
            paddingBottom: `${
              (featuredImage.height / featuredImage.width) * 100
            }%`,
          }}
        >
          <Image src={featuredImage.url} fill alt={featuredImage.alt} />
        </div>
      )}
    </section>
  );
}
