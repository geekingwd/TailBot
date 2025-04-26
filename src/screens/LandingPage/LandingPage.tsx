import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-16">
        <div className="relative w-48 h-[78px]">
          <div className="absolute w-[152px] h-[37px] top-10 left-0">
            <img
              className="absolute w-4 h-[34px] top-1 left-[136px]"
              alt="Vector"
              src="/vector.png"
            />
            <img
              className="absolute w-[23px] h-[26px] top-[11px] left-[108px]"
              alt="Vector"
              src="/vector-1.png"
            />
            <img
              className="absolute w-[23px] h-[35px] top-0.5 left-[79px]"
              alt="Vector"
              src="/vector-2.png"
            />
            <img
              className="absolute w-[7px] h-[35px] top-0.5 left-[67px]"
              alt="Vector"
              src="/vector-3.png"
            />
            <img
              className="absolute w-[7px] h-[37px] top-0 left-[55px]"
              alt="Vector"
              src="/vector-4.png"
            />
            <img
              className="absolute w-[23px] h-[26px] top-[11px] left-[26px]"
              alt="Vector"
              src="/vector-5.png"
            />
            <img
              className="absolute w-[21px] h-[35px] top-0.5 left-0"
              alt="Vector"
              src="/vector-6.png"
            />
          </div>

          <div className="absolute w-[153px] h-[38px] top-[39px] left-0">
            <img
              className="absolute w-[17px] h-[35px] top-1 left-[136px]"
              alt="Stroke"
              src="/stroke.png"
            />
            <img
              className="absolute w-6 h-[27px] top-[11px] left-[108px]"
              alt="Stroke"
              src="/stroke-1.png"
            />
            <img
              className="absolute w-2 h-9 top-0.5 left-[67px]"
              alt="Stroke"
              src="/stroke-2.png"
            />
            <img
              className="absolute w-2 h-[38px] top-0 left-[55px]"
              alt="Stroke"
              src="/stroke-3.png"
            />
            <img
              className="absolute w-6 h-[27px] top-[11px] left-[26px]"
              alt="Stroke"
              src="/stroke-4.png"
            />
            <img
              className="absolute w-[22px] h-9 top-0.5 left-0"
              alt="Stroke"
              src="/stroke-5.png"
            />
          </div>

          <img
            className="absolute w-[140px] h-16 top-0 left-[52px] object-cover"
            alt="Tailbot logo"
            src="/tailbot-logo-1.png"
          />
        </div>
      </div>

      {/* Get Started button */}
      <button
        onClick={() => navigate("/chat")}
        className="bg-[#FFB6C1] text-black px-12 py-4 rounded-lg text-2xl font-medium hover:bg-[#FFB6C1]/90 transition-colors"
      >
        Get started
      </button>
    </div>
  );
};