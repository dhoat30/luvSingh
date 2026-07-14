'use client'
import * as React from "react";
import Cookies from "js-cookie";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import styles from './ServiceCTA.module.scss'
 
export default function ServiceCTA({ data, className }) {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordion = data.itemsArr.map((item, index) => {
    return (
      <Accordion
        key={index}
        className="accordion-wrapper"
        expanded={expanded === index}
        onChange={handleChange(index)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* set dangerously  */}
          <Typography
            component="div"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
        </AccordionDetails>
      </Accordion>
    );
  });
  // Function to handle the click event
  const handleBuyNowClick = (slug) => {
    // Retrieve the existing cookie, if it exists
    const cookie = Cookies.get("services");
    let slugs = cookie ? JSON.parse(cookie) : [];

    // Add the new slug if it's not already included
    if (!slugs.includes(slug)) {
      slugs.push(slug);
    }

    // Save the updated array back to the cookie
    Cookies.set("services", JSON.stringify(slugs), { expires: 7 }); // Cookie expires in 7 days  };

    router.push("/checkout");
  };
  return (
    <Paper className={`${className} ${styles.section} `} variant="outlined">
      <div className={`${styles.priceWrapper}`}>
        <Typography className={`${styles.price}`} variant="h4" component="div">
          ${data.price}
        </Typography>
        <Typography className={`${styles.frequency}`} variant="body1" component="div">
          {data.frequency}
        </Typography>
      </div>

      <Button
        className={`${styles.button}`}
        variant="contained"
        size="large"
        color="secondary"
        onClick={() => handleBuyNowClick(data.slug)}
      >
        {data.ctaLabel}
      </Button>
      <div className={`${styles.accordionWrapper}`}>{accordion}</div>
    </Paper>
  );
}
