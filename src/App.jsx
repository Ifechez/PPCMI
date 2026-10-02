import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FlightOverlay from "./components/FlightOverlay.jsx";
import ScrollToTopDove from "./components/ScrollToTopDove.jsx";
import PageFade from "./components/PageFade.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import { SiteProvider } from "./context/SiteContext.jsx";

import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Programs from "./pages/Programs.jsx";
import Testimonies from "./pages/Testimonies.jsx";
import Support from "./pages/Support.jsx";
import Gallery from "./pages/Gallery.jsx";
import Devotions from "./pages/Devotions.jsx";
import Prayer from "./pages/Prayer.jsx";
import Events from "./pages/Events.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About/About.jsx";
import Branches from "./pages/About/Branches.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminApp from "./admin/AdminApp.jsx";

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  if (isAdmin) return <Routes><Route path="/admin/*" element={<AdminApp />} /></Routes>;

  const P = (el) => <PageFade>{el}</PageFade>;
  return (
    <SiteProvider>
      <Navbar />
      <FlightOverlay />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={P(<Home />)} />
          <Route path="/blogs" element={P(<Blogs />)} />
          <Route path="/blogs/:slug" element={P(<BlogPost />)} />
          <Route path="/programs" element={P(<Programs />)} />
          <Route path="/gallery" element={P(<Gallery />)} />
          <Route path="/devotions" element={P(<Devotions />)} />
          <Route path="/prayer" element={P(<Prayer />)} />
          <Route path="/testimonies" element={P(<Testimonies />)} />
          <Route path="/support" element={P(<Support />)} />
          <Route path="/donation" element={<Navigate to="/support" replace />} />
          <Route path="/give" element={<Navigate to="/support" replace />} />
          <Route path="/events" element={P(<Events />)} />
          <Route path="/contact" element={P(<Contact />)} />
          <Route path="/about" element={P(<About />)} />
          <Route path="/about/branches" element={P(<Branches />)} />
          <Route path="*" element={P(<NotFound />)} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ScrollToTopDove />
      <WhatsAppFloat />
      <ChatWidget />
    </SiteProvider>
  );
}
