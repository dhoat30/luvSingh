"use client";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { lightTheme } from "@/utils/themeSettings";
import { ThemeProvider } from "@mui/material/styles";
import styles from './BlogTableOfContent.module.scss'
export default function BlogTableOfContent({ data }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Paper variant="outlined" className={`${styles.section}`} >
        <Typography variant="h5" component="div" className="title bold">
          Table of Content
        </Typography>
        <ul className={`${styles.parentList}`}>
          {data.map((item, index) => (
            <li key={index} className={`${styles.li}`}>
              <a href={`#${item.id}`} className={`${styles.link} body1`}>{item.text}</a>
              {item.subitems.length > 0 &&
                item.subitems.map((subitem, index) => {
                  return (
                    <ul key={index} className={`${styles.subItems}`}>
                      <li>
                        <a href={`#${subitem.id}`} className="medium">{subitem.text}</a>
                      </li>
                    </ul>
                  );
                })}
            </li>
          ))}
        </ul>
      </Paper>
    </ThemeProvider>
  );
}

