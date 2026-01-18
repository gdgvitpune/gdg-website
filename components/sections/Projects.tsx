"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


const projects = [
  {
    label: "Achievements",
    title: "Hack-O-Verse",
    description:
      "Secured India-wide Rank #1 while hosting an open-innovation hackathon with a ₹20K prize pool and nationwide participation.",
    items: [
      "Open-innovation problem statement",
      "₹20K total prize pool",
      "India Rank #1 in registrations & submissions",
    ],
    visual: "/hov.png",
  },
  {
    label: "Achievements",
    title: "Google Cloud Study Jams",
    description:
      "Recognized as a Tier-1 amongst all GDG's for exceptional participation and successful cloud skill completions.",
    items: [
      "Tier-1 chapter recognition",
      "100+ Google Cloud completions",
      "Hands-on cloud skill development",
      "Google-certified learning paths",
    ],
    visual: "/gc.png",
  },
  {
    label: "Achievements",
    title: "Create-A-Thon",
    description:
      "Organized an AI short-film competition with a ₹50K+ prize pool, encouraging creativity through AI-powered storytelling.",
    items: [
      "₹50K+ total prize pool",
      "AI short-film competition",
      "Creativity-driven problem statement",
      "High student participation",
    ],
    visual: "/create.png",
  },
  {
    label: "Achievements",
    title: "Tensor Fiesta Hackathon",
    description:
      "Conducted an AI & ML hackathon featuring a ₹25K+ prize pool with multiple competitive tracks.",
    items: [
      "₹25K+ total prize pool",
      "AI & ML focused hackathon",
      "Multiple problem tracks",
      "Strong student engagement",
    ],
    visual: "/tensorfiesta.jpg",
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
    <div id="projects" className="relative min-h-screen">
      <div id="achievements" className="absolute left-0 top-0" aria-hidden="true" />
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

                <div className="hidden md:flex flex-1 items-center justify-center w-full -mt-42 lg:-mt-40">
                  <div
                    className="rounded-2xl flex items-center justify-center text-base sm:text-lg md:text-xl font-medium text-white overflow-hidden ml-20 lg:ml-32"
                    style={{
                      width: '280px',
      height: '480px',
      maxHeight: '70vh',
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {project.visual.startsWith('/') ? (
                      <img
                        src={project.visual}
                        alt={project.title}
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    ) : (
                      project.visual
                    )}
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
