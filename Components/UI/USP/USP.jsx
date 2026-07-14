import styles from "./USP.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { Paper } from "@mui/material";
export default function USP({
  title,
  description,
  cards,
  showTitle = false,
  statsArray,
}) {
  return (
    <section className={`${styles.section} flex align-center justify-center`}>
      <Container maxWidth="xl" >
        {showTitle && (
          <div className="title-wrapper">
            <Typography variant="h5" component="h2" color={"var(--dark-on-surface)"} className="bold">
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="description mt-8"
                     color={"var(--dark-on-surface-variant)"}
            >
              {description}
            </Typography>
          </div>
        )}
        
        <div className={`${styles.cardsWrapper} mt-32 justify-center flex gap-32 flex-wrap`}>
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => (
              <Paper key={index} className={`${styles.card} border-radius-8`} variant="contained"  elevation={1}>
                
                <Image
                  src={card.icon.url}
                  alt={card.icon.alt}
                  width={card.icon.width/1.2}
                  height={card.icon.height/1.2}
                  className={styles.image}
                />
                <div className="content">
                  <Typography
                    variant="h6"
                    component="h3"
                    className={`${styles.title} mt-16`}
                    color={"var(--dark-on-surface)"}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className="description mt-8"
                    color={"var(--dark-on-surface-variant)"}
                  >
                    {card.description}
                  </Typography>
                </div>
              </Paper>
              
            ))}
        </div>
      </Container>
    </section >
  );
}
