"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Instagram } from "lucide-react"

const teamMembers = [
  {
    image: "/professional-headshot-man-tech.jpg",
    name: "Aditya Bhattacharya",
    role: "Technical Lead",
    description: "Fellow Font Appreciator",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    image: "/professional-headshot-woman-developer.jpg",
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
    image: "/professional-headshot-man-designer.jpg",
    name: "Aparna Nimishakavi",
    role: "Non Technical Lead",
    description: "Award-winning designer creating beautiful user experiences",
    social: {
      linkedin: "https://linkedin.com/in/marcuswilliams",
      github: "https://github.com/marcuswilliams",
      instagram: "https://instagram.com/marcuswilliams",
    },
  },
  {
    image: "/professional-woman-marketing-headshot.png",
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
    image: "/professional-headshot-man-engineer.jpg",
    name: "Alesha",
    role: "Co-Head of Multimedia",
    description: "Backend specialist building robust infrastructure",
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim",
      instagram: "https://instagram.com/davidkim",
    },
  },
  {
    image: "/professional-headshot-woman-product.jpg",
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
    image: "/professional-headshot-man-data.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
  image: "/professional-headshot-man-tech.jpg",
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
  image: "/professional-headshot-man-tech.jpg",
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
  image: "/professional-headshot-man-tech.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
    image: "/professional-headshot-woman-frontend.jpg",
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
  image: "/professional-headshot-man-tech.jpg",
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
  image: "/professional-headshot-man-tech.jpg",
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
  image: "/professional-headshot-man-tech.jpg",
  name: "Aditya",
  role: "Co-Head of Publicity & Outreach",
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
      {/* ---------- HEADER (NO POINTER BLOCKING) ---------- */}
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
              className="
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
                hover:shadow-2xl hover:shadow-white/10
                group
              "
            >
              {/* Number */}
              <div className="absolute top-6 right-6 z-30">
                <span className="text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col h-[280px] relative z-20">
                <h3 className="text-2xl font-bold text-white mb-2">
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

                  {/* ---------- ICONS ---------- */}
                  <div className="flex gap-3">
                    {[ 
                      { Icon: Linkedin, url: member.social.linkedin, label: "LinkedIn" },
                      { Icon: Github, url: member.social.github, label: "GitHub" },
                      { Icon: Instagram, url: member.social.instagram, label: "Instagram" },
                    ].map(({ Icon, url, label }) => (
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
                        <Icon className="w-4 h-4 text-white" />
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