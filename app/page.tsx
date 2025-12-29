"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ChatBot from "./components/ChatBot";
import AppointmentBooking from "./components/AppointmentBooking";
import ContactForm from "./components/ContactForm";
import RocketIcon from "./components/RocketIcon";
import DiagramIcon from "./components/DiagramIcon";
import MortarboardIcon from "./components/MortarboardIcon";
import DiplomaIcon from "./components/DiplomaIcon";
import CustomerIcon from "./components/CustomerIcon";
import ChatIcon from "./components/ChatIcon";
import ComputerIcon from "./components/ComputerIcon";

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const projects = [
    {
      title: "KMM-Movies-Demo",
      githubUrl: "https://github.com/douviiii/KMM-Movies-Demo",
      items: [
        "Implemented Kotlin Multiplatform Mobile (KMM) architecture to share core business logic across Android and iOS.",
        "Developed clean architecture layers (UseCase, Repository, Data Source) for separation of concerns.",
        "Integrated remote movie API using Ktor client with error handling in shared code.",
        "Managed state with Kotlin Flow and configured platform-specific data storage.",
        "Set up CI pipeline with GitHub Actions for multiplatform builds and tests."
      ]
    },
    {
      title: "Calendar Working Training",
      githubUrl: "https://github.com/douviiii/Calendar-Working-Training",
      items: [
        "Built training app to interact with Android's Calendar Provider API.",
        "Designed custom UI for date/time input with calendar permissions handling.",
        "Managed UI state using ViewModel and LiveData with lifecycle awareness.",
        "Wrote unit and UI tests to ensure correctness of calendar operations."
      ]
    },
    {
      title: "ML Android Scan Object",
      githubUrl: "https://github.com/douviiii/ML-Android-Scan-Object",
      items: [
        "Implemented real-time object detection using ML Kit.",
        "Built responsive UI with XML for live previews and overlay annotations.",
        "Processed and filtered detection results to support app logic.",
        "Optimized performance by handling ML in background threads."
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setIsSticky(rect.top < -100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
          rgba(255, 238, 145, 0.4) 0%, 
          rgba(171, 224, 240, 0.3) 50%, 
          rgba(245, 200, 87, 0.4) 100%)`,
        transition: "background 0.3s ease-out"
      }}
    >
      {/* Sticky Compact Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 transition-all duration-300 ${
          isSticky ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto w-full px-4 md:px-8 lg:px-12 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#E2852E]">
                <Image
                  src="/image.png"
                  alt="Duong A"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Duong A</h1>
                <p className="text-xs text-gray-600">Mobile Developer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:code.with.dobby@gmail.com"
                className="sticky-contact-button flex items-center px-3 py-1.5 bg-white border border-dashed border-[#E2852E] text-black rounded-full text-xs font-medium transition-all"
              >
                <span>📧</span>
                <span className="contact-text">code.with.dobby@gmail.com</span>
              </a>
              <a
                href="tel:0869963501"
                className="sticky-contact-button flex items-center px-3 py-1.5 bg-white border border-dashed border-[#E2852E] text-black rounded-full text-xs font-medium transition-all"
              >
                <span>📱</span>
                <span className="contact-text">0869963501</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sticky-contact-button flex items-center px-3 py-1.5 bg-white border border-dashed border-[#E2852E] text-black rounded-full text-xs font-medium transition-all"
              >
                <Image src="/image copy 2.png" alt="LinkedIn" width={16} height={16} className="w-4 h-4" />
                <span className="contact-text">LinkedIn</span>
              </a>
              <a
                href="https://github.com/douviiii"
                target="_blank"
                rel="noopener noreferrer"
                className="sticky-contact-button flex items-center px-3 py-1.5 bg-white border border-dashed border-[#E2852E] text-black rounded-full text-xs font-medium transition-all"
              >
                <Image src="/image copy.png" alt="GitHub" width={16} height={16} className="w-4 h-4" />
                <span className="contact-text">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full px-4 py-6 md:px-8 md:py-10 lg:px-12">
        {/* Main Header Section */}
        <header
          ref={headerRef}
          className="bg-gradient-to-br from-[#E2852E] via-[#E2852E] to-[#F5C857] text-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 relative overflow-hidden animate-fade-in"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 animate-scale-in"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 animate-scale-in animate-delay-200"></div>
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0 animate-scale-in animate-delay-100">
              <div className="h-36 w-36 md:h-40 md:w-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-white/20">
                <Image
                  src="/image.png"
                  alt="Duong A"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center md:text-left animate-fade-in-up animate-delay-200">
              <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight">Duong A</h1>
              <p className="text-2xl md:text-3xl text-white/95 mb-2 font-light">Mobile Developer</p>
              <p className="text-sm md:text-base text-white/80 mb-6">📍 Ho Chi Minh City, Vietnam</p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm md:text-base">
                <a
                  href="mailto:code.with.dobby@gmail.com"
                  className="contact-button flex items-center gap-2 text-black bg-white border border-dashed border-[#E2852E] transition-all hover:scale-105 px-4 py-2 rounded-full relative z-0"
                >
                  <span>📧</span>
                  <span>code.with.dobby@gmail.com</span>
                </a>
                <a
                  href="tel:0869963501"
                  className="contact-button flex items-center gap-2 text-black bg-white border border-dashed border-[#E2852E] transition-all hover:scale-105 px-4 py-2 rounded-full relative z-0"
                >
                  <span>📱</span>
                  <span>0869963501</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button flex items-center gap-2 text-black bg-white border border-dashed border-[#E2852E] transition-all hover:scale-105 px-4 py-2 rounded-full relative z-0"
                >
                  <Image src="/image copy 2.png" alt="LinkedIn" width={20} height={20} className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/douviiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button flex items-center gap-2 text-black bg-white border border-dashed border-[#E2852E] transition-all hover:scale-105 px-4 py-2 rounded-full relative z-0"
                >
                  <Image src="/image copy.png" alt="GitHub" width={20} height={20} className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Summary & Skills */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Professional Summary */}
            <section className="cv-section cv-section-card animate-slide-in-left animate-delay-100">
              <div className="flex items-center gap-3 mb-4">
                <RocketIcon />
                <h2 className="cv-section-title mb-0">
                  Professional Summary
                </h2>
              </div>
              <div className="cv-section-content">
                <p className="text-sm leading-relaxed">
                  Mobile Developer with over 3 years of experience in Android development using Kotlin and Java. 
                  Strong background in Clean Architecture and MVVM, building scalable, maintainable, and high-performance applications. 
                  Experienced in Jetpack Compose, Firebase, Google APIs, and CI/CD automation.
                </p>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="cv-section cv-section-card animate-slide-in-left animate-delay-200">
              <div className="flex items-center gap-3 mb-4">
                <DiagramIcon />
                <h2 className="cv-section-title mb-0">
                  Technical Skills
                </h2>
              </div>
              <div className="cv-section-content space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Kotlin", "Java", "JavaScript"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gradient-to-r from-[#E2852E]/20 to-[#F5C857]/20 text-[#E2852E] rounded-full text-xs font-medium border border-[#E2852E]/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React Native", "Jetpack Compose", "KMM"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-[#ABE0F0]/30 to-[#ABE0F0]/20 text-[#1e40af] rounded-full text-xs font-medium border border-[#ABE0F0]/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">Tools & Others</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Android Studio", "Firebase", "Github Action", "Jenkins", "JUnit", "Espresso"].map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-gradient-to-r from-[#FFEE91]/40 to-[#FFEE91]/20 text-gray-700 rounded-full text-xs font-medium border border-[#FFEE91]/50"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="cv-section cv-section-card animate-slide-in-left animate-delay-300">
              <div className="flex items-center gap-3 mb-4">
                <MortarboardIcon />
                <h2 className="cv-section-title mb-0">
                  Education
                </h2>
              </div>
              <div className="cv-section-content">
                <h3 className="text-base font-semibold text-gray-800 mb-1">Passerelles numériques Vietnam</h3>
                <p className="text-sm text-gray-700 mb-1">Information Technology</p>
                <p className="text-xs text-gray-500">Sep 2019 - Oct 2022</p>
              </div>
            </section>

            {/* Certifications */}
            <section className="cv-section cv-section-card animate-slide-in-left animate-delay-400">
              <div className="flex items-center gap-3 mb-4">
                <DiplomaIcon />
                <h2 className="cv-section-title mb-0">
                  Certifications
                </h2>
              </div>
              <ul className="cv-section-content space-y-2">
                {["AWS Cloud Practitioner", "Microsoft Azure Fundamentals", "HackerRank Software Engineer Certificate"].map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-sm">
                    <span className="text-[#E2852E] mt-1">🏆</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Activities */}
            <section className="cv-section cv-section-card animate-slide-in-left animate-delay-500">
              <div className="flex items-center gap-3 mb-4">
                <CustomerIcon />
                <h2 className="cv-section-title mb-0">
                  Activities
                </h2>
              </div>
              <ul className="cv-section-content space-y-2">
                {["Mentoring at Passerelles Numériques Vietnam", "Member at PNV-AA"].map((activity) => (
                  <li key={activity} className="flex items-start gap-2 text-sm">
                    <span className="text-[#E2852E] mt-1">👥</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Languages */}
            <section className="cv-section-card animate-slide-in-left animate-delay-500">
              <div className="flex items-center gap-3 mb-4">
                <ChatIcon />
                <h2 className="cv-section-title mb-0">
                  Languages
                </h2>
              </div>
              <ul className="cv-section-content space-y-2">
                <li className="flex items-center justify-between text-sm">
                  <span>Vietnamese</span>
                  <span className="text-gray-500">Native</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span>English</span>
                  <span className="text-gray-500">Professional</span>
                </li>
              </ul>
            </section>
          </aside>

          {/* Right Column - Experience & Projects */}
          <main className="lg:col-span-2 space-y-8">
            {/* Work Experience */}
            <section className="cv-section cv-section-card animate-slide-in-right animate-delay-100 work-experience-section">
              <div className="flex items-center gap-3 mb-6">
                <ComputerIcon />
                <h2 className="text-2xl font-bold text-[#E2852E] pb-3 border-b-2 border-[#E2852E] flex-1">
                  Work Experience
                </h2>
              </div>
              
              <div className="space-y-6">
                {/* Staffun */}
                <div className="border-l-4 border-[#E2852E] pl-4 bg-gradient-to-r from-[#ABE0F0]/30 to-transparent p-4 rounded-r-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Staffun - Android Developer
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Full-time • Ho Chi Minh City, Vietnam</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E2852E]/10 text-[#E2852E] border border-[#E2852E]/30 mt-2 md:mt-0">
                      July 2025 - Present
                    </span>
                  </div>
                  
                  <div className="space-y-5 text-gray-700 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-[#E2852E]">📞</span>
                        Customer Support & Technical Assistance
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 ml-2 text-gray-700">
                        <li>Provided responsive technical support to end-users, troubleshooting application issues and resolving customer inquiries promptly</li>
                        <li>Diagnosed and fixed bugs reported by users, improving overall application stability and user satisfaction</li>
                        <li>Collaborated with product and QA teams to identify root causes of issues and implement long-term solutions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-[#E2852E]">🚗</span>
                        Project: LINKON Driver Transportation Application
                      </p>
                      <p className="text-xs text-gray-600 mb-2 italic">A comprehensive transportation management platform for drivers</p>
                      <ul className="list-disc list-inside space-y-1.5 ml-2 text-gray-700">
                        <li><strong>Architecture & Development:</strong> Architected and developed the Android application from ground up using Kotlin, implementing Clean Architecture principles with MVVM pattern. Designed modular architecture with clear separation of concerns (Presentation, Domain, Data layers), resulting in a highly scalable and maintainable codebase</li>
                        <li><strong>Location Services:</strong> Integrated Google Maps SDK and Navigation APIs to deliver real-time location tracking, route optimization, and turn-by-turn navigation for drivers. Implemented background location services with battery optimization techniques to ensure continuous tracking without draining device battery</li>
                        <li><strong>CI/CD Automation:</strong> Established comprehensive CI/CD pipelines using GitHub Actions, automating build processes, unit test execution, and deployment workflows. This automation reduced manual deployment time by 40% and improved code quality through automated testing</li>
                        <li><strong>UI/UX Development:</strong> Built custom UI components and reusable views using Material Design principles, ensuring consistent design language across the application. Enhanced user interface responsiveness and created intuitive user experiences that improved user engagement</li>
                        <li><strong>Firebase Integration:</strong> Implemented comprehensive Firebase services including Crashlytics for crash reporting, ANR (Application Not Responding) monitoring, Remote Config for feature toggling, and FCM (Firebase Cloud Messaging) for push notifications. This integration significantly improved app stability and enabled dynamic feature management without app updates</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-[#E2852E]">💬</span>
                        Project: SANDTONER Application
                      </p>
                      <p className="text-xs text-gray-600 mb-2 italic">A communication and collaboration platform</p>
                      <ul className="list-disc list-inside space-y-1.5 ml-2 text-gray-700">
                        <li><strong>Play Store Deployment:</strong> Resolved critical Play Store deployment issues including app signing configuration, version conflicts, and Google Play policy compliance. Successfully navigated the app review process and ensured all releases met Play Store guidelines, resulting in successful app launches</li>
                        <li><strong>Performance Optimization:</strong> Optimized application performance through multiple techniques: implemented RecyclerView list virtualization for efficient memory usage, image lazy loading with caching strategies, and intelligent data prefetching. These optimizations reduced memory usage by 35% and completely eliminated UI lag and frame drops</li>
                        <li><strong>Real-time Communication:</strong> Enhanced real-time chat functionality by implementing WebSocket connections with automatic reconnection logic and message queuing. Achieved 99.9% message delivery reliability and reduced message latency to under 100ms, significantly improving user communication experience</li>
                        <li><strong>Analytics & Insights:</strong> Integrated Firebase Analytics with custom event tracking to gain actionable user insights. Created comprehensive dashboards for user behavior analysis, enabling data-driven product decisions. This led to improved user engagement metrics and informed feature prioritization</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CastTV */}
                <div className="border-l-4 border-[#E2852E] pl-4 bg-gradient-to-r from-[#ABE0F0]/30 to-transparent p-4 rounded-r-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        CastTV - Android Developer
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Full-time • Remote</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E2852E]/10 text-[#E2852E] border border-[#E2852E]/30 mt-2 md:mt-0">
                      February 2025 - April 2025
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 italic">A streaming application with Chromecast support</p>
                  
                  <ul className="list-disc list-inside space-y-1.5 ml-2 text-gray-700 text-sm">
                    <li><strong>Google Cast Integration:</strong> Developed CastTV Android application with full Google Cast SDK integration, enabling seamless content streaming to Chromecast devices. Implemented cast discovery, session management, and media queue handling to provide smooth casting experience across different content types</li>
                    <li><strong>Modern UI Development:</strong> Designed and implemented modern, responsive user interface using Jetpack Compose, leveraging declarative UI patterns and Material Design 3 components. Created smooth animations and transitions, delivering enhanced user interactions and significantly improved user experience compared to traditional XML-based layouts</li>
                    <li><strong>User Analytics:</strong> Integrated Firebase Analytics with comprehensive event tracking to monitor user behavior, content consumption patterns, and engagement metrics. Analyzed data to inform product optimization strategies and identify areas for feature improvements</li>
                    <li><strong>Monetization Strategy:</strong> Implemented comprehensive monetization solutions using AdMob for display and video advertisements, and RevenueCat for subscription management and in-app purchases. Configured subscription tiers, trial periods, and purchase flows, enabling effective revenue generation while maintaining positive user experience</li>
                  </ul>
                </div>

                {/* NAB Innovation Centre */}
                <div className="border-l-4 border-[#E2852E] pl-4 bg-gradient-to-r from-[#ABE0F0]/30 to-transparent p-4 rounded-r-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        NAB Innovation Centre Vietnam - Android Developer
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Full-time • Ho Chi Minh City, Vietnam</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E2852E]/10 text-[#E2852E] border border-[#E2852E]/30 mt-2 md:mt-0">
                      August 2022 - December 2024
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 italic">Banking and financial services mobile application development</p>
                  
                  <ul className="list-disc list-inside space-y-1.5 ml-2 text-gray-700 text-sm">
                    <li><strong>Security Enhancement:</strong> Enhanced application security by implementing Snyk for continuous vulnerability scanning and automated dependency management. Established security policies and workflows that proactively identified and remediated security vulnerabilities, reducing security risks and ensuring compliance with banking industry standards</li>
                    <li><strong>Dependency Management:</strong> Maintained strict compliance with security policies by regularly auditing and updating outdated dependencies. Created automated dependency update workflows that ensured all third-party libraries were kept current with security patches, minimizing exposure to known vulnerabilities</li>
                    <li><strong>Platform Adaptation:</strong> Evaluated and adapted application to Android SDK versions 33-35, ensuring full compatibility with latest Android features and platform capabilities. Leveraged new APIs and improvements in each SDK version to enhance app functionality and user experience</li>
                    <li><strong>Asset Optimization:</strong> Reduced APK size by 25% and improved application performance by converting PNG image assets to vector drawables (SVG). This optimization enhanced scalability across different screen densities and resolutions while maintaining visual quality and reducing memory footprint</li>
                    <li><strong>User Onboarding:</strong> Delivered seamless user onboarding experience by implementing robust form validation, local data caching strategies, and comprehensive error handling. Created intuitive step-by-step flows that guided users through account setup and feature discovery, resulting in improved user retention</li>
                    <li><strong>Security Standards:</strong> Collaborated with cross-functional teams including security, QA, and product teams to establish and enforce secure coding standards. Conducted code reviews focused on security best practices, minimizing security vulnerabilities in production and ensuring compliance with financial industry regulations</li>
                    <li><strong>Architecture Design:</strong> Architected scalable features using MVVM (Model-View-ViewModel) pattern combined with Repository and UseCase patterns. This architecture improved code maintainability, testability, and enabled better separation of concerns. Increased unit test coverage significantly through this architectural approach</li>
                    <li><strong>Design Patterns:</strong> Applied various design patterns including Singleton for shared resources, Dependency Injection for loose coupling, and Adapter patterns for data transformation. These patterns enhanced code quality, improved reusability, and made unit testing more straightforward, resulting in more maintainable and robust codebase</li>
                  </ul>
                </div>

                {/* Blue Otter */}
                <div className="border-l-4 border-[#E2852E] pl-4 bg-gradient-to-r from-[#ABE0F0]/30 to-transparent p-4 rounded-r-lg mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Blue Otter Vietnam - Front-end Developer
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Internship • Ho Chi Minh City, Vietnam</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E2852E]/10 text-[#E2852E] border border-[#E2852E]/30 mt-2 md:mt-0">
                      May 2021 - July 2021
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 italic">Food ordering and delivery web application</p>
                  
                  <ul className="list-disc list-inside space-y-1.5 ml-2 text-gray-700 text-sm">
                    <li><strong>Responsive Web Development:</strong> Developed responsive food ordering web application using React.js and Ant Design component library. Implemented mobile-first design approach, ensuring seamless user experience across desktop, tablet, and mobile devices. Created reusable components and maintained consistent design system throughout the application</li>
                    <li><strong>State Management:</strong> Implemented Redux for centralized state management, efficiently handling complex UI interactions and data flows. Designed Redux store structure with proper action creators, reducers, and middleware to manage application state, cart management, user authentication, and order processing</li>
                    <li><strong>Backend Integration:</strong> Integrated Firebase Authentication for secure user authentication with multiple sign-in methods (email/password, Google, Facebook). Implemented Firestore database for real-time data synchronization, enabling live order updates and inventory management. Created efficient data queries and real-time listeners for optimal performance</li>
                  </ul>
                </div>
              </div>
            </section>

          </main>
        </div>

        {/* Projects Section */}
        <div className="w-full mt-12 mb-8 px-4 md:px-8 lg:px-12">
          <section className="w-full">
            <h2 className="text-2xl font-bold text-[#E2852E] mb-6 pb-3 border-b-2 border-[#E2852E]">
              Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-[#FFEE91]/40 via-[#ABE0F0]/30 to-[#FFEE91]/20 p-5 md:p-6 rounded-xl border border-[#F5C857]/50 hover:shadow-lg transition-all h-full flex flex-col"
                >
                  <div className="flex flex-col gap-3 mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{project.title}</h3>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-[#E2852E] rounded-full text-sm font-medium transition-all hover:border-[#E2852E] hover:bg-[#E2852E]/5 hover:scale-105 w-fit"
                      >
                        <Image src="/image copy.png" alt="GitHub" width={16} height={16} className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                  <ul className="list-disc list-inside space-y-2 ml-2 text-gray-700 text-sm flex-grow">
                    {project.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 mb-8">
          <ContactForm />
        </div>

        {/* Download PDF Button */}
        <div className="text-center mt-8 mb-6 animate-fade-in-up animate-delay-400">
          <a
            href="/Duong A Viet.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E2852E] hover:bg-[#F5C857] text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download PDF CV</span>
          </a>
        </div>
      </div>

      {/* ChatBot */}
      <ChatBot />
      
      {/* Appointment Booking */}
      <AppointmentBooking />
    </div>
  );
}
