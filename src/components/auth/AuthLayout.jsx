import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";

const defaultCarousel = [
  "https://admin.fin-face.com/loginImg1.svg",
  "https://admin.fin-face.com/loginImg2.svg",
  "https://admin.fin-face.com/loginImg3.svg"
];

export const AuthLayout = ({ children }) => {
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
        <div 
          className="hidden md:flex md:w-1/2 lg:w-[50%] relative flex-col items-center justify-center overflow-hidden text-white box-border p-[10px]"
          style={{ 
            backgroundImage: `url('https://admin.fin-face.com/bgSlider.svg'), linear-gradient(180deg, #4a4a4a, #2d2d2d)`,
            backgroundSize: 'cover, auto',
            backgroundPosition: 'center center, center',
            backgroundRepeat: 'no-repeat, no-repeat',
            height: '100vh'
          }}
        >
          {/* Content Group matching exact DOM structure */}
          <div className="relative z-20 w-full max-w-[681px] px-8 flex justify-center min-h-[460px]">
            {defaultCarousel.map((img, idx) => (
              <div
                key={idx}
                className={`absolute top-0 w-full flex flex-col items-center transition-opacity duration-1000 ease-in-out carousel-caption ${
                  idx === currentIdx ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="imageSec w-full flex justify-center mb-6">
                  <img
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className="w-full max-w-[441px] h-[300px] object-contain"
                  />
                </div>
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight mb-4 text-white headMain font-['Open_Sans',sans-serif]">
                  Accounting Excellence Guaranteed
                </h1>
                <p className="text-[14px] font-normal leading-[24px] text-gray-200/90 max-w-[560px] text-center font-['Open_Sans',sans-serif]">
                  Our CA services ensure meticulous finance management, compliance, and growth strategies, empowering your business success
                </p>
              </div>
            ))}
          </div>

          {/* Dash Indicators */}
          <div className="absolute bottom-12 flex space-x-[10px] z-20 items-center justify-center">
            {defaultCarousel.map((_, idx) => (
              <div
                key={idx}
                className={`h-[3px] w-[24px] rounded-full transition-all duration-500 ${
                  idx === currentIdx ? "bg-[#e53935]" : "bg-white/40"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Form Content (Full width on mobile, 50% on tablet, 50% on laptop/desktop) */}
        <div className="w-full md:w-1/2 lg:w-[50%] grid grid-rows-[120px_1fr_100px] px-6 sm:px-12 lg:px-20 bg-[#fafafa] min-h-screen">
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
