"use client";
import React, { useCallback } from "react";
import styles from "./CardsSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import useEmblaCarousel from "embla-carousel-react";
import PrevIcon from "@/Components/UI/Icons/PrevIcon";
import NextIcon from "@/Components/UI/Icons/NextIcon";
import Container from '@mui/material/Container';
import {DotButton, useDotButton} from "@/Components/UI/Embla/EmblaCarouselDotButtons";
import { PrevButton, NextButton, usePrevNextButtons } from "@/Components/UI/Embla/EmblaCarouselArrowButtons";
export default function CardsSectionCarousel({ cards, className }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)
 
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)
  const cardsJSX = cards.map((card, index) => {
    return (
      <div
        key={index}
        className={`${styles.card} embla__slide  overflow-hidden`}
      >
        <div
          className={`${styles.imageWrapper}  embla__slide__number image-wrapper`}
          style={{ paddingBottom: "100%" }}
        >
          {card.image && 
             <Image
             className="image"
             src={card?.image?.url}
             alt={card?.image?.alt || card.title}
             fill
             sizes="100vw"
           />
          }
       
        </div>
        <div className={`${styles.contentWrapper} mt-8`}>
          {card?.subtitle && (
            <Typography
              variant="h6"
              component="div"
              className={styles.subtitle}
              color={"var(--light-on-surface)"}
            >
              {card.subtitle}
            </Typography>
          )}
          <Typography variant="h5" component="h3" className={`${styles.title}`}               color={"var(--light-on-surface)"} style={{fontWeight: 600}}
>
            {card.title}
          </Typography>
         
          <div
            className={`${styles.description} heading-6 mt-16`}
            dangerouslySetInnerHTML={{ __html: card.description }}
          />
          {card.cta &&
            card.cta.map((item, indexKey) => {
              return (
                
                <Link className="flex justify-center" key={indexKey} href={item.link.url}>
                  <Typography variant="subtitle1" component="span" className="flex gap-2 text-link" >
                  {item.link.title}
                  </Typography>
                </Link>
              );
            })}
        </div>
      </div>
    );
  });
  return (
    <div className={`${styles.cardsWrapper} ${className} cards-wrapper embla mt-32`} >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{cardsJSX}</div>
      </div>
      <Container maxWidth="xl" className="flex justify-end">
      <div className="embla__controls ">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

      
      </div>
      </Container>
    </div>
  );
}
