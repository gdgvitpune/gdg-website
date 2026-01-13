"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const galleryItems = [
  {
    image: "/jams.png",
    title: "Google Cloud Study Jams",
    description: "Our state-of-the-art workspace designed for creativity",
    category: "Workspace",
  },
  {
    image: "/networking.jpeg",
    title: "Vit Pune & Cummins Networking",
    description: "Building the future together, one sprint at a time",
    category: "Culture",
  },
  {
    image: "/devx.jpg",
    title: "devX Workshop",
    description: "multi-day speaker series",
    category: "Events",
  },
  {
    image: "/web3.jpg",
    title: "Web3",
    description: "Cutting-edge technology powering our solutions",
    category: "Technology",
  },
  {
    image: "/flutter.png",
    title: "Flutter Forge",
    description: "BLOCKCHAIN & CRYPTO",
    category: "Social",
  },
  {
    image: "/team.jpeg",
    title: "Bonding with the Team",
    description: "Connecting with clients across continents",
    category: "Growth",
  },{
    image: "/mog.png",
    title: "Mogging",
    description: "Team Bonding",
    category: "Growth",
  },
]

export function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollDistance, setScrollDistance] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const calculateDistance = () => {
      const trackWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      const distance = Math.max(trackWidth - viewportWidth, 0)
      setScrollDistance(distance)
    }

    // initial + delayed calc for images
    setTimeout(calculateDistance, 100)
    window.addEventListener("resize", calculateDistance)
    window.addEventListener("load", calculateDistance)

    // observe content changes (images added/loaded, DOM updates)
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(calculateDistance)
      ro.observe(track)
    }

    return () => {
      window.removeEventListener("resize", calculateDistance)
      window.removeEventListener("load", calculateDistance)
      if (ro) ro.disconnect()
    }
  }, [])

  useEffect(() => {
    if (scrollDistance === 0) return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let gsap: any
    let ScrollTrigger: any
    let ctx: any

    const initAnimation = async () => {
      const gsapModule = await import("gsap")
      const stModule = await import("gsap/ScrollTrigger")

      gsap = gsapModule.gsap || gsapModule.default
      ScrollTrigger = stModule.ScrollTrigger

      if (!gsap || !ScrollTrigger) {
        console.error("Failed to load GSAP")
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      const findScrollParent = (element: HTMLElement | null): HTMLElement | Window => {
        if (!element) return window
        const style = getComputedStyle(element)
        if (
          style.overflow === "auto" ||
          style.overflow === "scroll" ||
          style.overflowY === "auto" ||
          style.overflowY === "scroll"
        ) {
          return element
        }
        return findScrollParent(element.parentElement)
      }

      const scrollContainer = findScrollParent(section)

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scroller: scrollContainer === window ? undefined : scrollContainer,
            onUpdate: (self: any) => {
              const progress = self.progress
              const index = Math.round(progress * (galleryItems.length - 1))
              setActiveIndex(index)
            },
          },
        })
      }, section)
    }

    initAnimation()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [scrollDistance])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Section Header */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-8 pb-4 pointer-events-none">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white">Gallery</h2>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className="h-full flex items-center pt-24">
        <div
          ref={trackRef}
          className="flex gap-8 will-change-transform"
          style={{ paddingLeft: '100vw', paddingRight: '100vw' }}
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="gallery-slide flex-shrink-0 w-[480px] relative group"
            >
              {/* Main Card */}
              <div className="relative w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/40 hover:shadow-2xl hover:shadow-white/20 hover:bg-white/15">
                
                {/* Image Section */}
                <div className="relative w-full h-[320px] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5">
                      <span className="text-white font-semibold text-xs uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Slide Number on Image */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="text-6xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Text Content Below Image */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative line */}
                  <div className="mt-4">
                    <div className="h-1 w-12 bg-white/40 rounded-full group-hover:w-24 group-hover:bg-white/60 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
        <span className="text-white font-semibold text-sm">
          {String(activeIndex + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  )
}