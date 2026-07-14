"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Script from "next/script";
import styles from './BookConsultation.module.scss'
export default function BookConsultation({ techLogos }) {
  const [key, setKey] = useState(Date.now);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    <section style={{background: "var(--light-surface-container-lowest"}}>
 <Container maxWidth="xl" className={`${styles.section} row grid`}>
        <Box>
          <Typography variant="h1" component="h1" color="var(--light-on-surface)" >
            Book Your Free Consultation
          </Typography>
          <Typography variant="h6" component="h2" color="var(--light-on-surface)" className="mt-16">
            We are here to make your digital dreams a reality. When you book
            your free consultation with us, you are signing up for a
            complimentary half-hour session with our expert.
          </Typography>
          <Typography variant="h6" component="h2" color="var(--light-on-surface)" className="mt-16">
            During this session, we will ask you a series of questions to
            understand your unique needs, goals, and challenges.
          </Typography>
        </Box>
        <div className={styles.hubspotWrapper}>
          <div
            className="meetings-iframe-container"
            data-src="https://meetings.hubspot.com/gurpreet-dhoat?embed=true"
          ></div>
        </div>
        <Script
          type="text/javascript"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        />
      </Container>
    </section>
     
    </>
  );
}

