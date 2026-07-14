import Header from "@/Components/UI/Header/Header";
import SampleCutPage from "@/Components/Pages/SampleCutPage/SampleCutPage";
import Footer from "@/Components/UI/Footer/Footer";
import { getOptions } from "@/utils/fetchData";

export const metadata = {
  title: "Get a Free Sample Cut | Luv Singh",
  description:
    "Share your video brief and raw footage with Luv Singh to request a free sample edit.",
};

export default async function GetASampleCutPage() {
  const options = await getOptions();

  return (
    <>
      <Header />
      <main>
        <SampleCutPage />
      </main>
      <Footer
        showFooterCta={false}
        contactInfo={options.contact_info}
        socialData={options.social_links}
        certifications={options.certifications}
      />
    </>
  );
}
