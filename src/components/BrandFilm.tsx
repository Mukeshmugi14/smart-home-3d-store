import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function BrandFilm() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const tryPlay = () => {
      video.play().catch(() => {
        /* autoplay blocked; video still renders its poster frame muted */
      })
    }

    tryPlay()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <video
        ref={videoRef}
        className="h-[60vh] w-full object-cover sm:h-[70vh]"
        src="https://videos.pexels.com/video-files/7578540/7578540-hd_1280_720_30fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />
      <div className="absolute inset-0 flex items-end sm:items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pb-10 sm:pb-0">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg font-display text-3xl leading-[1.1] text-paper sm:text-4xl lg:text-5xl"
          >
            A room you actually want to
            <span className="italic text-clay"> come home to.</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-sm text-paper/80"
          >
            Every device and furniture piece on Basera is a real 3D model —
            spin it, recolor it, drop it into a room, before it's on its way
            to your door.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
