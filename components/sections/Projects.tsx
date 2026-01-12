"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin, Instagram } from "lucide-react"

const projects = [
  {
    label: "Projects",
    title: "Stellar Mapping",
    description:
      "Navigate through the cosmos with precision mapping technology that reveals the secrets of distant star systems.",
    items: [
      "Deep Space Research",
      "Constellation Analysis",
      "Celestial Navigation",
      "Cosmic Coordinates",
      "Stellar Classification",
      "Galactic Mapping",
      "Nebula Discovery",
    ],
    visual: "★ Star Map ★",
  },
  {
    label: "Projects",
    title: "Planetary Systems",
    description:
      "Discover diverse planetary systems and understand the complex dynamics of celestial bodies orbiting distant stars.",
    items: [
      "Planet Classification",
      "Orbital Mechanics",
      "Atmospheric Analysis",
      "Exoplanet Research",
      "Surface Mapping",
      "Climate Systems",
      "Habitability Studies",
    ],
    visual: "◉ Solar System ◉",
  },
  {
    label: "Projects",
    title: "Space Stations",
    description:
      "Advanced orbital facilities that serve as hubs for research, Projects, and humanity's expansion into the cosmos.",
    items: [
      "Orbital Design",
      "Life Support Systems",
      "Research Laboratories",
      "Docking Protocols",
      "Energy Generation",
      "Communication Arrays",
      "Crew Operations",
    ],
    visual: "⬡ Station Hub ⬡",
  },
  {
    label: "Projects",
    title: "Deep Space Travel",
    description: "Venture beyond known boundaries with advanced propulsion systems designed for interstellar journeys.",
    items: [
      "Warp Drive Technology",
      "Navigation Systems",
      "Long-Range Scanners",
      "Quantum Communications",
      "Mission Planning",
      "Resource Management",
      "Emergency Protocols",
    ],
    visual: "✦ Spacecraft ✦",
  },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cards = cardsRef.current

    // Set initial positions and z-index
    gsap.set(cards[0], { y: 0, zIndex: 4 })
    gsap.set(cards[1], { y: "100vh", zIndex: 3 })
    gsap.set(cards[2], { y: "100vh", zIndex: 2 })
    gsap.set(cards[3], { y: "100vh", zIndex: 1 })

    const scrollPerCard = window.innerHeight
    const totalScrollDistance = scrollPerCard * 3

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalScrollDistance}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        scrub: 1,
      },
    })

    tl.to(
      cards[1],
      {
        y: 0,
        duration: 1,
        onStart: () => {
          gsap.set(cards[1], { zIndex: 5 })
          gsap.set(cards[0], { zIndex: 4 })
        },
      },
      0,
    )

      .to(
        cards[2],
        {
          y: 0,
          duration: 1,
          onStart: () => {
            gsap.set(cards[2], { zIndex: 6 })
            gsap.set(cards[1], { zIndex: 5 })
            gsap.set(cards[0], { zIndex: 4 })
          },
        },
        1,
      )

      .to(
        cards[3],
        {
          y: 0,
          duration: 1,
          onStart: () => {
            gsap.set(cards[3], { zIndex: 7 })
            gsap.set(cards[2], { zIndex: 6 })
            gsap.set(cards[1], { zIndex: 5 })
            gsap.set(cards[0], { zIndex: 4 })
          },
        },
        2,
      )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <div ref={particlesRef} className="fixed top-0 left-0 w-full h-full z-0" />

      <section className="relative w-full z-10">
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="absolute top-0 left-0 right-0 w-full h-full flex flex-col rounded-t-3xl shadow-2xl overflow-y-auto"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0 -10px 40px -10px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="p-6 sm:p-10 md:p-20 h-auto md:h-64">
                <div className="text-sm sm:text-base font-medium mb-2 sm:mb-4 opacity-70 uppercase tracking-widest text-white">
                  {project.label}
                </div>
                <h2
                  className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white"
                  style={{ textShadow: "0 0 30px rgba(255, 255, 255, 0.3)" }}
                >
                  {project.title}
                </h2>
              </div>

              <div className="flex-1 px-6 sm:px-10 md:px-20 pb-6 sm:pb-10 md:pb-20 flex flex-col lg:flex-row gap-8 lg:gap-24 items-start lg:items-center text-white">
                <div className="flex-none w-full lg:w-[450px]">
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 opacity-90">
                    {project.description}
                  </p>
                  <ul className="list-none text-sm sm:text-base md:text-lg leading-loose opacity-80">
                    {project.items.map((item, i) => (
                      <li key={i} className="before:content-['→_'] before:mr-2 before:opacity-50">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center w-full">
                  <div
                    className="w-full max-w-md lg:max-w-2xl h-48 sm:h-64 lg:h-96 rounded-2xl flex items-center justify-center text-base sm:text-lg md:text-xl font-medium text-white"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 8px 32px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {project.visual}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
