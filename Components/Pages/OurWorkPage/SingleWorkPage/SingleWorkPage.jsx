import JustImageHero from "@/Components/UI/Hero/JustImageHero";
import React from "react";
import ProjectTitleSection from "./ProjectTitleSection";
import Container from "@mui/material/Container";
import ProjectResults from "./ProjectResults";
import SiteLink from "./SiteLink";
import BeforeAfter from "./BeforeAfter";
import SingleProjectContentSections from "./SingleProjectContentSections";
import TechStack from "./TechStack";
// import SubNav from "@/Components/UI/Header/SubNav/SubNav";
import styles from './SingleWorkPage.module.scss'

export default function SingleWorkPage({ data, techLogos }) {
  if(!data) return null
  const heroData = {
    desktopImage: data?.acf.hero_section.graphic.desktop,
  };
  const projectTitleSectionData = {
    title: data?.acf?.hero_section.title,
    services: data?.acf.services_offered,
  };
  const siteLinkData = {
    label: data?.acf.website_information.website_name,
    link: data?.acf.website_information.link,
  };
  const beforeAfterData = {
    beforeImage: data?.acf.before_after_image.before_image,
    afterImage: data?.acf.before_after_image.after_image,
  };

  // before after gallery 
  // const beforeAfterGallery = data
  const singleProjectContentSectionsDataArr = data.acf.content_layout;
  const resultsDataArr = data.acf.results;
  const techStackDataArr = data.acf.tech_stack;
  // Check if content_layout is defined and is an array before filtering
  const subNavDataArr =
    data?.acf?.content_layout && Array.isArray(data.acf.content_layout)
      ? data.acf.content_layout.filter((item) =>
          !item.acf_fc_layout.includes("intro")
        )
      : [];
    
    const galleryBeforeAfter = data.acf?.before_after_gallery && data.acf.before_after_gallery.map((item, index) => {
      return  <BeforeAfter showTitle={false} key={index} beforeImage={item.before_image} afterImage={item.after_image} />
    }); 
  return (
    <>
      {/* <SubNav dataArr={subNavDataArr} /> */}
      <JustImageHero desktopImage={heroData.desktopImage} />
      <ProjectTitleSection
        title={projectTitleSectionData.title}
        services={projectTitleSectionData.services}
      />
      <Container className={`${styles.singleWorkPage} grid gap-40`} maxWidth="xl">
        <div className={`${styles.contentWrapper} `}>
          <SiteLink data={siteLinkData} />
          <BeforeAfter beforeImage={beforeAfterData.beforeImage} afterImage={beforeAfterData.afterImage} />
         <div className={`${styles.beforeAfterGallery} gap-16 mt-16 `}> 
          {galleryBeforeAfter}
         </div>
          <SingleProjectContentSections
            dataArr={singleProjectContentSectionsDataArr}
          />
        </div>
        <div className={`${styles.resultsWrapper}`} id="results">
          <ProjectResults data={resultsDataArr} />
          <TechStack dataArr={techStackDataArr} techLogos={techLogos} />
        </div>
      </Container>
    </>
  );
}
