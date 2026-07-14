import RowSection from "./Sections/RowSection/RowSection";
import ServicesSection from "./Sections/ServicesSection/ServicesSection";
import ServicesListSection from "./Sections/ServicesListSection/ServicesListSection";
import VideoWorkSection from "./Sections/VideoWorkSection/VideoWorkSection";
import FaqAccordionSection from "./Sections/FaqAccordionSection/FaqAccordionSection";
import FormSection from "./Sections/FormSection/FormSection";
import FormHeroSection from "./Sections/FormHeroSection/FormHeroSection";
import RegularProcess from "./Sections/Process/RegularProcess";
import USP from "../USP/USP";
import Stats from "../Stats/Stats";
import LocationsCovered from "../LocationsCovered/LocationsCovered";
import HoursCalculator from "./Sections/HoursCalculator/HoursCalculator";
import ContactSection from "./Sections/ContactSection/ContactSection";
import SpaceCalculator from "./Sections/SpaceCalculator/SpaceCalculator";
import FooterCta from "../CTA/FooterCta";
import GoogleReviewsCarousel from "../GoogleReviews/GoogleReviewsCarousel";
import UspTable from "./Sections/UspTable/UspTable";
import VerticalTabs from "./Sections/VerticalTabs/VerticalTabs";
import CardsSection from "./Sections/CardsSection/CardsSection";
import TabsSection from "./Sections/TabsSection/TabsSection";
import HeroSectionColumns from "./Sections/HeroSection/HeroSectionColumns";
import HeroSectionRows from "./Sections/HeroSection/HeroSectionRows";

import RowCardTabs from "./Sections/RowCardTabs/RowCardTabs";
import PriceSliderSection from "./Sections/PriceSliderSection/PriceSliderSection";
import EmpathySection from "./Sections/EmpathySection/EmpathySection";
import SolutionSection from "./Sections/SolutionSection/SolutionSection";
import TestimonialSection from "./Sections/TestimonialSection/TestimonialSection";
import ServicePackagesSection from "./Sections/ServicePackagesSection/ServicePackagesSection";
export default function Layout({
  uspTable,
  sections,
  uspData,
  statsData,
  locationsCovered,
  hoursCalculatorData,
  spaceCalculatorData,
  contactInfo,
  socialData,
  servicesData,
  googleReviewsData,
  reviewerPics,
  routeId,
  adsPackagesData
}) {
  if (!sections) return null;
  const sectionsJSX = sections.map((section, index) => {
  
    if (section.acf_fc_layout === "tabs_section") {
      return (
        <TabsSection
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "row_section_tabs") {
      return (
        <RowCardTabs
          key={index}
          title={section.title}
          description={section.description}
          image={section.image}
          rows={true}
          tabsData={section.tabs}
        />
      );
    }
    if (
      section.acf_fc_layout === "row" ||
      section.acf_fc_layout === "row_layout"
    ) {
      let remappedAccordion;
      if (section.accordion) {
        remappedAccordion = section?.accordion?.map(({ title, value }) => ({
          question: title,
          answer: value,
        }));
      }
      return (
        <RowSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          accordionData={remappedAccordion}
          showBeforeAfterImages={section.show_before_after_images}
          backgroundColor={section.background_color}
          fontColor={section.font_color}
          beforeImage={
            section.show_before_after_images &&
            section.before_after_images.before_image
          }
          afterImage={
            section.show_before_after_images &&
            section.before_after_images.after_image
          }
        />
      );
    }
    if (section.acf_fc_layout === "services") {
      if (section.list?.length) {
        return (
          <ServicesListSection
            key={index}
            title={section.Title || section.title}
            description={section.description}
            services={section.list}
          />
        );
      }

      return (
        <ServicesSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "video_work") {
      const prepareVideos = (videos = []) =>
        videos.map((video) => ({
          youtube_id: video.youtube_id,
          label: video.label,
          thumbnail: {
            url: video.thumbnail?.url,
            alt: video.thumbnail?.alt,
            sizes: {
              large: video.thumbnail?.sizes?.large,
            },
          },
        }));

      return (
        <VideoWorkSection
          key={index}
          title={section.title || "Work That Converts"}
          description={
            section.description ||
            "Performance edits, explainers, promos, and social-first videos built to earn the next second and drive the next action."
          }
          landscapeVideos={prepareVideos(section.landscape_videos)}
          verticalVideos={prepareVideos(section.vertical_videos)}
        />
      );
    }
    if (section.acf_fc_layout === "cards_section") {
      return (
        <CardsSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "process") {
      return (
        <RegularProcess
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
          image={section.image}
        />
      );
    }

    // if (section.acf_fc_layout === "tabs_section") {
    //   return    <GradientTabs   key={index}
    //   title={section.section_title}
    //   description={section.section_description}
    //   cards={section.tabs}/>
    // }

    // if (section.acf_fc_layout === "packages") {
    //   return (
    //     <Packages
    //       key={index}
    //       serviceName={section.service_name}
    //       title={section.title}
    //       packagesArray={section.package}
    //       termsAndConditions={section.terms_conditions}
    //     />
    //   );
    // }
    if (section.acf_fc_layout === "local_faq") {
      return (
        <FaqAccordionSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          qaData={section.items}
        />
      );
    }

    if (section.acf_fc_layout === "form_section") {
      return (
        <FormSection
          key={index}
          title={section.title}
          description={section.description}
          usp={{ text_usp: section.text_usp, image_usp: section.image_usp }}
          graphic={section.graphic}
        />
      );
    }

    if (section.acf_fc_layout === "form_hero_section") {
      let graphicData;
      if (section.graphic_type === "new_graphic_type") {
        graphicData = section.new_graphic_type;
      }
      if (section.graphic_type === "image") {
        graphicData = section.image;
      }
      if (section.graphic_type === "youtube_video") {
        graphicData = section.youtube_video_group;
      }
      return (
        <FormHeroSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cta={section.cta}
          graphicType={section.graphic_type}
          graphicData={graphicData}
          uspData={section.usp}
          reviewTitle={section.review_title}
          reviewerPics={reviewerPics}
        />
      );
    }

    if (section.acf_fc_layout === "hero_section") {
      let graphicData;
      if (section.graphic_type === "new_graphic_type") {
        graphicData = section.new_graphic_type;
      }
      if (section.graphic_type === "image") {
        graphicData = section.image;
      }
      if (section.graphic_type === "youtube_video") {
        graphicData = section.youtube_video_group;
      }

      if (section.layout === "columns") {
        return (
          <HeroSectionColumns
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            ctaArr={section.cta_array}
            graphicType={section.graphic_type}
            graphicData={graphicData}
            uspData={section.usp}
            reviewTitle={section.review_title}
            reviewerPics={reviewerPics}
          />
        );
      }
      if (section.layout === "rows") {
        return (
          <HeroSectionRows
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            ctaArr={section.cta_array}
            graphicType={section.graphic_type}
            graphicData={graphicData}
            uspData={section.usp}
            reviewTitle={section.review_title}
            reviewerPics={reviewerPics}
            ctaMicroCopy={section.cta_microcopy}
          />
        );
      }
    }

    if (section.acf_fc_layout === "show_usp" && section.show_usp) {
      return (
        <VerticalTabs
          key={index}
          title={uspData.section_title}
          description={uspData.section_description}
          cards={uspData.items}
          showTitle={true}
        />
      );
    }
    if ( section.acf_fc_layout === "stats_section") {
      return <Stats key={index} statsData={section.stats} />;
    }
    if (section.acf_fc_layout === "show_locations" && section.show_locations) {
      return (
        <LocationsCovered
          key={index}
          title={locationsCovered.title}
          description={locationsCovered.description}
          locations={locationsCovered.locations}
          image={locationsCovered.image}
        />
      );
    }

    if (
      section.acf_fc_layout === "show_hours_calculator" &&
      section.show_hours_calculator
    ) {
      if (!hoursCalculatorData) return null;
      return (
        <HoursCalculator
          key={index}
          title={hoursCalculatorData.title}
          description={hoursCalculatorData.description}
          calculatedValueLabel={hoursCalculatorData.calculated_value_label}
          furnishedLevelData={hoursCalculatorData.furnished_level}
          price={section.price}
        />
      );
    }
    if (
      section.acf_fc_layout === "show_space_calculator" &&
      section.show_space_calculator
    ) {
      if (!spaceCalculatorData) return null;
      return (
        <SpaceCalculator
          key={index}
          title={spaceCalculatorData.title}
          description={spaceCalculatorData.description}
          calculatedValueLabel={spaceCalculatorData.calculated_value_label}
          furnishedLevelData={spaceCalculatorData.furnished_level}
          price={section.price}
        />
      );
    }
    if (section.acf_fc_layout === "show_services" && section.show_services) {
      if (servicesData === undefined) return null;
      return (
        <ServicesSection
          key={index}
          title={servicesData.title}
          subtitle={servicesData.subtitle}
          description={servicesData.description}
          cards={servicesData.cards}
        />
      );
    }
    if (section.acf_fc_layout === "contact") {
      return (
        <ContactSection
          key={index}
          title={section.title}
          description={section.description}
          map={section.map}
          uspData={section.usp}
          contactInfo={contactInfo}
          socialData={socialData}
        ></ContactSection>
      );
    }
    if (section.acf_fc_layout === "cta_section") {
      return (
        <FooterCta
          key={index}
          title={section.title}
          description={section.description}
          ctaArray={section.cta}
          image={section.image}
          lightBackground={section.light_background}
        />
      );
    }
    if (
      section.acf_fc_layout === "show_reviews" &&
      section.show_reviews &&
      googleReviewsData
    ) {
      return <GoogleReviewsCarousel key={index} data={googleReviewsData} />;
    }

    if (section.acf_fc_layout === "show_usp_table") {
      return <UspTable key={index} uspTableData={uspTable} />;
    }

    if (section.acf_fc_layout === "slider_section") {

      return (
        <PriceSliderSection
          key={index}
          title={section.title}
          description={section.description}
          ctaGroup={section.cta}
          imageAlignment={section.image_alignment}
          image={section.image}
        />
      );
    }

       if (section.acf_fc_layout === "empathy_section") {

      return (
     <EmpathySection key={index} 
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          items={section.items}
     /> 
      );
    }

       if (section.acf_fc_layout === "solution_section") {

      return (

     <SolutionSection key={index} 
     subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          items={section.items}
     /> 
      );
    }
    
       if (section.acf_fc_layout === "testimonials") {

      return (

     <TestimonialSection key={index} 
     subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          statsArray={section.stats}
                    testimonialsArray={section.testimonials}
                    clientLogosArray={section.client_logos}


     /> 

     
      );
    }
     if (section.acf_fc_layout === "show_ads_package" && section.show) {
      if(!adsPackagesData) return 
      return (

     <ServicePackagesSection key={index} 
    
          title={adsPackagesData.title}
          description={adsPackagesData.description}
          packages={adsPackagesData.packages}


     /> 

     
      );
    }
  });

  return <section>{sectionsJSX} </section>;
}
