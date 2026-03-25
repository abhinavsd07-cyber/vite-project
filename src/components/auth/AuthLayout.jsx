import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import img1 from "../../assets/image1.jpg";
import img2 from "../../assets/image2.jpg";
import img3 from "../../assets/image3.jpg";
import { Logo } from "./Logo";

const defaultCarousel = [img1, img2, img3];

export function AuthLayout({ children }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % defaultCarousel.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-800">
      <div className="w-full flex flex-col md:flex-row min-h-screen">
        {/* LEFT SIDE: Carousel (Hidden on Mobile, flex on MD+) */}
        <div className="hidden md:flex md:w-1/2 relative flex-col overflow-hidden bg-gradient-to-b from-[#97B7D0] to-[#96B6CF]">
          {/* Images */}
          {defaultCarousel.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                idx === currentIdx ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
            >
              <img
                src={img}
                alt="Background Render"
                className="w-full h-full object-cover object-center rotate-180"
              />
            </div>
          ))}

          {/* Removed Figma Blend Overlay to match clean design */}

          {/* Text Content */}
          <div className="relative z-20 flex flex-col justify-end h-full px-12 lg:px-20 pb-16">
            <h1 className="text-[28px] lg:text-[34px] leading-tight tracking-tight mb-4 flex items-center gap-x-2 whitespace-nowrap">
              <span className="font-semibold text-slate-800">Accounting</span>
              <span className="font-semibold text-white">
                Excellence Guaranteed
              </span>
            </h1>

            <p className="text-[14px] text-slate-700/80 max-w-[420px] leading-relaxed mb-10">
              Our CA services ensure meticulous finance management, compliance,
              and growth strategies, empowering your business success
            </p>

            {/* Dash Indicators */}
            <div className="flex gap-2 items-center">
              {defaultCarousel.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-[2px] w-6 transition-all duration-500 ${
                    idx === currentIdx ? "bg-red-500" : "bg-white"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form Content (Full width on mobile, 50% on desktop) */}
        <div className="w-full md:w-1/2 grid grid-rows-[120px_1fr_100px] px-6 sm:px-12 lg:px-20 bg-white min-h-screen">
          {/* Logo Area */}
          <div className="flex items-end justify-center pb-4">
            <Logo />
          </div>

          {/* Centered form area */}
          <div className="flex flex-col justify-center items-center w-full max-w-[400px] mx-auto">
            <div className="w-full">{children}</div>
          </div>

          {/* Footer Socials & Links */}
          <div className="flex flex-col justify-end pb-10">
            <div className="flex justify-center gap-6 sm:gap-8 text-[12px] text-slate-400 mb-6 font-medium">
              <a href="#" className="hover:text-slate-900 transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Blog
              </a>
            </div>

            <div className="flex justify-center gap-6 text-slate-400 items-center">
              <a href="#" className="hover:text-slate-600 transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="hover:text-slate-600 transition-colors">
                <RiTwitterXLine size={16} />
              </a>
              <a href="#" className="hover:text-slate-600 transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="hover:text-slate-600 transition-colors">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
