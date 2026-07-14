import Typography from "@mui/material/Typography";
import React from "react";
import styles from './SingleWorkPage.module.scss'
export default function ProjectResults({ data }) {
  return (
    <div className={`${styles.projectResultSection}`}>
      <Typography component="h3" variant="h5" className={`${styles.title} mt-40`} color="white">
        Results
      </Typography>
      <div className={`${styles.resultWrapper} `}>
        {data.decrease_in_bounce_rate && (
          <div className={`${styles.result} mt-32`}>
            <Typography component="div" variant="h2" color="white">
              {data.decrease_in_bounce_rate}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Decrease in Bounce Rate
            </Typography>
          </div>
        )}
        {data.increase_in_conversion_rate && (
          <div className={`${styles.result} mt-32`}>
            <Typography component="div" variant="h2" color="white">
              {data.increase_in_conversion_rate}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Increase in Conversion Rate
            </Typography>
          </div>
        )}
        {data.loading_speed && (
          <div className={`${styles.result} mt-32`}>
            <Typography component="div" variant="h2" color="white">
              {data.loading_speed}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              First Contentful Paint
            </Typography>
          </div>
        )}

        {data.google_page_speed_insight && (
          <div className={`${styles.result} mt-32`}>
            <Typography component="div" variant="h2" color="white">
              {data.google_page_speed_insight}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Google Page Speed Insight
            </Typography>
          </div>
        )}
        {data.user_retention_time && (
          <div className={`${styles.result} mt-32`}>
            <Typography component="div" variant="h2" color="white">
              {data.user_retention_time}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Increase in Session Duration
            </Typography>
          </div>
        )}
          {data.increase_in_organic_traffic && (
          <div className={`${styles.result} mt-32`}>
            <Typography component="div" variant="h2" color="white">
              {data.increase_in_organic_traffic}
            </Typography>
            <Typography component="h6" variant="body1" color="white">
              Increase in Organic Traffic
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
