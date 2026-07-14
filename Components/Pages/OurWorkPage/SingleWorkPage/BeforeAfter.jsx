import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default function BeforeAfter({ beforeImage, afterImage, showTitle=true}) {
  if (!afterImage || !beforeImage) return null;
  return (
    <div>
      {showTitle && 
      <Typography component="h2" variant="h3" className="mb-16 mt-24" color="white">
        Before & After
      </Typography>
    }
      <ReactCompareSlider
        className="image-wrapper"
        onlyHandleDraggable={true}
        style={{
          paddingBottom: `${
            (afterImage.height / afterImage.width) * 100
          }%`,
          touchAction: "pan-y",

        }}
        itemTwo={
          <Image
            src={beforeImage.url}
            alt={beforeImage.alt ? beforeImage.alt : "Before"}
            objectFit="cover"
            fill
          />
        }
        itemOne={
          <Image
            src={afterImage.url}
            alt={afterImage.alt ? afterImage.alt : "Before"}
            fill
                        objectFit="cover"

          />
        }
      />
    </div>
  );
}

