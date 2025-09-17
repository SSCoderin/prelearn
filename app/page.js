"use client";
import { useEffect, useState } from "react";
import Logo from "./images/logo.svg";
import Image from "next/image";
import DashHeader from "./dashboard/_component/DashHeader";
import Analytic from "./images/analytics-dashboard.webp";
import Eyetracking from "./images/eye-tracking-demo.jpg";
import { Button } from "../components/ui/button";

import LearningPath from "./images/learning-path.jpg";
import {
  ArrowRight,
  Eye,
  Brain,
  Zap,
  Target,
  BookOpen,
  Glasses,
  ChartBar,
} from "lucide-react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animElements = document.querySelectorAll(".animate-item");
    animElements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      animElements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="home"
      className="min-h-screen bg-gradient-to-br from-blue-100 to-white overflow-hidden"
    >
      <DashHeader />

      <section className="relative py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
          <div className="absolute w-96 h-96 rounded-full bg-yellow-400 blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-blue-400 blur-3xl -bottom-20 -right-20"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div
              className="md:w-1/2 animate-item"
              style={{ "--delay": "0.1s" }}
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent pb-4 mb-4">
                PreLearn
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
                Revolutionizing Learning with AI-Powered Eye Tracking to Detect
                Confusion
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Provide Real-Time Assistance, and Personalize Education Like
                Never Before.
              </p>
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="m-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-lg text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-blue-300 hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-800 transform relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:transform before:-skew-x-12 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
              >
                Get Started <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </Button>
              <Button
                onClick={() => (window.location.href = "/demo")}
                className="m-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-lg text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-blue-300 hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-800 transform relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:transform before:-skew-x-12 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
              >
                Demo Trial <ArrowRight className="ml-2 transition-transform hover:rotate-45" size={20} />
              </Button>            </div>
            <div
              className="md:w-1/2 flex justify-center animate-item"
              style={{ "--delay": "0.3s" }}
            >
              <div className="relative w-64 h-64 bg-gradient-to-br from-yellow-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl p-2 hover:scale-110 transition-transform duration-500">
                <div className="bg-white rounded-full p-4 w-56 h-56 flex items-center justify-center">
                  <Image
                    src={Logo}
                    alt="EyeGaze Assist Logo"
                    width={150}
                    height={150}
                    className="animate-pulse"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          transition-delay: var(--delay, 0s);
        }

        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
