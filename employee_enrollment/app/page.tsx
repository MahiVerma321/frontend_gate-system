import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import WorkflowSection from "@/components/WorkflowSection";
import DashboardShowcase from "@/components/DashboardShowcase";
import Footer from "@/components/Footer";
import Support from "@/components/Support";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WorkflowSection/>
      <DashboardShowcase />
      <Support />
      <Footer />
    </>
  );
}
