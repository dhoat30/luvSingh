
import React from "react";
import Image from "next/image";
export default function JustImageHero({ desktopImage }) {
  return (
    <section
    className="image-wrapper"
      style={{
        paddingBottom: `${(desktopImage?.height / desktopImage?.width) * 100}%`,
      }}
    >
      {desktopImage && (
        <Image src={desktopImage?.url} alt="Project hero image" fill />
      )}
    </section>
  );
}
