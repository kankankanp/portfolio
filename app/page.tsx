"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  User,
  Briefcase,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import portfolioData from "@/lib/portfolioData.json";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skillsInView, setSkillsInView] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }

      // Check if skills section is in view
      const skillsElement = document.getElementById("skills");
      if (skillsElement) {
        const rect = skillsElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setSkillsInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-white">Portfolio</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "about", label: "Top" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === id
                      ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-700 bg-gray-900">
              <div className="px-2 py-3 space-y-1">
                {[
                  { id: "about", label: "Top" },
                  { id: "skills", label: "Skills" },
                  { id: "projects", label: "Projects" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="w-full px-3 py-2 rounded-lg text-left text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* About Section */}
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated background elements */}
        </div>

        <div className="z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 w-full pt-[64px] pb-4">
          <div className="pt-4">
            <div className="relative inline-block mb-8">
              <img
                src="profile.png"
                alt="Profile"
                className="w-[200px] h-[200px] rounded-full mx-auto shadow-2xl border-2 border-white/20 object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20"></div>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              kankankanp
            </h1>
            <div className="text-xl md:text-2xl text-blue-200 mb-4 font-medium">
              Software Developer
            </div>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              モダンなWebアプリケーションの構築に情熱を注ぐフルスタック開発者。
              <br className="hidden md:block" />
              ユーザー体験を重視した、美しく機能的なソフトウェアの開発を得意としています。
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 flex-col">
            {[
              {
                icon: Mail,
                href: "mailto:contact@example.com",
                label: "Email",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
            ].map(({ icon: Icon, href, label }) => (
              <Button
                key={label}
                variant="ghost"
                size="lg"
                className="group transition-all duration-300 hover:scale-105 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 backdrop-blur-sm"
                asChild
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {label}
                </a>
              </Button>
            ))}
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Skills
          </h2>

          {/* 言語・フレームワーク・ツール経験 */}
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            言語・フレームワーク・ツール経験
          </h3>
          <div className="mb-12 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Frontend
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.skills.frontend.map((skill, index) => (
                  <li key={index} className="text-gray-700 mb-4">
                    <div className="flex items-center mb-2">
                      <span className="inline-block w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
                      <strong>{skill.name}</strong>
                    </div>
                    {skill.level && (
                      <div className="flex items-center w-full">
                        <Progress
                          value={skill.level}
                          className="h-2 flex-grow"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {skill.level}%
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Backend
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.skills.backend.map((skill, index) => (
                  <li key={index} className="text-gray-700 mb-4">
                    <div className="flex items-center mb-2">
                      <span className="inline-block w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                      <strong>{skill.name}</strong>
                    </div>
                    {skill.level && (
                      <div className="flex items-center w-full">
                        <Progress
                          value={skill.level}
                          className="h-2 flex-grow"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {skill.level}%
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Infrastructure
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.skills.infrastructure.map((skill, index) => (
                  <li key={index} className="text-gray-700 mb-4">
                    <div className="flex items-center mb-2">
                      <span className="inline-block w-2 h-2 mr-2 bg-purple-500 rounded-full"></span>
                      <strong>{skill.name}</strong>
                    </div>
                    {skill.level && (
                      <div className="flex items-center w-full">
                        <Progress
                          value={skill.level}
                          className="h-2 flex-grow"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {skill.level}%
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Others
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.skills.others.map((skill, index) => (
                  <li key={index} className="text-gray-700 mb-4">
                    <div className="flex items-center mb-2">
                      <span className="inline-block w-2 h-2 mr-2 bg-yellow-500 rounded-full"></span>
                      <strong>{skill.name}</strong>
                    </div>
                    {skill.level && (
                      <div className="flex items-center w-full">
                        <Progress
                          value={skill.level}
                          className="h-2 flex-grow"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {skill.level}%
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 詳細スキル */}
          <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-12">
            詳細スキル
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                フロントエンド (Frontend)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.frontend.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                バックエンド (Backend)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.backend.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                インフラ (Infrastructure)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.infrastructure.map(
                  (skill, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="inline-block w-2 h-2 mt-2 mr-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                      {skill}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                データベース (Database)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.database.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-red-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                DevOps
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.devops.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                セキュリティ (Security)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.security.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-indigo-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                テスト・品質管理 (Testing & Quality)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.testingQuality.map(
                  (skill, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="inline-block w-2 h-2 mt-2 mr-2 bg-pink-500 rounded-full flex-shrink-0"></span>
                      {skill}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                プロジェクト管理 (Project Management)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.projectManagement.map(
                  (skill, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="inline-block w-2 h-2 mt-2 mr-2 bg-teal-500 rounded-full flex-shrink-0"></span>
                      {skill}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                デザイン・UX (Design & UX)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.designUX.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-cyan-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                その他ツール・技術 (Other Tools & Skills)
              </h4>
              <ul className="list-none space-y-2">
                {portfolioData.detailedSkills.otherToolsSkills.map(
                  (skill, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="inline-block w-2 h-2 mt-2 mr-2 bg-gray-500 rounded-full flex-shrink-0"></span>
                      {skill}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm">
          &copy;2025 kankankanp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
