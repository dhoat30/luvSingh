import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import styles from './SingleWorkPage.module.scss'

export default function SiteLink({ data }) {
  if (data.link === "") return null;
  return (
    <section className={`${styles.sitelink} flex gap-8 align-center` }>
      <Typography
        component="h5"
        variant="subtitle1"
        className="title"
        color="white"
      >
        Website Link:
      </Typography>
      <Link href={data.link} className={`${styles.link}` } target="_blank" rel="nofollow">
        <Typography
          component="h5"
          variant="subtitle1"
          className="title"
          color="primary"
        >
          {data.label}
          <ArrowOutwardIcon sx={{ marginLeft: "4px" }} />
        </Typography>
      </Link>
    </section>
  );
}

