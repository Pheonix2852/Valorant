import React, { useRef, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all"; // Import ScrollTrigger
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const Story = () => {
  const storyUrl = "https://valorant.fandom.com/wiki/VALORANT_Lore";
  const frameRef = useRef(null);

  useEffect(() => {
    // Trigger animation when the element comes into view
    gsap.fromTo(
      ".animated-title", // Targeting the AnimatedTitle class
      {
        opacity: 0,
        y: 50, // Start from a lower position
      },
      {
        opacity: 1,
        y: 0, // Move to normal position
        duration: 1.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".animated-title", // Element to trigger animation on scroll
          start: "top 80%", // Trigger when 80% of the element is in view
          end: "bottom top", // End when the element leaves the viewport
          scrub: true, // Smoothly follow the scroll position
        },
      }
    );
  }, []);

  const handleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          The Realm of Valorant
        </p>
        <div className="relative size-full">
          <AnimatedTitle
            title="Where legends clash, <br />and Destiny awaits"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 animated-title"
          ></AnimatedTitle>
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  ref={frameRef}
                  src="/img/World.jpeg"
                  alt="world"
                  className="object-contain"
                />
              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              In a world where the stakes are nothing short of life or death,
              Valorant is a realm where the fiercest warriors clash, and the
              greatest minds are tested. Elite agents from across the globe,
              each armed with extraordinary abilities, fight not just for
              victory, but for the future of humanity. Behind every mission lies
              a deeper, hidden war—one of espionage, deception, and power beyond
              imagination. As rival factions battle to control the mysterious
              Radiants, only the most skilled and daring will rise. Will you
              stand as a hero, or be consumed by the chaos? Welcome to the world
              of Valorant, where every move, every shot, and every decision
              could change the course of history forever.
            </p>
            <Button
              id="realm-button"
              title="Discover story"
              containerClass="mt-5"
              url={storyUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
