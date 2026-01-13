"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Instagram } from "lucide-react"

const teamMembers = [
  {
    image: "/AB4.png",
    hoverImage: "/AB7.jpeg",
    name: "Aditya Bhattacharya",
    role: "Co-Lead",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },

  {
    image: "/Kartik.jpg",
    name: "Kartik Chavan",
    role: "Organizer",
    description: "Full-stack architect passionate about scalable solutions",
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
      instagram: "https://instagram.com/sarahchen",
    },
  },
  {
    image: "/aparna.jpg",
    name: "Aparna Nimishakavi",
    role: "Co-Lead",
    description: "Award-winning designer creating beautiful user experiences",
    social: {
      linkedin: "https://linkedin.com/in/marcuswilliams",
      github: "https://github.com/marcuswilliams",
      instagram: "https://instagram.com/marcuswilliams",
    },
  },
  {
    image: "/a.png",
    name: "Ananya",
    role: "Head of Multimedia",
    description: "Growth strategist driving brand visibility worldwide",
    social: {
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      github: "https://github.com/emilyrodriguez",
      instagram: "https://instagram.com/emilyrodriguez",
    },
  },
  {
    image: "/Alesha.jpeg",
    name: "Alesha",
    role: "Co-Head of Multimedia",
    description: "Silly and Goofy",
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim",
      instagram: "https://instagram.com/davidkim",
    },
  },
  {
    image: "/Parnika.jpeg",
    name: "Parnika",
    role: "Co-Head of Multimedia",
    description: "User-focused PM delivering impactful features",
    social: {
      linkedin: "https://linkedin.com/in/lisathompson",
      github: "https://github.com/lisathompson",
      instagram: "https://instagram.com/lisathompson",
    },
  },
  {
    image: "/Orison.jpg",
    name: "Orison",
    role: "Head of Cloud",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/kabirkhanuja.jpeg",
    hoverImage: "/kabirkhanuja2.jpeg",
    name: "Kabir",
    role: "Co-Head of Cloud",
    description: "Bro thinks beyond gpt-d solutions",
    social: {
      linkedin: "https://linkedin.com/in/kabirkhanuja",
      github: "https://github.com/KabirKhanuja",
      instagram: "https://www.instagram.com/kabirkhanuja/",
    },
  },
  {
    image: "/Anush.jpg",
    name: "Anush",
    role: "Head of Execution",
    description: "AI/ML expert turning data into actionable insights",
    social: {
      linkedin: "https://linkedin.com/in/jamespatel",
      github: "https://github.com/jamespatel",
      instagram: "https://instagram.com/jamespatel",
    },
  },
  {
    image: "/riddhi.png",
    name: "Riddhi",
    role: "Co-Head of Execution",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/Shruti.jpg",
    name: "Shruti",
    role: "Head of Content Creation",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/varad.jpeg",
    name: "Varad",
    role: "Co-Head of Content Creation",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/Atharva.png",
    name: "Atharva",
    role: "Head of Finance & Sponsorship",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/Anvay.jpg",
    name: "Anvay",
    role: "Co-Head of Finance & Sponsorship",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/Suhani.jpg",
    name: "Suhani",
    role: "Co-Head of Finance & Sponsorship",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/Sahil.jpg",
    name: "Sahil",
    role: "Head of Publicity & Outreach",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    image: "/Ab.jpg",
    name: "Aditya",
    role: "Co-Head of Publicity & Outreach",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    image: "/S.jpg",
    name: "Sarvadnya",
    role: "Head of Artficial Intelligence & Machine Learning",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    image: "/M.png",
    name: "Mahendrakumar",
    role: "Co-Head of Artficial Intelligence & Machine Learning",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/Pallav.jpg",
    name: "Pallav",
    role: "Head of Web Developement",
    description: "React specialist crafting performant interfaces",
    social: {
      linkedin: "https://linkedin.com/in/annamuller",
      github: "https://github.com/annamuller",
      instagram: "https://instagram.com/annamuller",
    },
  },
  {
    image: "/Vedant.jpg",
    name: "Vedant",
    role: "Co-Head of Web Developement",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    image: "/Animesh.jpg",
    name: "Animesh",
    role: "Head of App Developement",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    image: "/ritik.jpg",
    name: "Ritik",
    role: "Co-Head of App Developement",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    image: "/Imran.png",
    name: "Imran",
    role: "Head of Web3",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    image: "Swanandi.jpg",
    name: "Swanandi",
    role: "Co-Head of Web3",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
]

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollDistance, setScrollDistance] = useState(0)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  /* ---------- CALCULATE SCROLL WIDTH ---------- */
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!track || !section) return

    const calc = () => {
      const sectionWidth = section.clientWidth || window.innerWidth
      // ensure non-negative and add small padding so the last card is fully visible
      const distance = Math.max(track.scrollWidth - sectionWidth + 40, 0)
      setScrollDistance(distance)
    }

    // initial calculation and a delayed re-calc to allow images to load
    calc()
    const timeoutId = window.setTimeout(calc, 500)

    // recalc on resize and once window finishes loading
    window.addEventListener("resize", calc)
    window.addEventListener("load", calc)

    // observe content size changes (images loading, dynamic content)
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(calc)
      ro.observe(track)
    }

    return () => {
      window.removeEventListener("resize", calc)
      window.removeEventListener("load", calc)
      if (ro) ro.disconnect()
      window.clearTimeout(timeoutId)
    }
  }, [])

  /* ---------- GSAP PIN + SCROLL ---------- */
  useEffect(() => {
    if (!scrollDistance) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let ctx: any

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }, section)
    }

    init()
    return () => ctx && ctx.revert()
  }, [scrollDistance])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 z-10 pt-8 pb-4">
        <div className="pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white">
            Meet Our Team
          </h2>
          <p className="text-center text-white/70 mt-4 text-lg">
            The brilliant minds behind our success
          </p>
        </div>
      </div>

      {/* ---------- TRACK ---------- */}
      <div className="h-full flex items-center relative z-0">
        <div
          ref={trackRef}
          className="flex gap-8 pl-8 will-change-transform"
          style={{ paddingRight: "100vw", paddingTop: "80px" }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              onClick={() => {
                if ((member.name === "Kabir" || member.name === "Aditya Bhattacharya") && window.innerWidth < 768) {
                  setActiveCard(activeCard === index ? null : index)
                }
              }}
              className={`
                relative z-20 pointer-events-auto
                flex-shrink-0
                w-[380px] h-[500px]
                bg-white/10 backdrop-blur-xl
                border border-white/20
                rounded-3xl overflow-hidden
                transition-all duration-300
                hover:-translate-y-3
                hover:border-white/40
                hover:bg-white/15
                group
                ${member.name === "Kabir"
                  ? "hover:shadow-2xl hover:shadow-blue-500/40 hover:border-blue-400/60 md:cursor-pointer"
                  : "hover:shadow-2xl hover:shadow-white/10"
                }
                ${activeCard === index && member.name === "Kabir" ? "-translate-y-3 bg-white/15 shadow-2xl shadow-blue-500/40 border-blue-400/60" : ""}
              `}
            >
              {/* Number */}
              <div className="absolute top-6 right-6 z-30">
                <span className="text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-[260px] overflow-hidden">
                {member.hoverImage ? (
                  member.name === "Kabir" ? (
                    <>
                      <Image
                        src={member.image}
                        alt="Kabir Khanuja - Co-Head of Cloud at GDG, Google Developer Groups VIT Pune"
                        fill
                        className={`object-cover transition-all duration-500 ${activeCard === index ? "opacity-0 scale-110" : "group-hover:opacity-0 group-hover:scale-110"
                          }`}
                      />
                      <Image
                        src={member.hoverImage}
                        alt="Kabir Khanuja - Co-Head of Cloud at GDG, Google Developer Groups cloud technology expert"
                        fill
                        className={`object-cover transition-all duration-500 ${activeCard === index ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100 group-hover:scale-110"
                          }`}
                      />
                    </>
                  ) : (
                    // Aditya (or other members with hoverImage): slide-in crossfade (differs from Kabir)
                    <>
                      <Image
                        src={member.image}
                        alt={`${member.name}`}
                        fill
                        className={`object-cover transition-all duration-500 transform ${activeCard === index ? "opacity-0 -translate-x-4" : "group-hover:opacity-0 group-hover:-translate-x-4"
                          }`}
                      />
                      <Image
                        src={member.hoverImage}
                        alt={`${member.name} (alternate)`}
                        fill
                        className={`object-cover transition-all duration-500 transform ${activeCard === index ? "opacity-100 translate-x-0" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4"
                          }`}
                      />
                    </>
                  )
                ) : (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col h-60 relative z-20">
                <h3
                  className={`text-2xl font-bold mb-2 transition-all duration-300 ${member.name === "Kabir"
                      ? activeCard === index
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.35)]"
                        : "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:via-blue-500 group-hover:to-indigo-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.35)]"
                      : "text-white"
                    }`}
                >
                  {member.name}
                </h3>
                <p className="text-sm uppercase tracking-wider text-white/80 mb-4">
                  {member.role}
                </p>
                <p className="text-white/60 mb-6">
                  {member.description}
                </p>

                <div className="mt-auto flex items-end justify-between">
                  <div className="h-1 w-12 bg-white/30 rounded-full group-hover:w-24 transition-all" />

                  {/* icons */}
                  <div className="flex gap-3">
                    {[
                      { Icon: Linkedin, url: member.social.linkedin, label: "LinkedIn", groupHoverColor: "group-hover:text-[#0A66C2]" },
                      { Icon: Github, url: member.social.github, label: "GitHub", groupHoverColor: "group-hover:text-purple-400" },
                      { Icon: Instagram, url: member.social.instagram, label: "Instagram", groupHoverColor: "group-hover:text-pink-500" },
                    ].map(({ Icon, url, label, groupHoverColor }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="
                          relative z-30
                          w-9 h-9
                          rounded-full
                          bg-white/10
                          border border-white/20
                          flex items-center justify-center
                          transition-all duration-300
                          hover:bg-white/20
                          hover:border-white/40
                          hover:-translate-y-1
                          hover:scale-110
                          hover:shadow-lg hover:shadow-white/20
                        "
                      >
                        <Icon className={`w-4 h-4 transition-colors ${member.name === "Kabir" && activeCard === index
                            ? label === "LinkedIn" ? "text-[#0A66C2]"
                              : label === "GitHub" ? "text-purple-400"
                                : "text-pink-500"
                            : `text-white ${member.name === "Kabir" ? groupHoverColor : ""}`
                          }`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
