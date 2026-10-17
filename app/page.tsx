import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Preview from "@/components/Preview";
import ImagesSection from "@/components/ImageSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Preview />
      <ImagesSection />
      <Footer />
    </>
  );
}