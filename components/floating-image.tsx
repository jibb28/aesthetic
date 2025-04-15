"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface FloatingImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export function FloatingImage({ src, alt, width, height }: FloatingImageProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay to ensure smooth animation start
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      <div
        className={`
          will-change-transform
          floating-element
          transition-opacity duration-1000
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
          quality={100}
          style={{
            filter: "drop-shadow(0 15px 35px rgba(0,255,200,0.5)) drop-shadow(0 5px 15px rgba(0,0,0,0.6))",
          }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}
