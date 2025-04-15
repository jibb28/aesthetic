"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

export function ProgressIndicator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  // Responsive breakpoints
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isSmallMobile = useMediaQuery("(max-width: 480px)")

  // Track which icons have been reached
  const [iconStates, setIconStates] = useState({
    icon1: { reached: false, active: false },
    icon2: { reached: false, active: false },
    icon3: { reached: false, active: false },
  })

  // Scale factor for the entire component - responsive
  const getScaleFactor = () => {
    if (isDesktop) return 1.3 // 30% increase on desktop
    if (isTablet) return 1.1 // 10% increase on tablet
    return 0.9 // 10% decrease on mobile
  }

  // Calculate dimensions based on screen size
  const [dimensions, setDimensions] = useState({
    containerHeight: 1755,
    lineHeight: 1625,
    iconPositions: {
      icon1: 390,
      icon2: 910,
      icon3: 1430,
    },
    iconSize: 90,
    leftImageWidth: 381,
    leftImageHeight: 254,
    leftImageOffset: -455,
    rightImageWidth: 195,
    rightImageHeight: 98,
    rightContainerWidth: 410,
    rightContainerHeight: 215,
    rightImageOffset: -490,
  })

  // Update dimensions when screen size changes
  useEffect(() => {
    const scaleFactor = getScaleFactor()

    // Base values (original sizes before any scaling)
    const baseValues = {
      containerHeight: 1350,
      lineHeight: 1250,
      iconPositions: {
        icon1: 300,
        icon2: 700,
        icon3: 1100,
      },
      iconSize: 69,
      leftImageWidth: 293,
      leftImageHeight: 195,
      leftImageOffset: -350,
      rightImageWidth: 150,
      rightImageHeight: 75,
      rightContainerWidth: 315,
      rightContainerHeight: 165,
      rightImageOffset: -375,
    }

    // For mobile devices, adjust the image offsets to bring them closer to the center line
    if (isMobile) {
      // Adjust offsets for mobile to bring images closer to the center
      // Increase the offset to move images further from the center line
      baseValues.leftImageOffset = isSmallMobile ? -140 : -220
      baseValues.rightImageOffset = isSmallMobile ? -140 : -220

      // Make images smaller on mobile but maintain aspect ratio
      // Original aspect ratio for left images: 293:195 = 1.5:1
      baseValues.leftImageWidth = isSmallMobile ? 120 : 150
      baseValues.leftImageHeight = isSmallMobile ? 80 : 100 // Maintain aspect ratio

      // Original aspect ratio for right images: 150:75 = 2:1
      baseValues.rightImageWidth = isSmallMobile ? 60 : 80
      baseValues.rightImageHeight = isSmallMobile ? 30 : 40 // Maintain aspect ratio

      // Adjust container sizes to match new image dimensions
      baseValues.rightContainerWidth = isSmallMobile ? 130 : 170
      baseValues.rightContainerHeight = isSmallMobile ? 70 : 90
    }

    // Calculate new dimensions based on scale factor
    setDimensions({
      containerHeight: Math.round(baseValues.containerHeight * scaleFactor),
      lineHeight: Math.round(baseValues.lineHeight * scaleFactor),
      iconPositions: {
        icon1: Math.round(baseValues.iconPositions.icon1 * scaleFactor),
        icon2: Math.round(baseValues.iconPositions.icon2 * scaleFactor),
        icon3: Math.round(baseValues.iconPositions.icon3 * scaleFactor),
      },
      iconSize: Math.round(baseValues.iconSize * scaleFactor),
      leftImageWidth: Math.round(baseValues.leftImageWidth * scaleFactor),
      leftImageHeight: Math.round(baseValues.leftImageHeight * scaleFactor),
      leftImageOffset: Math.round(baseValues.leftImageOffset * scaleFactor),
      rightImageWidth: Math.round(baseValues.rightImageWidth * scaleFactor),
      rightImageHeight: Math.round(baseValues.rightImageHeight * scaleFactor),
      rightContainerWidth: Math.round(baseValues.rightContainerWidth * scaleFactor),
      rightContainerHeight: Math.round(baseValues.rightContainerHeight * scaleFactor),
      rightImageOffset: Math.round(baseValues.rightImageOffset * scaleFactor),
    })
  }, [isDesktop, isTablet, isMobile, isSmallMobile])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !progressLineRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Start line movement earlier - when container is approaching viewport
      // We'll use an offset to start the animation before the container is fully in view
      const earlyStartOffset = dimensions.iconPositions.icon1 * 1.3

      // If container is too far away, return
      if (rect.top > windowHeight + earlyStartOffset) {
        return
      }

      // Calculate the visible portion of the container with the early start offset
      const containerTop = rect.top - earlyStartOffset
      const containerHeight = container.offsetHeight
      const viewportHeight = window.innerHeight

      // Calculate how far we've scrolled through the container
      let scrolledPixels = 0

      if (containerTop <= 0) {
        // Container top is above viewport (with offset)
        scrolledPixels = Math.abs(containerTop)
      } else {
        // Container top is approaching viewport
        scrolledPixels = 0
      }

      // Apply a multiplier to make the line grow at a slower initial rate
      const initialGrowthMultiplier = 1.2 // Reduced from 1.5 to make it start slower

      // Calculate the current progress line height (in pixels)
      // This represents how far the line has grown down from the top
      const progressLineHeight = Math.min(dimensions.lineHeight, Math.max(0, scrolledPixels * initialGrowthMultiplier))

      // Update the progress line height with a smooth transition
      progressLineRef.current.style.height = `${progressLineHeight}px`

      // Check if the line has reached each icon
      const newIconStates = { ...iconStates }

      // Icon 1
      if (progressLineHeight >= dimensions.iconPositions.icon1) {
        if (!newIconStates.icon1.reached) {
          newIconStates.icon1.reached = true
          newIconStates.icon1.active = true
          activateIcon(icon1Ref, image1Ref, rightImages1Ref)
        }
      } else {
        if (newIconStates.icon1.reached) {
          newIconStates.icon1.reached = false
          newIconStates.icon1.active = false
          deactivateIcon(icon1Ref, image1Ref, rightImages1Ref)
        }
      }

      // Icon 2
      if (progressLineHeight >= dimensions.iconPositions.icon2) {
        if (!newIconStates.icon2.reached) {
          newIconStates.icon2.reached = true
          newIconStates.icon2.active = true
          activateIcon(icon2Ref, image2Ref, rightImages2Ref)
        }
      } else {
        if (newIconStates.icon2.reached) {
          newIconStates.icon2.reached = false
          newIconStates.icon2.active = false
          deactivateIcon(icon2Ref, image2Ref, rightImages2Ref)
        }
      }

      // Icon 3
      if (progressLineHeight >= dimensions.iconPositions.icon3) {
        if (!newIconStates.icon3.reached) {
          newIconStates.icon3.reached = true
          newIconStates.icon3.active = true
          activateIcon(icon3Ref, image3Ref, rightImages3Ref)
        }
      } else {
        if (newIconStates.icon3.reached) {
          newIconStates.icon3.reached = false
          newIconStates.icon3.active = false
          deactivateIcon(icon3Ref, image3Ref, rightImages3Ref)
        }
      }

      // Update icon states if changed
      if (JSON.stringify(newIconStates) !== JSON.stringify(iconStates)) {
        setIconStates(newIconStates)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [iconStates, dimensions])

  // Helper functions for icon activation/deactivation
  const activateIcon = (
    iconRef: React.RefObject<HTMLDivElement>,
    imageRef: React.RefObject<HTMLDivElement>,
    rightImagesRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (iconRef.current) {
      iconRef.current.classList.add("active")
      iconRef.current.style.transform = "scale(1.2) translate(-50%, -50%)"
      iconRef.current.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
    }

    if (imageRef.current) {
      imageRef.current.classList.add("active-content")
      imageRef.current.style.opacity = "1"
      // Adjust the animation based on screen size
      const xOffset = isMobile ? "10px" : "20px"
      imageRef.current.style.transform = `translateY(-50%) translateX(${xOffset})`
      imageRef.current.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
    }

    if (rightImagesRef.current) {
      rightImagesRef.current.classList.add("active-content")
      rightImagesRef.current.style.opacity = "1"
      // Adjust the animation based on screen size
      const xOffset = isMobile ? "-10px" : "-20px"
      rightImagesRef.current.style.transform = `translateY(-50%) translateX(${xOffset})`
      rightImagesRef.current.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
    }
  }

  const deactivateIcon = (
    iconRef: React.RefObject<HTMLDivElement>,
    imageRef: React.RefObject<HTMLDivElement>,
    rightImagesRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (iconRef.current) {
      iconRef.current.classList.remove("active")
      iconRef.current.style.transform = "scale(1) translate(-50%, -50%)"
    }

    if (imageRef.current) {
      imageRef.current.classList.remove("active-content")
      imageRef.current.style.opacity = "0.5"
      imageRef.current.style.transform = "translateY(-50%) translateX(0)"
    }

    if (rightImagesRef.current) {
      rightImagesRef.current.classList.remove("active-content")
      rightImagesRef.current.style.opacity = "0.5"
      rightImagesRef.current.style.transform = "translateY(-50%) translateX(0)"
    }
  }

  // Refs for DOM elements
  const icon1Ref = useRef<HTMLDivElement>(null)
  const icon2Ref = useRef<HTMLDivElement>(null)
  const icon3Ref = useRef<HTMLDivElement>(null)
  const image1Ref = useRef<HTMLDivElement>(null)
  const image2Ref = useRef<HTMLDivElement>(null)
  const image3Ref = useRef<HTMLDivElement>(null)
  const rightImages1Ref = useRef<HTMLDivElement>(null)
  const rightImages2Ref = useRef<HTMLDivElement>(null)
  const rightImages3Ref = useRef<HTMLDivElement>(null)

  // For very small mobile screens, simplify the right side images
  const showSimplifiedRightImages = isSmallMobile

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ height: `${dimensions.containerHeight}px` }}>
      <div
        className="absolute top-0 left-1/2 bg-gray-700 transform -translate-x-1/2 mt-[20px]"
        style={{ width: "3px", height: `${dimensions.lineHeight}px` }}
      >
        {/* Progress Line - This is the animated line that grows */}
        <div
          ref={progressLineRef}
          className="absolute top-0 left-0 w-full bg-[#30f0c0] transition-all duration-300 ease-out"
          style={{
            height: "0px",
            boxShadow: isMobile
              ? "0 0 8px rgba(48, 240, 192, 0.6), 0 0 16px rgba(48, 240, 192, 0.3)"
              : "0 0 13px rgba(48, 240, 192, 0.6), 0 0 26px rgba(48, 240, 192, 0.3)",
          }}
        ></div>

        {/* Icons - replaced with custom badge icons */}
        <div
          ref={icon1Ref}
          className="absolute left-0 z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{
            top: `${dimensions.iconPositions.icon1}px`,
            width: `${dimensions.iconSize}px`,
            height: `${dimensions.iconSize}px`,
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/49a16c0f-9c50-4eb5-afb9-88ebb21966f1-Zjucdmbz8l4UI4zleiSgmTc41wdfHC.png"
            alt="Bronze Key - Beginner Level"
            width={dimensions.iconSize}
            height={dimensions.iconSize}
            className="w-full h-full object-contain"
          />
        </div>

        <div
          ref={icon2Ref}
          className="absolute left-0 z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{
            top: `${dimensions.iconPositions.icon2}px`,
            width: `${dimensions.iconSize}px`,
            height: `${dimensions.iconSize}px`,
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8e3595a5-482e-4e6a-ab6b-d023d0b6b13c-AZ8xCjA22RN1XSbDCT7gnAY5m58hXg.png"
            alt="Silver Tools - Intermediate Level"
            width={dimensions.iconSize}
            height={dimensions.iconSize}
            className="w-full h-full object-contain"
          />
        </div>

        <div
          ref={icon3Ref}
          className="absolute left-0 z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{
            top: `${dimensions.iconPositions.icon3}px`,
            width: `${dimensions.iconSize}px`,
            height: `${dimensions.iconSize}px`,
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c18c3ec-047a-4044-9a6e-f5e8a0bf06f5-iWQTquG4jmDYROUqrlVHftJLmaZ4bp.png"
            alt="Gold Arrows - Advanced Level"
            width={dimensions.iconSize}
            height={dimensions.iconSize}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Left Images */}
        <>
          <div
            ref={image1Ref}
            className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
            style={{
              left: `${dimensions.leftImageOffset}px`,
              top: `${dimensions.iconPositions.icon1}px`,
              width: `${dimensions.leftImageWidth}px`,
              height: `${dimensions.leftImageHeight}px`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a6cad12c-676a-4e7e-955d-dfa70693b517-KhwDRtAw7zb7kS5SAIxQYcSv5Hh57t.png"
                alt="1 Month Beginner"
                fill
                sizes={`${dimensions.leftImageWidth}px`}
                className="object-contain border-3 border-[#30f0c0] rounded-md"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <div
            ref={image2Ref}
            className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
            style={{
              left: `${dimensions.leftImageOffset}px`,
              top: `${dimensions.iconPositions.icon2}px`,
              width: `${dimensions.leftImageWidth}px`,
              height: `${dimensions.leftImageHeight}px`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/acb9c1fa-a51b-44d4-9c95-ba4723a16b9a-lY1VAmv3WXcsL7WWvLqEYpOxZ6yxsm.png"
                alt="2 Months Intermediate"
                fill
                sizes={`${dimensions.leftImageWidth}px`}
                className="object-contain border-3 border-[#30f0c0] rounded-md"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <div
            ref={image3Ref}
            className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
            style={{
              left: `${dimensions.leftImageOffset}px`,
              top: `${dimensions.iconPositions.icon3}px`,
              width: `${dimensions.leftImageWidth}px`,
              height: `${dimensions.leftImageHeight}px`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9b071dfe-62d1-455f-a671-eca34be302c1-kR4xOFHFgmk8ZvaMwE63qQDfBWZ3W5.png"
                alt="3 Months Greek God"
                fill
                sizes={`${dimensions.leftImageWidth}px`}
                className="object-contain border-3 border-[#30f0c0] rounded-md"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </>

        {/* Right Images - Simplified version for small mobile screens */}
        {showSimplifiedRightImages ? (
          <>
            <div
              ref={rightImages1Ref}
              className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
              style={{
                right: `${dimensions.rightImageOffset}px`,
                top: `${dimensions.iconPositions.icon1}px`,
                width: `${dimensions.rightImageWidth}px`,
                height: `${dimensions.rightImageHeight}px`,
              }}
            >
              <div className="relative w-full h-full border-3 border-[#30f0c0] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bronze-uYOZesv6qfrUZE7MjoQLnduN1kBS8p.png"
                  alt="Bronze Badge"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
            </div>

            <div
              ref={rightImages2Ref}
              className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
              style={{
                right: `${dimensions.rightImageOffset}px`,
                top: `${dimensions.iconPositions.icon2}px`,
                width: `${dimensions.rightImageWidth}px`,
                height: `${dimensions.rightImageHeight}px`,
              }}
            >
              <div className="relative w-full h-full border-3 border-[#30f0c0] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-eQbEmbWFZQpTZEEjGoW7pfVJwmI88D.png"
                  alt="Silver Tools Badge"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
            </div>

            <div
              ref={rightImages3Ref}
              className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
              style={{
                right: `${dimensions.rightImageOffset}px`,
                top: `${dimensions.iconPositions.icon3}px`,
                width: `${dimensions.rightImageWidth}px`,
                height: `${dimensions.rightImageHeight}px`,
              }}
            >
              <div className="relative w-full h-full border-3 border-[#30f0c0] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-4B9LYm5LugknSazj8hYQrZlefTZgke.png"
                  alt="Gold Arrows Badge"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              ref={rightImages1Ref}
              className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
              style={{
                right: `${dimensions.rightImageOffset}px`,
                top: `${dimensions.iconPositions.icon1}px`,
                width: `${dimensions.rightContainerWidth}px`,
                height: `${dimensions.rightContainerHeight}px`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bronze-uYOZesv6qfrUZE7MjoQLnduN1kBS8p.png"
                  alt="Bronze Badge"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-wsBQvjUc10YnEdfC5aqYFLvldgo2H8.jpeg"
                  alt="Skinny Before"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-69WG4dVq3RX5pRObpm2wYNdqrMouXN.jpeg"
                  alt="Normal Before"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
            </div>

            <div
              ref={rightImages2Ref}
              className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
              style={{
                right: `${dimensions.rightImageOffset}px`,
                top: `${dimensions.iconPositions.icon2}px`,
                width: `${dimensions.rightContainerWidth}px`,
                height: `${dimensions.rightContainerHeight}px`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-eQbEmbWFZQpTZEEjGoW7pfVJwmI88D.png"
                  alt="Silver Tools Badge"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-UP0g6n7FJG2hMnQOWEoX627iFbBUuB.jpeg"
                  alt="Back Muscles Progress"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/t-RfwzakHRwX0HWVBbg21eWtP0wQjyzM.jpeg"
                  alt="Back Muscles Pullup"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
            </div>

            <div
              ref={rightImages3Ref}
              className="absolute transition-all duration-500 transform -translate-y-1/2 opacity-50 overflow-visible"
              style={{
                right: `${dimensions.rightImageOffset}px`,
                top: `${dimensions.iconPositions.icon3}px`,
                width: `${dimensions.rightContainerWidth}px`,
                height: `${dimensions.rightContainerHeight}px`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-4B9LYm5LugknSazj8hYQrZlefTZgke.png"
                  alt="Gold Arrows Badge"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3f761352db5be368afe2f8b630153506.jpg-srBV8O7mnAqIbsOOm0UV7YElHaZdH7.jpeg"
                  alt="Muscular Back"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 border-3 border-[#30f0c0] rounded-lg overflow-hidden"
                style={{
                  width: `${dimensions.rightImageWidth}px`,
                  height: `${dimensions.rightImageHeight}px`,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e29f965c4e1763a5ae75af00d0be4072.jpg-c1inoceDkLnYCZ2luEm2qno5xIpn0n.jpeg"
                  alt="Greek God Physique"
                  fill
                  sizes={`${dimensions.rightImageWidth}px`}
                  className="object-cover"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add custom styles for active class with responsive adjustments */}
      <style jsx>{`
        .active {
          filter: ${
            isMobile
              ? "drop-shadow(0 0 15px rgba(64, 224, 208, 0.8)) drop-shadow(0 0 25px rgba(64, 224, 208, 0.4))"
              : "drop-shadow(0 0 20px rgba(64, 224, 208, 0.8)) drop-shadow(0 0 39px rgba(64, 224, 208, 0.4))"
          };
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            filter: ${
              isMobile
                ? "drop-shadow(0 0 15px rgba(64, 224, 208, 0.8)) drop-shadow(0 0 25px rgba(64, 224, 208, 0.4))"
                : "drop-shadow(0 0 20px rgba(64, 224, 208, 0.8)) drop-shadow(0 0 39px rgba(64, 224, 208, 0.4))"
            };
          }
          50% { 
            filter: ${
              isMobile
                ? "drop-shadow(0 0 25px rgba(64, 224, 208, 1)) drop-shadow(0 0 35px rgba(64, 224, 208, 0.6))"
                : "drop-shadow(0 0 33px rgba(64, 224, 208, 1)) drop-shadow(0 0 52px rgba(64, 224, 208, 0.6))"
            };
          }
        }
        
        .active {
          animation: pulseGlow 2s infinite;
        }
        
        .active-content {
          filter: ${
            isMobile
              ? "drop-shadow(0 0 8px rgba(48, 240, 192, 0.5)) drop-shadow(0 0 16px rgba(48, 240, 192, 0.3))"
              : "drop-shadow(0 0 13px rgba(48, 240, 192, 0.5)) drop-shadow(0 0 26px rgba(48, 240, 192, 0.3))"
          };
        }
      `}</style>
    </div>
  )
}
