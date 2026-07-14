"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PlayIcon from "@/Components/UI/Icons/PlayIcon";
import styles from "./VideoWorkSection.module.scss";

export default function VideoWorkSection({
  title,
  description,
  landscapeVideos = [],
  verticalVideos = [],
}) {
  const [activeFormat, setActiveFormat] = useState(
    landscapeVideos.length ? "landscape" : "vertical"
  );
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (!selectedVideo) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedVideo(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedVideo]);

  if (!landscapeVideos.length && !verticalVideos.length) return null;

  const activeVideos =
    activeFormat === "landscape" ? landscapeVideos : verticalVideos;

  return (
    <section className={styles.section} id="work">
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        {landscapeVideos.length > 0 && verticalVideos.length > 0 && (
          <div className={styles.formatSelector} role="tablist" aria-label="Video format">
            <button
              type="button"
              role="tab"
              aria-selected={activeFormat === "landscape"}
              aria-controls="video-work-gallery"
              className={activeFormat === "landscape" ? styles.active : ""}
              onClick={() => setActiveFormat("landscape")}
            >
              Landscape
              <span>{landscapeVideos.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFormat === "vertical"}
              aria-controls="video-work-gallery"
              className={activeFormat === "vertical" ? styles.active : ""}
              onClick={() => setActiveFormat("vertical")}
            >
              Vertical
              <span>{verticalVideos.length}</span>
            </button>
          </div>
        )}

        <div
          id="video-work-gallery"
          role="tabpanel"
          className={`${styles.gallery} ${
            activeFormat === "vertical" ? styles.verticalGallery : styles.landscapeGallery
          }`}
        >
          {activeVideos.map((video, index) => {
            const thumbnail = video.thumbnail;
            const imageUrl = thumbnail?.sizes?.large || thumbnail?.url;
            const label = video.label?.trim() || `Portfolio video ${index + 1}`;

            if (!imageUrl || !video.youtube_id) return null;

            return (
              <article className={styles.videoItem} key={`${video.youtube_id}-${index}`}>
                <button
                  type="button"
                  className={styles.thumbnailButton}
                  aria-label={`Play ${label}`}
                  onClick={() => setSelectedVideo({ ...video, format: activeFormat, label })}
                >
                  <span className={styles.thumbnailWrapper}>
                    <Image
                      src={imageUrl}
                      alt={thumbnail.alt || label}
                      fill
                      sizes={
                        activeFormat === "vertical"
                          ? "(max-width: 700px) 50vw, 25vw"
                          : "(max-width: 700px) 100vw, 50vw"
                      }
                      className={styles.thumbnail}
                    />
                    <span className={styles.overlay} />
                    <PlayIcon className={styles.playIcon} />
                  </span>
                </button>
                <h3 className={styles.videoLabel}>{label}</h3>
              </article>
            );
          })}
        </div>
      </div>

      {selectedVideo && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${selectedVideo.label}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedVideo(null);
          }}
        >
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close video"
            title="Close video"
            onClick={() => setSelectedVideo(null)}
            autoFocus
          >
            <span aria-hidden="true" />
          </button>
          <div
            className={`${styles.playerWrapper} ${
              selectedVideo.format === "vertical" ? styles.verticalPlayer : ""
            }`}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtube_id}?autoplay=1&rel=0`}
              title={selectedVideo.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
