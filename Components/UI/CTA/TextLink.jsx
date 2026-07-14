import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from './TextLink.module.scss'
export default function TextLink({ label, url, color, className, size }) {

  return (
    <div
  
    >
      <Link
        href={url}
        className={`${className} ${styles.section}`}
        underlinecolor={color ? color : "white"}

      >
        <Typography
          component={"div"}
          variant={size === "sm" ? "body1" : "h6"}
          className={`${styles.label}`}
          color={color ? color : "white"}
        >
          {label}
          <span
            className="underline"
            style={{ backgroundColor: color ? color : "white" }}
       
            // Initial width is 0 to hide the underline
          ></span>
        </Typography>
       
          <svg
            width={size === "sm" ? "20" : "25"}
            viewBox="0 0 93 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg}
          >
            <path
              d="M59 4L88 33L59 62"
              stroke={color ? color : "white"}
              strokeWidth="7"
              strokeLinecap="round"
              initial="hidden"
              animate="visible"
            />

            <path
              initial="hidden"
              animate="visible"
              d="M4 33H87"
              stroke={color ? color : "white"}
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
      
      </Link>
    </div>
  );
}

