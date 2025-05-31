"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaTshirt,
  FaMobileAlt,
  FaShoePrints,
  FaShoppingBag,
  FaRobot,
  FaUserPlus,
} from "react-icons/fa";
import { SlEarphones } from "react-icons/sl";
import { PiPantsFill } from "react-icons/pi";
import { GiSonicShoes } from "react-icons/gi";
import { FaShopify } from "react-icons/fa6";
import { FaLaptop } from "react-icons/fa";

const FloatingIcon1 = ({ Icon, style }) => (
  <Icon
    className="absolute opacity-30 text-blue-400 pointer-events-none"
    style={style}
  />
);
const FloatingIcon2 = ({ Icon, style }) => (
  <Icon
    className="absolute opacity-20 text-blue-800 pointer-events-none"
    style={style}
  />
);

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/" &&
      localStorage.getItem("token")
    ) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#d0e7ff] via-[#8eb7fa] to-[#7a92ba]  flex items-center justify-center px-6 sm:px-12 overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <FloatingIcon1
          Icon={FaTshirt}
          style={{
            top: "12%",
            left: "10%",
            fontSize: "4rem",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <FloatingIcon2
          Icon={SlEarphones}
          style={{
            top: "40%",
            left: "65%",
            fontSize: "3rem",
            animation: "float 6s ease-in-out infinite",
          }}
        />{" "}
        <FloatingIcon1
          Icon={PiPantsFill}
          style={{
            top: "80%",
            left: "15%",
            fontSize: "4rem",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <FloatingIcon2
          Icon={FaRobot}
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "4.5rem",
            animation: "float 7s ease-in-out infinite",
            animationDelay: "0.5s",
          }}
        />
        <FloatingIcon2
          Icon={FaLaptop}
          style={{
            top: "12%",
            right: "10%",
            fontSize: "5rem",
            animation: "float 8s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
        <FloatingIcon2
          Icon={FaShoppingBag}
          style={{
            top: "50%",
            right: "10%",
            fontSize: "4rem",
            animation: "float 7s ease-in-out infinite",
            animationDelay: "1.8s",
            transform: "translateY(-50%)",
          }}
        />
        <FloatingIcon1
          Icon={FaShopify}
          style={{
            bottom: "25%",
            left: "25%",
            fontSize: "4rem",
            animation: "float 6s ease-in-out infinite",
            animationDelay: "2.2s",
          }}
        />
        <FloatingIcon2
          Icon={GiSonicShoes}
          style={{
            bottom: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "4.5rem",
            animation: "float 8s ease-in-out infinite",
            animationDelay: "2.5s",
          }}
        />
        <FloatingIcon1
          Icon={FaMobileAlt}
          style={{
            top: "50%",
            left: "10%",
            fontSize: "4rem",
            animation: "float 9s ease-in-out infinite",
            animationDelay: "2.8s",
          }}
        />
        <FloatingIcon2
          Icon={FaShoePrints}
          style={{
            bottom: "1%",
            right: "5%",
            fontSize: "4rem",
            animation: "float 9s ease-in-out infinite",
            animationDelay: "2.8s",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl text-center space-y-8 py-12 px-4">
        <h1
          className="lg:text-6xl text-3xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text"
          style={{
            background: "linear-gradient(to bottom, #1e3a8a, #1d4ed8, #3b82f8)",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Shop Smart. Style Quick. Live Bold.
        </h1>

        <p className="lg:text-lg text-base text-black max-w-2xl mx-auto leading-snug font-semibold">
          <span className="font-bold text-blue-800">Welcome to QuickCart</span>{" "}
          — your go-to-place for fast, trendy, and reliable shopping.
        </p>

        <button
          onClick={() => router.push("/products")}
          className="inline-flex items-center gap-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-transform transform hover:scale-105 active:scale-100"
        >
          <FaUserPlus className="text-2xl" />
          Start Shopping
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
