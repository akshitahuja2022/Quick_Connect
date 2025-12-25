import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import ChatPage from "./ChatPage";
import Feature from "../components/Feature";
import FeatureHighlight from "../components/FeatureHighlight";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeatureHighlight />
      <Feature />
      <Footer/>
    </div>
  );
};

export default Home;
