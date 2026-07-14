import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import styles from './SingleWorkPage.module.scss'
export default function ProjectTitleSection({ title, services }) {
  return (
    <Container className={`${styles.projectTitleSection}`} maxWidth="xl" >
      <Typography component="h1" variant="h2" color="white" className="title">
        {title}
      </Typography>
      <Box className="services-wrapper mt-24" >
        {services?.map((item, index) => (
          //   <Typography
          //     key={index}
          //     component="span"
          //     variant="body1"
          //     color="secondary.main"
          //     className="service"
          //   >
          //     {item.label}
          //   </Typography>
          <Chip
            key={index}
            label={`${item.label}`}
            sx={{ margin: "0 8px 8px 0" }}
            variant="outlined"
            color="primary"
          />
        ))}
      </Box>
    </Container>
  );
}


