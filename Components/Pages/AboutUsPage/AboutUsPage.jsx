import CenterAlignHero from "@/Components/UI/Hero/CenterAlignHero";
import React from "react";
import FooterCta from "@/Components/UI/CTA/FooterCta";
// import SecondAboutUsSection from "./SecondAboutUsSection";
import TeamSection from "./TeamSection";
import Video from "@/Components/UI/Video/Video";
import Container from "@mui/material/Container";
export default function AboutUsPage({ pageData, techLogos }) {
  const heroData = {
    subtitle: pageData.acf.hero_section.subtitle,
    title: pageData.acf.hero_section.title,
    description: pageData.acf.hero_section.description,
    desktopImage: pageData.acf.hero_section.graphic.desktop,
    mobileImage: pageData.acf.hero_section.graphic.mobile,
    ctaLabel: pageData.acf.hero_section.cta.label,
    ctaLink: pageData.acf.hero_section.cta.url,
  };

  // second section data
  const secondSectionData = {
    content: pageData.acf.first_section.history,
    image: pageData.acf.first_section.image,
    statsArr: pageData.acf.first_section.stats,
  };

  const teamData = {
    title: pageData.acf.team_section.title,
    description: pageData.acf.team_section.description,
    subtitle: pageData.acf.team_section.subtitle,
    teamMembersArr: pageData.acf.team_section.team_info,
  };

  return (
    <>
      <CenterAlignHero data={heroData} />
      <Container maxWidth="lg" className="mt-40 mb-40">
        <Video
          placeholderImage={pageData.acf.video_section[0].placeholder_image}
          videoID={pageData.acf.video_section[0].video_id}
        />
      </Container>

      {/* <SecondAboutUsSection data={secondSectionData} /> */}

      <TeamSection data={teamData} />
      <FooterCta />
    </>
  );
}
