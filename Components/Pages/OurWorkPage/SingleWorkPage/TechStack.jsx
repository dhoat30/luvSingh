import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from './SingleWorkPage.module.scss'
export default function TechStack({ dataArr, techLogos }) {
  // merge two arrays
  //use title in tech logos and use value in dataArr
  const combinedArray = dataArr.map((item1) => {
    const item2 = techLogos.find((item2) => item2.title === item1.value);
    return {
      ...item1,
      ...item2,
    };
  });
  const logos = combinedArray.map((data, index) => {
    if(data.url === null) return null
    return (
      <div
        className="image-wrapper"
        key={index}
        // style={{
        //   paddingBottom: `calc(${(data.height / data.width) * 100}% - 120px`,
        // }}
      >
        <Image src={data.url} alt={data.alt} width="140" height="50" />
      </div>
    );
  });
  return (
    <div className={`${styles.techStack}`}>
      <Typography component="h3" variant="h5" className={`${styles.title} mt-80`} color="white">
        Crafted with these tools
      </Typography>
      <div className={`${styles.techLogoWrapper}`}>{logos}</div>
    </div>
  );
}
