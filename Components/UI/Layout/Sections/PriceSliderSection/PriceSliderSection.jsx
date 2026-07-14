"use client";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Bubble from "./Bubble";
import Container from "@mui/material/Container";
import RowSection from "../RowSection/RowSection";
import styles from "./PriceSliderSection.module.scss";

const minValue = 3000;
const maxValue = 30000;
const marks = [
  {
    value: minValue,
    label: "$3,000",
  },
  {
    value: maxValue,
    label: "$30,000",
  },
];

const bubbles = [
  { label: "SEO", threshold: 3000, x: "0", y: "5%", size: 50 },
  { label: "Responsive", threshold: 3000, x: "5%", y: "0%", size: 120 },
  { label: "Optimization", threshold: 3000, x: "0%", y: "40%", size: 120 },

  { label: "Hosting", threshold: 3700, x: "0%", y: "85%", size: 80 },

  { label: "Research", threshold: 4500, x: "11%", y: "40%", size: 85 },
  { label: "Strategy", threshold: 4700, x: "19%", y: "34%", size: 80 },
  { label: "Copywriting", threshold: 5000, x: "10%", y: "70%", size: 120 },

  { label: "UX", threshold: 5200, x: "15%", y: "0%", size: 50 },
  { label: "UI", threshold: 5500, x: "16%", y: "19%", size: 50 },
  { label: "CMS", threshold: 5700, x: "20%", y: "0%", size: 50 },
  { label: "Data Models", threshold: 6000, x: "22%", y: "60%", size: 120 },

  { label: "User Auth", threshold: 6200, x: "24%", y: "5%", size: 100 },

  { label: "API", threshold: 6500, x: "27%", y: "42%", size: 38 },
  { label: "CRM", threshold: 6700, x: "31%", y: "30%", size: 50 },
  { label: "Mailgun", threshold: 7000, x: "32%", y: "0%", size: 70 },

  { label: "ERP", threshold: 7200, x: "32%", y: "50%", size: 50 },
  { label: "3PL", threshold: 7500, x: "36%", y: "24%", size: 40 },

  { label: "Cloud Hosting", threshold: 7700, x: "33%", y: "70%", size: 120 },
  { label: "GDPR/CCPA", threshold: 8000, x: "37%", y: "37%", size: 100 },
  { label: "Streaming", threshold: 12000, x: "44%", y: "68%", size: 120 },
  { label: "SMS", threshold: 13000, x: "39%", y: "6%", size: 60 },

  {
    label: "Payment Processing",
    threshold: 15000,
    x: "45%",
    y: "0%",
    size: 180,
  },

  { label: "Complex Logic", threshold: 17000, x: "54%", y: "60%", size: 140 },
  { label: "Headless CMS", threshold: 17000, x: "61%", y: "10%", size: 140 },

  {
    label: "React Native App",
    threshold: 20000,
    x: "67%",
    y: "60%",
    size: 150,
  },

  { label: "Caching", threshold: 20000, x: "73%", y: "0%", size: 150 },
  { label: "Load Balancing", threshold: 20000, x: "80%", y: "50%", size: 150 },

  { label: "Android App", threshold: 25000, x: "87%", y: "5%", size: 130 },
  { label: "iOS App", threshold: 30000, x: "92%", y: "70%", size: 80 },
];
export default function PriceSliderSection({
  title,
  description,
  ctaGroup,
  image,
  imageAlignment,
}) {
  const [sliderValue, setSliderValue] = useState(minValue);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <section className={`${styles.section}`}>
      <RowSection
        title={title}
        description={description}
        image={image}
        imageAlignment={imageAlignment}
        backgroundColor={"var(--dark-surface-lowest)"}
        fontColor={"section.font_color"}
        ctaGroup={{cta: { 
          url: ctaGroup.url, 
          title: ctaGroup.title, 
        }, 
         cta_type: "contained"}}
      />

      <Container maxWidth="xl">
        <Box sx={{ position: "relative" }} className={`${styles.sliderWrapper}`}>
          <Typography variant="h6" className="mb-16">
            Drag to see added complexity and relative cost
          </Typography>

          {/* Slider */}
          <Slider
            marks={marks}
            min={minValue}
            max={maxValue}
            value={sliderValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            step={100} // adjust step as needed
            sx={{ marginBottom: "2rem" }}
          />

          <Typography variant="body1">
            Current Estimate: ${sliderValue.toLocaleString()}
          </Typography>

          {/* Bubble Container */}
          <Box
            sx={{ position: "relative", height: "300px", marginTop: "1rem" }}
            className={`${styles.bubbleWrapper}`}
          >
            {bubbles.map((bubble, index) => {
              // Show bubble if sliderValue >= bubble.threshold
              if (sliderValue >= bubble.threshold) {
                return (
                  <Bubble
                    key={index}
                    label={bubble.label}
                    x={bubble.x}
                    y={bubble.y}
                    size={bubble.size}
                  />
                );
              }
              return null;
            })}
          </Box>
        </Box>
      </Container>
    </section>
  );
}
