import Image from "next/image"
import { GlowLine } from "@/components/glow-line"
import { CheckCheck } from "lucide-react"
import { FloatingImage } from "@/components/floating-image"
import { ProgressIndicator } from "@/components/progress-indicator"
import { AnimatedHighlight } from "@/components/animated-highlight"

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Dark Section with Background Image */}
      <div className="relative w-full">
        {/* Background Image - Only covers the top section */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue%20backround-UKinBTxz4mw2KNtVrAyqWAHWSJGOE9.png"
            alt="Background"
            fill
            priority
            className="object-cover"
            quality={100}
          />
        </div>

        {/* Content Container for Dark Section */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8">
          {/* Main Content */}
          <div className="w-full flex flex-col items-center text-center mt-4 md:mt-8">
            {/* Glowing Line Above Header */}
            <GlowLine />

            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-poppins">
                <span className="block mb-2">Unlock The Greek God</span>
                <span className="block">Physique Formula</span>
              </h1>

              <div className="flex items-center space-x-4 text-2xl md:text-3xl lg:text-4xl text-white font-poppins">
                <span className="text-white/80">—</span>
                <span>Without Wasting Years On Trial And Error</span>
              </div>
            </div>

            <p className="text-xl md:text-1xl text-gray-400 italic mb-8 max-w-1xl mt-8">
              (i achieved my dream phisique in under a year with this program)
            </p>

            {/* Video Placeholder */}
            <div className="w-full max-w-3xl mx-auto mb-8 rounded-xl overflow-hidden border-4 border-gray-700 aspect-video bg-black/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-blue-500/80 flex items-center justify-center cursor-pointer">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-gradient-to-r from-[#2980b9] to-[#16e2b5] text-white px-12 py-4 text-xl font-bold rounded-md mx-auto inline-block mb-2 shadow-[0_0_20px_rgba(22,226,181,0.7)] hover:shadow-[0_0_30px_rgba(22,226,181,1)] hover:scale-105 transition-all duration-300">
              YES! GIVE ME ACCESS NOW
            </button>

            <p className="text-gray-400 text-sm italic mb-16">
              Lock-in access at the discounted price before it goes up
            </p>

            {/* Glowing Line Above benefits */}
            <GlowLine />

            {/* New Benefits Bar */}
            <div className="w-full py-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-3">
                <CheckCheck className="text-[#34d399] w-5 h-5" />
                <span className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                  No Expensive Supplements Required
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCheck className="text-[#34d399] w-5 h-5" />
                <span className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                  Without Spending Hours In The Gym
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCheck className="text-[#34d399] w-5 h-5" />
                <span className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                  Without Previous Experience
                </span>
              </div>
            </div>

            {/* Glowing Line Below benefits */}
            <GlowLine />
          </div>
        </div>

        {/* Gradient Fade to White */}
        <div className="relative z-10 w-full h-32 bg-gradient-to-b from-transparent to-white"></div>
      </div>

      {/* White Section */}
      <div className="w-full bg-white py-16">
        <div className="max-w-xl mx-auto px-6 font-['Inter',sans-serif] text-black">
          {/* Main Heading - Centered, Bold, Shadowed */}
          <h2 className="text-4xl font-bold text-center mb-16 text-black font-clash heading-shadow">
            Have you ever wondered...
          </h2>

          <div className="space-y-10 text-left">
            <p className="text-xl leading-relaxed">
              Why does it seem like everyone else is achieving their dream physiques except me?!
            </p>

            <p className="text-xl leading-relaxed">I've tried everything, but nothing is working!</p>

            <p className="text-xl leading-relaxed">
              <AnimatedHighlight>What's the real secret the fitness influencers aren't telling me?!</AnimatedHighlight>
            </p>

            <p className="text-xl leading-relaxed">If that's you rn...</p>

            <p className="text-xl font-bold underline">I've got your back brother.</p>

            <p className="text-xl leading-relaxed">
              In the next few minutes I'm gonna reveal the exact program that brought me from skinny fat to my dream
              physique in less than a year.
            </p>

            <p className="text-xl font-bold">
              <AnimatedHighlight>
                The same program that has helped hundreds of people just like you build the body they've always wanted,
                but never knew how to achieve.
              </AnimatedHighlight>
            </p>

            <p className="text-xl leading-relaxed">And to be honest...</p>

            <p className="text-xl leading-relaxed">It's not even complicated...</p>

            <p className="text-xl leading-relaxed">It's a very simple program.</p>

            <p className="text-xl leading-relaxed">
              Despite what fitness influencers have told you, you <span className="font-bold">DON'T</span> achieve your
              dream body by...
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 text-red-500 text-xl">❌</div>
                <p className="text-xl leading-relaxed">
                  Following every "shiny new" fitness trend.
                  <br />
                  <span className="text-gray-600">
                    (Don't fall for the 75 Hard, Keto Detox, or TikTok workout challenges)
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 text-red-500 text-xl">❌</div>
                <p className="text-xl leading-relaxed">
                  Wasting hours on random YouTube routines.
                  <br />
                  <span className="text-gray-600">
                    (Just because it gets tons of views doesn't mean the routines are actually useful...)
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 text-red-500 text-xl">❌</div>
                <p className="text-xl leading-relaxed">
                  Hoping on gear.
                  <br />
                  <span className="text-gray-600">(I think this goes without saying)</span>
                </p>
              </div>
            </div>

            <p className="text-xl font-bold underline">Forget all that.</p>

            <p className="text-xl font-bold underline">Imma be real with you...</p>

            <p className="text-xl leading-relaxed">
              If you haven't been able to look how you want it's probably because you have analysis paralysis from
              having too much information online.
            </p>

            <p className="text-xl leading-relaxed">
              I can guarantee you that if you block out all the noise and follow this simple program you'll look exactly
              how you want and more.
            </p>
          </div>
        </div>
      </div>

      {/* Light Mint Green Section (#f2fffc) - My Story */}
      <div className="w-full bg-[#f2fffc] py-16">
        <div className="mx-auto px-6 max-w-xl font-['Inter',sans-serif] text-black">
          <h2 className="text-4xl font-bold mb-16 text-center font-clash heading-shadow">My Story</h2>

          <div className="space-y-10 text-left text-xl leading-relaxed">
            <p>As a so-called "hard gainer," all I wanted was to bulk up.</p>

            <p>I was hooked on influencer transformations that promised rapid, jaw-dropping results.</p>

            <p>So I bought their programs...</p>

            <p>Tried their supplements...</p>

            <p>
              Watched their content nonstop.
              <br />I jumped from one plan to the next, hoping to unlock the Hollywood physique.
            </p>

            <p>Until I realized the harsh truth...</p>

            <div className="space-y-2">
              <p>They were all saying the same thing-</p>
              <p>-Same diets.</p>
              <p>-Same training styles.</p>
              <p>-Same sales pitch.</p>
            </div>

            <p>And once I finally saw the common thread behind real, lasting transformations...</p>

            <p>Everything changed.</p>

            <p>Fitness had taken over my life—and not in a good way.</p>

            <p>
              I skipped time with friends to train for 3 hours a day.
              <br />
              Ate bland meals out of Tupperware like a bodybuilder.
            </p>

            <p>
              But I never looked the way I wanted to.
              <br />
              Worse—I developed an injury so bad I couldn't even type without pain.
            </p>

            <p>
              Out of the gym for a full year. Out of shape.
              <br />
              Miserable.
            </p>

            <p>But that wake-up call saved me.</p>

            <p>I was blindly copying enhanced athletes and elite lifters, thinking their routines applied to me.</p>

            <p>
              Truth is—I was still a beginner. Once I dropped the ego and got back to basics, things started to click.
              <br />I ditched the flashy advice...
            </p>

            <p>And started learning from science-backed coaches, not hype machines.</p>

            <p>And finally...</p>

            <p>
              I made real progress.
              <br />I needed the kind of progress I had only dreamed of.
              <br />
              No more falling for "grow your arms in 2 weeks" clickbait.
            </p>

            <p>
              I knew exactly what mattered.
              <br />
              And what didn't.
            </p>

            <p>Fitness influencers thrive on your confusion.</p>

            <p>
              They need you unhappy so you keep buying.
              <br />
              But the truth is simple:
            </p>

            <p>The fundamentals work—if you commit to them.</p>

            <p>
              The fundamentals work—if you commit to them.
              <br />
              That's why I built this.
            </p>

            <p>A no-fluff program covering EVERYTHING you need to achieve your dream physique...</p>

            <div className="pl-8 space-y-2">
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>The routines</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>The diet</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>The mobility</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>...and more</span>
              </p>
            </div>

            <p>
              If I had this workshop earlier,
              <br />I would've saved years of pain, money, and wasted effort.
            </p>

            <p>
              Now I want to pass that clarity on to you.
              <br />
              No BS. No hype. <span className="underline font-medium">Just what actually works.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Black Section with Program Levels and Progress Indicator */}
      <div className="w-full bg-black py-20">
        <div className="mx-auto px-6 max-w-6xl">
          <div className="space-y-8">
            <p className="text-[#30f0c0] text-lg font-bold text-center uppercase tracking-wider letter-spacing-tight">
              LEVEL UP AS YOU GO
            </p>

            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center tracking-tight max-w-3xl mx-auto leading-[1.6] [text-transform:uppercase]">
              YOU PROGRESS IN REAL TIME AND WATCH YOUR PHYSIQUE CHANGE IN FRONT OF YOUR EYES
            </h2>

            <div className="space-y-8 text-white text-xl md:text-2xl max-w-3xl mx-auto mt-8">
              <p>I didn't create this Aesthetic Bodybuilding Program to be something you try once and forget…</p>

              <p>I built it to be a system you come back to—until you sculpt the physique you set out to achieve.</p>

              <p className="font-medium">And we don't stop until you get there.</p>

              <p>
                That's why I built in <span className="font-bold text-[#30f0c0]">LEVELS</span>.
              </p>

              <p>
                The more time and effort you put in, the more you unlock—exclusive workouts, advanced nutrition
                strategies, and rewards that match your progress.
              </p>

              <p className="font-bold italic">This isn't just a program. It's your transformation, leveled up.</p>
            </div>

            {/* Progress Indicator integrated directly in this section with adjusted spacing */}
            <div
              className="mt-20 mb-24 bg-[#071a2e] rounded-xl overflow-hidden pt-[39px] pb-[39px] w-full shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              style={{ height: "auto", maxWidth: "100vw" }}
            >
              <div className="relative w-full overflow-x-hidden">
                <ProgressIndicator />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Black Section at Bottom - Modified with image and frame */}
      <div className="w-full bg-black py-16 relative overflow-hidden">
        <div className="mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Floating Image on the left with transparent background */}
            <div className="md:w-2/5 flex justify-center md:justify-end relative z-10">
              <div className="transform-gpu">
                <FloatingImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/real-RkLWm7oFWqhYrANZmhRtlKWQJXVJ0Y.png"
                  alt="Aesthetic Bodybuilding Program"
                  width={360}
                  height={500}
                />
              </div>
            </div>

            {/* Enhanced modern glowing frame - reduced width */}
            <div className="md:w-3/5 text-white">
              <div className="relative p-8 rounded-[24px] overflow-hidden">
                {/* Background gradient for the frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-[#071a1e] to-black rounded-[24px] opacity-80"></div>

                {/* Animated glow effect */}
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-[#0ff] via-[#0ff] to-[#0ff] opacity-10 animate-pulse-subtle"></div>

                {/* Border gradient */}
                <div className="absolute inset-0 rounded-[24px] p-[2px]">
                  <div className="absolute inset-0 rounded-[22px] bg-gradient-to-r from-[#30f0c0] via-[#00c8ff] to-[#30f0c0]"></div>
                  <div className="absolute inset-[2px] rounded-[20px] bg-black"></div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#30f0c0] rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#30f0c0] rounded-bl-md"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-right font-clash heading-shadow text-white">
                    Ready To Transform?
                  </h2>

                  <div className="space-y-6 text-right">
                    <p className="text-lg md:text-xl leading-relaxed">This is your moment to decide.</p>

                    <p className="text-lg md:text-xl leading-relaxed">
                      Continue struggling with conflicting fitness advice...
                    </p>

                    <p className="text-lg md:text-xl leading-relaxed">
                      <span className="text-gray-400">OR</span>
                    </p>

                    <p className="text-lg md:text-xl leading-relaxed">
                      Follow a proven system that's transformed hundreds of bodies just like yours.
                    </p>

                    <p className="font-bold text-xl md:text-2xl mt-6">The choice is yours.</p>

                    {/* CTA Button */}
                    <div className="flex justify-end mt-6">
                      <button className="bg-gradient-to-r from-[#2980b9] to-[#16e2b5] text-white px-10 py-3 text-lg font-bold rounded-md inline-block mb-2 shadow-[0_0_20px_rgba(22,226,181,0.7)] hover:shadow-[0_0_30px_rgba(22,226,181,1)] hover:scale-105 transition-all duration-300">
                        GET STARTED NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer section remains centered */}
          <div className="mt-20 relative z-10">
            <div className="w-full flex justify-center my-8">
              <div className="w-[80%] h-[2px] rounded-full bg-gradient-to-r from-[rgba(0,255,200,0.01)] via-[rgba(0,255,200,1)] to-[rgba(0,255,200,0.01)] shadow-[0_0_10px_rgba(0,255,200,0.6)]"></div>
            </div>

            <div className="text-center text-gray-400 text-sm">
              <p className="text-center text-gray-400 text-sm italic mb-4">
                Limited time offer - Secure your spot today
              </p>
              © 2023 Greek God Physique Program. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
