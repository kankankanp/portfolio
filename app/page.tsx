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

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skillsInView, setSkillsInView] = useState(false);

  const skills = {
    frontend: [
      { name: "TypeScript", level: 75, experience: "1年半 (React, Next.js)" },
      {
        name: "React",
        level: 85,
      },
      { name: "Next.js", level: 80, experience: "1年半" },
    ],
    backend: [
      { name: "Nest.js", level: 70, experience: "1年半 (Prisma, GraphQL)" },
      { name: "Go", level: 30, experience: "3ヶ月 (Echo - 個人開発)" },
      { name: "GraphQL", level: 60, experience: "" },
    ],
    infrastructure: [
      { name: "Docker", level: 60, experience: "1年" },
      { name: "AWS", level: 30, experience: "1ヶ月" },
      { name: "Terraform", level: 30, experience: "1ヶ月" },
    ],
    others: [
      { name: "GitHub Actions", level: 30, experience: "1ヶ月" },
      { name: "Orval (OpenAPI)", level: 20, experience: "" },
    ],
  };

  const detailedSkills = {
    frontend: [
      "UI開発、SPA構築",
      "フレームワークの活用（React, Next.js, Nuxt.js）",
      "状態管理（Redux Toolkit, React Hook Form, Tanstack Query）",
      "レスポンシブデザイン対応",
      "CSSプリプロセッサ利用経験",
      "アクセシビリティ対応",
      "テスト（Jest, React Testing Library）",
      "アニメーションライブラリ利用",
    ],
    backend: [
      "API開発（REST, GraphQL）",
      "フレームワーク活用（Nest.js, FastAPI, Laravel, Ruby on Rails, Echo）",
      "認証・認可の実装",
      "ビジネスロジック設計",
      "データバリデーション",
      "バックエンドテスト（Mocha, PyTest, JUnit等）",
      "タスクスケジューリング",
    ],
    infrastructure: [
      "クラウドプラットフォーム構築（AWS, Azure）",
      "コンテナ技術（Docker, Docker Compose）",
      "構成管理（Terraform）",
      "NginxによるWebサーバ設定",
      "サーバーレス・オーケストレーション（Kubernetesは未経験）",
    ],
    database: [
      "リレーショナルデータベース（PostgreSQL, MySQL）",
      "NoSQLデータベース（未経験）",
      "データベース設計・モデリング",
      "クエリ最適化",
      "バックアップ・リストア",
    ],
    devops: [
      "CI/CDパイプライン構築（GitHub Actions）",
      "バージョン管理（Git）",
      "自動テスト",
      "インフラ構成管理（Terraform）",
    ],
    security: [
      "セキュアコーディング",
      "脆弱性診断（基礎のみ）",
      "認証・認可（OAuth, OpenID Connect）",
      "暗号化技術の利用",
    ],
    testingQuality: [
      "ユニットテスト",
      "統合テスト",
      "E2Eテスト",
      "静的コード解析",
      "コードレビュー",
    ],
    projectManagement: [
      "アジャイル開発（スクラム、カンバン）",
      "課題管理（Jira, Trello, GitHub Projects）",
      "ドキュメント管理（Markdown, Notion, Confluence）",
    ],
    designUX: [
      "プロトタイピング（Figma, Adobe XD）",
      "デザインシステム構築",
      "ユーザーリサーチ",
      "ワイヤーフレーム作成",
    ],
    otherToolsSkills: [
      "コマンドラインツール利用",
      "API設計・ドキュメント（OpenAPI, Orval）",
      "パフォーマンス最適化",
      "多言語対応（i18n/l10n）",
      "Google Apps Script",
      "Azure Document Intelligence, Azure AI Search",
    ],
  };

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://github.com",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      link: "https://github.com",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts and interactive data visualizations.",
      technologies: ["React", "Chart.js", "Weather API", "TailwindCSS"],
      link: "https://github.com",
      image:
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with Next.js and featuring smooth animations.",
      technologies: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript"],
      link: "https://github.com",
      image:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="relative inline-block mb-8">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                alt="Profile"
                className="w-40 h-40 rounded-full mx-auto shadow-2xl border-4 border-white/20"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              kankankanp
            </h1>
            <div className="text-xl md:text-2xl text-blue-200 mb-4 font-medium">Software Developer
            </div>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              モダンなWebアプリケーションの構築に情熱を注ぐフルスタック開発者。
              <br className="hidden md:block" />
              ユーザー体験を重視した、美しく機能的なソフトウェアの開発を得意としています。
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              {
                icon: Linkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:contact@example.com",
                label: "Email",
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

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
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
                {skills.frontend.map((skill, index) => (
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
                {skills.backend.map((skill, index) => (
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
                {skills.infrastructure.map((skill, index) => (
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
                {skills.others.map((skill, index) => (
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
                {detailedSkills.frontend.map((skill, index) => (
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
                {detailedSkills.backend.map((skill, index) => (
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
                {detailedSkills.infrastructure.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                データベース (Database)
              </h4>
              <ul className="list-none space-y-2">
                {detailedSkills.database.map((skill, index) => (
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
                {detailedSkills.devops.map((skill, index) => (
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
                {detailedSkills.security.map((skill, index) => (
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
                {detailedSkills.testingQuality.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-pink-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                プロジェクト管理 (Project Management)
              </h4>
              <ul className="list-none space-y-2">
                {detailedSkills.projectManagement.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-teal-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                デザイン・UX (Design & UX)
              </h4>
              <ul className="list-none space-y-2">
                {detailedSkills.designUX.map((skill, index) => (
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
                {detailedSkills.otherToolsSkills.map((skill, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-gray-500 rounded-full flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
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
            {projects.map((project, index) => (
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
