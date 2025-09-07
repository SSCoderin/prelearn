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

      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-yellow-50"
      >
        <div className="max-w-full mx-auto">
          <div className="animate-item" style={{ "--delay": "0.1s" }}>
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
              About PreLearn
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-12"></div>
          </div>

          <div className="space-y-16">
            <div
              className="flex flex-col md:flex-row items-center gap-8 animate-item"
              style={{ "--delay": "0.2s" }}
            >
              <div className="md:flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-100">
                <div className="h-24 w-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Eye className="text-white" size={48} />
                </div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  Advanced Eye-Tracking Intelligence
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our cutting-edge AI-powered eye-tracking system revolutionizes
                  learning by monitoring micro-expressions, pupil dilation, and
                  gaze patterns in real-time. This sophisticated technology can
                  detect even subtle signs of confusion or engagement, ensuring
                  no learning moment goes unnoticed.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={Eyetracking}
                  alt="Eye Tracking Demo"
                  width={500}
                  height={300}
                  className="rounded-3xl shadow-xl"
                />
              </div>
            </div>

            <div
              className="flex flex-col md:flex-row items-center gap-8 animate-item"
              style={{ "--delay": "0.3s" }}
            >
              <div className="md:w-1/2 flex justify-end">
                <Image
                  src={LearningPath}
                  alt="Learning Path"
                  width={500}
                  height={300}
                  className="rounded-3xl shadow-xl"
                />
              </div>
              <div className="md:flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-yellow-100">
                <div className="h-24 w-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="text-white" size={48} />
                </div>
                <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
                  Smart Learning Pathways
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Experience personalized learning like never before with our
                  dynamic recommendation engine. It analyzes your learning
                  style, adapts to your pace, and creates custom study paths
                  enhanced with interactive multimedia content, practice
                  exercises, and real-world applications.
                </p>
              </div>
            </div>

            <div
              className="flex flex-col md:flex-row items-center gap-8 animate-item"
              style={{ "--delay": "0.4s" }}
            >
              <div className="md:flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-100">
                <div className="h-24 w-24 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full flex items-center justify-center mb-6">
                  <ChartBar className="text-white" size={48} />
                </div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  Comprehensive Analytics Suite
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Gain deep insights into learning patterns with our advanced
                  analytics dashboard. Track progress, identify knowledge gaps,
                  and receive detailed performance metrics. Our AI continuously
                  optimizes your learning experience based on historical data
                  and learning outcomes.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={Analytic}
                  alt="Analytics Dashboard"
                  width={500}
                  height={300}
                  className="rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="key"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-purple-900"
      >
        <div className="max-w-6xl mx-auto">
          <div className="animate-item" style={{ "--delay": "0.1s" }}>
            <h2 className="text-3xl font-bold text-center text-cyan-400 mb-4">
              PreLearn Features
            </h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto mb-12"></div>
          </div>

          <div className="flex flex-col space-y-8">
            <div
              className="group bg-black/30 backdrop-blur-lg rounded-full shadow-lg p-6 hover:shadow-cyan-500/20 transition-all duration-500 transform-gpu hover:scale-105 animate-item flex items-center border border-cyan-900/50"
              style={{ "--delay": "0.2s" }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Eye className="text-white" size={36} />
              </div>
              <div className="ml-8">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
                  Real-time Eye Tracking
                </h3>
                <p className="text-cyan-100">
                  {" "}
                  Continuously monitors the user's gaze to detect focus,
                  confusion, and engagement without any manual input.
                </p>
              </div>
            </div>

            <div
              className="group bg-black/30 backdrop-blur-lg rounded-full shadow-lg p-6 hover:shadow-purple-500/20 transition-all duration-500 transform-gpu hover:scale-105 animate-item flex items-center border border-purple-900/50 ml-12"
              style={{ "--delay": "0.3s" }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Brain className="text-white" size={36} />
              </div>
              <div className="ml-8">
                <h3 className="text-2xl font-semibold text-purple-400 mb-2">
                  AI-Powered Suggestions
                </h3>
                <p className="text-purple-100">
                  {" "}
                  Uses intelligent algorithms to analyze user behavior and
                  provide instant explanations, hints, or additional learning
                  materials.
                </p>
              </div>
            </div>

            <div
              className="group bg-black/30 backdrop-blur-lg rounded-full shadow-lg p-6 hover:shadow-blue-500/20 transition-all duration-500 transform-gpu hover:scale-105 animate-item flex items-center border border-blue-900/50 ml-24"
              style={{ "--delay": "0.4s" }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-white" size={36} />
              </div>
              <div className="ml-8">
                <h3 className="text-2xl font-semibold text-blue-400 mb-2">
                  Personalized Learning Paths{" "}
                </h3>
                <p className="text-blue-100">
                  Adapts to individual learning patterns by generating
                  customized courses and topic recommendations based on user
                  interaction.
                </p>
              </div>
            </div>

            <div
              className="group bg-black/30 backdrop-blur-lg rounded-full shadow-lg p-6 hover:shadow-indigo-500/20 transition-all duration-500 transform-gpu hover:scale-105 animate-item flex items-center border border-indigo-900/50 ml-36"
              style={{ "--delay": "0.5s" }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="text-white" size={36} />
              </div>
              <div className="ml-8">
                <h3 className="text-2xl font-semibold text-indigo-400 mb-2">
                  Seamless Integration
                </h3>
                <p className="text-indigo-100">
                  Easily integrates with existing digital learning platforms,
                  enhancing the learning experience without disrupting the
                  workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="work"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50 opacity-50"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="animate-item" style={{ "--delay": "0.1s" }}>
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-12"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-item" style={{ "--delay": "0.2s" }}>
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex items-start space-x-6 group hover:-translate-x-1 transition-transform duration-300">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">
                      Track
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      As the user browses learning material, EyeGaze Assist
                      continuously monitors their eye movement using advanced
                      eye-tracking technology—no need for keyboard or mouse
                      input!
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-6 group hover:-translate-x-1 transition-transform duration-300">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600 mb-2 group-hover:text-yellow-700 transition-colors">
                      Analyze
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The system sends real-time gaze data to an AI model, which
                      analyzes user behavior to detect if they are focused,
                      confused, or stuck on a particular section.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-item" style={{ "--delay": "0.3s" }}>
              <div className="space-y-12">
                {/* Step 3 */}
                <div className="flex items-start space-x-6 group hover:-translate-x-1 transition-transform duration-300">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-500 mb-2 group-hover:text-orange-600 transition-colors">
                      Understand
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      AI identifies patterns such as prolonged staring, repeated
                      glances, or hesitation, signaling confusion. It then
                      summarizes the user's engagement to determine where they
                      need help.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-6 group hover:-translate-x-1 transition-transform duration-300">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">
                      Assist
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Without any manual input, EyeGaze Assist proactively
                      provides explanations, hints, or relevant resources to
                      guide the user toward better understanding—all in real
                      time!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-20 rounded-2xl bg-white shadow-xl overflow-hidden animate-item"
            style={{ "--delay": "0.4s" }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <h3 className="font-semibold text-xl">
                Learning Process Visualization
              </h3>
            </div>
            <div className="p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="relative w-48 h-48 mb-8 md:mb-0">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-200 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <Glasses className="text-blue-500" size={48} />
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg pulse-animation">
                  <Eye className="text-white" size={24} />
                </div>
              </div>

              <div className="flex-1 md:pl-12 space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                  <div className="text-gray-700 flex-1">
                    <span className="font-medium">Detection:</span> EyeGaze
                    identifies user focus points
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                  <div className="text-gray-700 flex-1">
                    <span className="font-medium">Analysis:</span> AI processes
                    patterns in real-time
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                  <div className="text-gray-700 flex-1">
                    <span className="font-medium">Solution:</span> Personalized
                    assistance appears instantly
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-center mt-16 animate-item"
            style={{ "--delay": "0.5s" }}
          >
            <div className="inline-block animate-float-slow">
              <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 text-white py-4 px-6 rounded-xl shadow-lg inline-block mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
                <p className="font-semibold">
                  ✨ Zero clicks, no typing—just seamless AI-driven learning! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-blue-800 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: `translateY(${scrollY * 0.02}px)`,
          }}
        ></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 animate-bounce-in">
            Join the Future of Learning – Get Started Today!
          </h2>
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-gradient-to-r m-4  from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-indigo-900 px-8 py-6 rounded-lg text-lg shadow-lg transition-all duration-500 hover:shadow-orange-300/30 hover:shadow-xl hover:scale-105 animate-bounce-in"
            style={{ "--delay": "0.3s" }}
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            onClick={() => (window.location.href = "/demo")}
            className="bg-gradient-to-r m-4  from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-indigo-900 px-8 py-6 rounded-lg text-lg shadow-lg transition-all duration-500 hover:shadow-orange-300/30 hover:shadow-xl hover:scale-105 animate-bounce-in"
          >
            Demo Trial <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Image
                  src={Logo}
                  alt="EyeGaze Assist Logo"
                  width={60}
                  height={60}
                  className="mr-3"
                />
                <h3 className="text-2xl font-bold">PreLearn</h3>
              </div>
              <p className="text-gray-400">
                Revolutionizing learning with AI-powered eye tracking technology
                for personalized education.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-yellow-400 transition-colors scroll-smooth"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#home")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-yellow-400 transition-colors scroll-smooth"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#about")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#key"
                    className="text-gray-400 hover:text-yellow-400 transition-colors scroll-smooth"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#key")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className="text-gray-400 hover:text-yellow-400 transition-colors scroll-smooth"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#work")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    How It Works
                  </a>
                </li>
                {/* <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</a></li> */}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6">Connect With Us</h4>
              <div className="flex space-x-4 mb-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
              {/* <p className="text-gray-400">
                Email: info@eyegaze-assist.com<br />
                Phone: +1 (555) 123-4567
              </p> */}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">
              © 2025 EyeGaze Assist. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500">
                Powered by{" "}
                <span className="text-yellow-400 font-semibold">PreLearn</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

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
