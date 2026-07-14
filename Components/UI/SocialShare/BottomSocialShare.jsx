import Typography from "@mui/material/Typography";
import Twitter from "../Icons/Twitter";
import FacebookCircleIcon from "../Icons/FacebookCircleIcon";
import Linkedin from "../Icons/Linkedin";
import Messenger from "../Icons/Messenger";
import Whatsapp from "../Icons/Whatsapp";
import EmailIcon from "../Icons/EmailIcon";
import styles from './BottomSocialShare.module.scss'
export default function BottomSocialShare({
  className,
  title,
  url,
  description,
}) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`;
  const messengerUrl = `fb-messenger://share?link=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;
  const mailUrl = `mailto:?subject=${encodedTitle}&body=Check out this link: ${encodedUrl} - ${encodedDescription}`;

  return (
    <div className={`${className} ${styles.section}  mt-32`}>
      <Typography
        variant="h5"
        component="div"
        color="var(--white)"
        className="title semi-bold"
      >
        Don&apos;t forget to share this post!
      </Typography>
      <div className={`${styles.shareWrapper} mt-16 flex gap-16`}>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <FacebookCircleIcon />
        </a>
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </a>
        <a href={messengerUrl} target="_blank" rel="noopener noreferrer">
          <Messenger />
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Whatsapp />
        </a>
        <a
          className="email"
          href={mailUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <EmailIcon />
        </a>
      </div>
    </div>
  );
}

