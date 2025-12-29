"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ChatBot from "./components/ChatBot";
import AppointmentBooking from "./components/AppointmentBooking";
import ContactForm from "./components/ContactForm";

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
                <span>💼</span>
                <span className="contact-text">LinkedIn</span>
              </a>
              <a
                href="https://github.com/douviiii"
                target="_blank"
                rel="noopener noreferrer"
                className="sticky-contact-button flex items-center px-3 py-1.5 bg-white border border-dashed border-[#E2852E] text-black rounded-full text-xs font-medium transition-all"
              >
                <span>💻</span>
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
                  <span>💼</span>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/douviiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button flex items-center gap-2 text-black bg-white border border-dashed border-[#E2852E] transition-all hover:scale-105 px-4 py-2 rounded-full relative z-0"
                >
                  <span>💻</span>
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
              <h2 className="cv-section-title">
                Professional Summary
              </h2>
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
              <h2 className="cv-section-title">
                Technical Skills
              </h2>
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
              <h2 className="cv-section-title">
                Education
              </h2>
              <div className="cv-section-content">
                <h3 className="text-base font-semibold text-gray-800 mb-1">Passerelles numériques Vietnam</h3>
                <p className="text-sm text-gray-700 mb-1">Information Technology</p>
                <p className="text-xs text-gray-500">Sep 2019 - Oct 2022</p>
              </div>
            </section>

            {/* Certifications */}
            <section className="cv-section cv-section-card animate-slide-in-left animate-delay-400">
              <h2 className="cv-section-title">
                Certifications
              </h2>
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
              <h2 className="cv-section-title">
                Activities
              </h2>
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
              <h2 className="cv-section-title">
                Languages
              </h2>
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
            <section className="cv-section cv-section-card animate-slide-in-right animate-delay-100">
              <h2 className="text-2xl font-bold text-[#E2852E] mb-6 pb-3 border-b-2 border-[#E2852E]">
                Work Experience
              </h2>
              
              <div className="space-y-6">
                {/* Staffun */}
                <div className="border-l-4 border-[#E2852E] pl-4 bg-gradient-to-r from-[#ABE0F0]/30 to-transparent p-4 rounded-r-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Staffun - Android Developer
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E2852E]/10 text-[#E2852E] border border-[#E2852E]/30">
                      July 2025 - Now
                    </span>
                  </div>
                  <div className="space-y-4 text-gray-700 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Customer Support & Technical Assistance</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Delivered responsive technical support, resolving customer inquiries and application issues to ensure optimal user experience</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Project: LINKON Driver Transportation</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Architected and developed Android applications using Kotlin, Clean Architecture, and MVVM pattern, resulting in scalable and maintainable codebase</li>
                        <li>Integrated Google Maps and Navigation APIs to deliver real-time location tracking and route optimization for driver navigation</li>
                        <li>Established CI/CD pipelines with GitHub Actions, automating builds and test execution, reducing deployment time by 40%</li>
                        <li>Built custom UI components and views, enhancing user interface responsiveness and creating intuitive user experiences</li>
                        <li>Implemented comprehensive Firebase integration (Crashlytics, ANR monitoring, Remote Config, FCM) to improve app stability and enable feature toggling</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Project: SANDTONER</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Resolved critical Play Store deployment issues including app signing, version conflicts, and policy compliance, ensuring successful releases</li>
                        <li>Optimized app performance by implementing list virtualization, image lazy loading, and data prefetching, reducing memory usage by 35% and eliminating UI lag</li>
                        <li>Enhanced real-time chat functionality with WebSocket implementation, achieving 99.9% message delivery reliability</li>
                        <li>Integrated Firebase Analytics to gain actionable user insights, enabling data-driven product decisions and improving user engagement metrics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CastTV */}
                <div className="border-l-4 border-[#E2852E] pl-4 bg-gradient-to-r from-[#ABE0F0]/30 to-transparent p-4 rounded-r-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      CastTV - Android Developer - Kotlin
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E2852E]/10 text-[#E2852E] border border-[#E2852E]/30">
                      Feb 2025 - Apr 2025
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700 text-sm">
                    <li>Developed CastTV Android application with Google Cast SDK, enabling seamless content streaming to Chromecast devices</li>
                    <li>Designed modern, responsive UI using Jetpack Compose, delivering smooth user interactions and improved user experience</li>
                    <li>Integrated Firebase Analytics to track user behavior and engagement patterns, informing product optimization strategies</li>
                    <li>Implemented monetization solutions with AdMob and RevenueCat, managing subscriptions and in-app purchases effectively</li>
                  </ul>
                </div>

                {/* NAB Innovation Centre */}
                <div className="border-l-4 border-[#E2852E] pl-4 bg-gradient-to-r from-[#ABE0F0]/30 to-transparent p-4 rounded-r-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      NAB Innovation Centre Vietnam - Android Developer - Kotlin/Java
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E2852E]/10 text-[#E2852E] border border-[#E2852E]/30">
                      Aug 2022 - Dec 2024
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700 text-sm">
                    <li>Enhanced application security by implementing Snyk for continuous vulnerability scanning and dependency management, reducing security risks</li>
                    <li>Maintained compliance with security policies by proactively identifying and updating outdated dependencies</li>
                    <li>Evaluated and adapted to Android SDK versions 33-35, ensuring compatibility and leveraging new platform capabilities</li>
                    <li>Reduced APK size by 25% and improved performance by converting PNG assets to vector drawables, enhancing scalability across devices</li>
                    <li>Delivered seamless user onboarding experience with robust form validation, local data caching, and comprehensive error handling</li>
                    <li>Collaborated with cross-functional teams to establish secure coding standards, minimizing security vulnerabilities in production</li>
                    <li>Architected scalable features using MVVM with Repository and UseCase patterns, improving code maintainability and test coverage</li>
                    <li>Applied design patterns (Singleton, DI, Adapter) to enhance code quality, resulting in improved reusability and easier unit testing</li>
                  </ul>
                </div>

                {/* Blue Otter */}
                <div className="border-l-4 border-[#E2852E] pl-4 bg-gradient-to-r from-[#ABE0F0]/30 to-transparent p-4 rounded-r-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Blue Otter Vietnam - Front-end Developer - JavaScript
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E2852E]/10 text-[#E2852E] border border-[#E2852E]/30">
                      May 2021 - Jul 2021
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700 text-sm">
                    <li>Developed responsive food ordering web application using React and Ant Design, delivering seamless user experience across devices</li>
                    <li>Implemented Redux for centralized state management, efficiently handling complex UI interactions and data flows</li>
                    <li>Integrated Firebase Authentication and Firestore to enable secure user authentication and real-time data synchronization</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="cv-section-card animate-slide-in-right animate-delay-200">
              <h2 className="text-2xl font-bold text-[#E2852E] mb-6 pb-3 border-b-2 border-[#E2852E]">
                Projects
              </h2>
              <div className="space-y-4">
                {[
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
                ].map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-[#FFEE91]/40 via-[#ABE0F0]/30 to-[#FFEE91]/20 p-5 rounded-xl border border-[#F5C857]/50 hover:shadow-md transition-all relative animate-fade-in-up"
                    style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-[#E2852E] rounded-full text-sm font-medium transition-all hover:border-[#E2852E] hover:bg-[#E2852E]/5 hover:scale-105"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700 text-sm">
                      {project.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </main>
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
