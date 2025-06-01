"use client";
import { useRouter } from "next/navigation";
import {
  FaTshirt,
  FaShoePrints,
  FaShoppingBag,
  FaRobot,
  FaUserPlus,
  FaLaptop,
} from "react-icons/fa";
import { SlEarphones } from "react-icons/sl";
import { PiPantsFill } from "react-icons/pi";
import { GiSonicShoes } from "react-icons/gi";

const FloatingIcon = ({ Icon, className, style }) => (
  <Icon className={`absolute ${className} pointer-events-none`} style={style} />
);

const iconStyles = [
  { Icon: FaTshirt, top: "10%", left: "8%", size: "3.5rem" },
  { Icon: SlEarphones, top: "30%", left: "65%", size: "3rem" },
  { Icon: PiPantsFill, top: "75%", left: "10%", size: "3.5rem" },
  { Icon: FaRobot, top: "15%", left: "50%", size: "4rem" },
  { Icon: FaLaptop, top: "8%", right: "8%", size: "4rem" },
  { Icon: GiSonicShoes, bottom: "10%", left: "50%", size: "4rem" },
  { Icon: FaShoppingBag, top: "50%", left: "5%", size: "3.5rem" },
  { Icon: FaShoePrints, bottom: "2%", right: "5%", size: "3.5rem" },
];

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#d0e7ff] via-[#8eb7fa] to-[#7a92ba] flex items-center justify-center px-6 sm:px-12 overflow-hidden text-white">
      {/* Floating Icons */}
      <div className="absolute inset-0 z-0">
        {iconStyles.map((icon, idx) => (
          <FloatingIcon
            key={idx}
            Icon={icon.Icon}
            className={`opacity-20 lg:opacity-20 text-blue-500 animate-float${
              idx % 3
            }`}
            style={{
              ...icon,
              fontSize: icon.size,
              animation: `float ${6 + (idx % 3)}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl text-center space-y-8 py-12 px-4">
        <h1 className="lg:text-6xl text-3xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
          Shop Smart. Style Quick. Live Bold.
        </h1>

        <p className="lg:text-lg text-base text-black max-w-2xl mx-auto leading-snug font-semibold">
          <span className="font-bold text-blue-800">Welcome to QuickCart</span>—
          your go-to-place for fast, trendy, and reliable shopping.
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
        .animate-float0 {
          animation-delay: 0s;
        }
        .animate-float1 {
          animation-delay: 1s;
        }
        .animate-float2 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
