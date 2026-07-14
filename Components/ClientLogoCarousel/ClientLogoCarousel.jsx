"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import styles from "./ClientLogoCarousel.module.scss";

export default function ClientLogosCarousel({
  logos = [],
  speed = 0.7,
  pauseOnHover = true,
  ariaLabel = "Client logos",
}) {
  const slides = useMemo(() => {
    if (!logos || !logos.length) return [];
    const min = 18;
    if (logos.length >= min) return logos;
    const times = Math.ceil(min / logos.length);
    return Array.from({ length: times }, () => logos).flat();
  }, [logos]);

  const viewportNodeRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: false,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed,
        stopOnInteraction: true,
        stopOnMouseEnter: false, // we handle hover ourselves
      }),
    ]
  );

  // Combine refs: give Embla the node AND store it locally for listeners
  const setViewportRef = useCallback(
    (node) => {
      viewportNodeRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  useEffect(() => {
    if (!pauseOnHover) return;
    const node = viewportNodeRef.current;
    if (!node || !emblaApi) return;

    const stop = () => emblaApi.plugins()?.autoScroll?.stop();
    const play = () => emblaApi.plugins()?.autoScroll?.play();

    // Mouse
    node.addEventListener("mouseenter", stop);
    node.addEventListener("mouseleave", play);

    // Keyboard accessibility (optional but nice)
    node.addEventListener("focusin", stop);
    node.addEventListener("focusout", play);

    return () => {
      node.removeEventListener("mouseenter", stop);
      node.removeEventListener("mouseleave", play);
      node.removeEventListener("focusin", stop);
      node.removeEventListener("focusout", play);
    };
  }, [emblaApi, pauseOnHover]);

  if (!slides.length) return null;

  return (
    <section className={styles.section} aria-label={ariaLabel}>
      <div className={styles.viewport} ref={setViewportRef}>
        <div className={styles.container}>
          {slides.map((logo, idx) => {
            const content = (
              <div
                className={styles.logoWrap}
                style={{
                  paddingBottom: `${(logo.image.height / logo.image.width) * 100}%`,
                }}
              >
                <Image
                  src={logo.image.url}
                  alt={logo.image.alt || "Client logo"}
                  fill
                  sizes="(max-width: 768px) 140px, 180px"
                  className={styles.logoImg}
                />
              </div>
            );

            return (
              <div className={styles.slide} key={`${logo?.image?.url ?? "logo"}-${idx}`}>
                {logo.href ? (
                  <a
                    className={styles.logoLink}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={logo.image?.alt || "Client logo"}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
