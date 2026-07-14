import RowCard from "@/Components/UI/Card/RowCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@/Components/UI/Card/Card";
import styles from './HomePage.module.scss'
export default function HomePage({ data, techLogos }) {
  // regular cards
  const cards = data[0].acf.usp.cards.map((item, index) => {
    if (item.card_width === "full") {
      return (
        <RowCard
          key={index}
          title={item.title}
          description={item.description}
          image={item.graphic}
          ctaLabel={item.cta.cta_label}
          ctaLink={item.cta.cta_link}
          imgAlignment={item.image_alignment}
        />
      );
    } else if (item.card_width === "half") {
      return (
        <Card
          key={index}
          title={item.title}
          description={item.description}
          image={item.graphic}
          ctaLabel={item.cta.cta_label}
          ctaLink={item.cta.cta_link}
          imgAlignment={item.image_alignment}
        />
      );
    }
  });

  return (
    <>
      <Box component="section" className={`${styles.section}`}>
        <Container component="div" maxWidth="xl" className={`${styles.cardsWrapper}`}>
          {cards}
        </Container>
      </Box>
   
   
    
    </>
  );
}

