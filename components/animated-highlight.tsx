"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AnimatedHighlightProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedHighlight({ children, className = "" }: AnimatedHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <span
      ref={ref}
      className={`relative inline-block italic px-1 py-0.5 ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(106, 253, 187, 0.5) ${isVisible ? "100%" : "0%"}, transparent ${isVisible ? "100%" : "0%"})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        transition: "background-image 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {children}
    </span>
  )
}
