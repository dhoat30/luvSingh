import ServicePackageCard from "@/Components/UI/Card/ServicePackageCard";
import CenterAlignHeroTop from "@/Components/UI/Hero/CenterAlignHeroTop";
import Container from "@mui/material/Container";

export default function ServicePackagePage({ pageData, servicesPackagesData }) {
  const heroData = {
    desktopImage: pageData.acf.hero_section.graphic.desktop,
    mobileImage: pageData.acf.hero_section.graphic.mobile,
    title: pageData.acf.hero_section.title,
  };

  const servicePackages = servicesPackagesData?.map((item, index) => {
    return (
      <ServicePackageCard
        className="card"
        key={index}
        title={item.acf.hero_section.title}
        description={item.acf.hero_section.description}
        price={item.acf.cta_section.service_price}
        ctaLabel={"Learn more"}
        ctaLink={`/service-packages/${item.slug}`}
        image={item.acf.hero_section.image}
      />
    );
  });

  return (
    <>
      <CenterAlignHeroTop data={heroData} />
      <section className="pt-80 pb-80">
        <Container className="cards-wrapper grid gap-32 " maxWidth="xl" >
          {servicePackages}
        </Container>
      </section>
    </>
  );
}

