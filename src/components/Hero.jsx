import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef(); // Reference to the video element
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Check if device is mobile

  useGSAP(() => {
    // === SPLIT TEXT ANIMATIONS ===
    
    // Split the title into characters and words
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    // Split the subtitle into lines
    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // Add a gradient class to each character of the title
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // Animate title characters from below (slide-up with staggered effect)
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    // Animate subtitle lines from below with fade-in and delay
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    // === PARALLAX SCROLL ANIMATIONS ===
    
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",      // Start animation when hero section enters view
          start: "top top",
          end: "bottom top",
          scrub: true,           // Sync animation with scroll position
        },
      })
      .to(".right-leaf", { y: 200 }, 0) // Move right leaf down
      .to(".left-leaf", { y: -200 }, 0) // Move left leaf up
      .to(".arrow", { y: 100 }, 0);     // Move arrow down

    // === SCROLL-CONTROLLED VIDEO TIMELINE ===

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    // Timeline that will animate video playback with scroll
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video", // Trigger based on the video element
        start: startValue,
        end: endValue,
        scrub: true,      // Allow video to play forward/reverse based on scroll
        pin: true,        // Keep video pinned during the scroll
      },
    });

    // When video is ready (metadata loaded), animate from currentTime 0 to full duration
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []); // Empty dependency array = run once on mount

  return (
    <>
      {/* === HERO SECTION === */}
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        {/* Left and right decorative leaves */}
        <img
          src="/src/assets/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/src/assets/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            {/* Cocktails text and arrow */}
            <div className="flex gap-2">
              <div className="view-cocktails">
                <p className="subtitle">
                  Every cocktail on our menu is a blend of premium ingredients,
                  creative flair, and timeless recipes — designed to delight your senses.
                </p>
                <a href="#cocktails">View cocktails</a>
              </div>

              {/* Down arrow for scroll cue */}
              <img src="/src/assets/images/arrow.png" alt="arrow" className="arrow" />
            </div>
          </div>
        </div>
      </section>

      {/* === BACKGROUND VIDEO === */}
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/src/assets/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
