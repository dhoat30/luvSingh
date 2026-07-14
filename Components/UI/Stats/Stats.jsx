import React from "react";
import styles from "./Stats.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
export default function Stats({ statsData }) {
  const stats = statsData?.map((item, index) => {
    return (
      <div className={styles.statWrapper} key={index}>
        <Typography className={styles.value} variant="h2" component="span">
          {item.value}
        </Typography>
        <Typography className={styles.title} variant="h6" component="h3">
          {item.title || item.label}
        </Typography>
        {item.description && (
          <Typography className={styles.description} variant="body2" component="p">
            {item.description}
          </Typography>
        )}
      </div>
    );
  });

  if (!statsData?.length) return null;

  return (
    <section className={styles.section} aria-label="Key results">
      <Container maxWidth="xl" className={styles.container}>
        {stats}
      </Container>
    </section>
  );
}
