import React, { Children, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 7;
    const tiltY = (relativeX - 0.5) * -7;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const Bentocard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute top-0 left-0 object-cover size-full object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <h1 className="bento-title special-font">{title}</h1>
        {description && (
          <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="bg-black pb-42">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Master the game, control the battlefield
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            In Valorant, every decision counts. From agent selection to the
            perfect shot, the meta evolves with each update, bringing fresh
            challenges and strategies. Whether you’re outsmarting your opponents
            with precise abilities or dominating with pinpoint accuracy, the
            only way forward is through collaboration and skill. Stay ahead,
            adapt, and shape your playstyle to dominate the arena.
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <Bentocard
            src="videos/Feature 1.mp4"
            title={<>Precision</>}
            description="Watch as an agent takes down opponents with pinpoint accuracy, making every shot count under pressure"
          />
        </BentoTilt>
        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <Bentocard
              src="videos/Feature 2.mp4"
              title={<>Flawless</>}
              description="Witness perfect strategy and execution as every elimination is earned with tactical superiority"
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <Bentocard
              src="videos/Feature 3.mp4"
              title={<>Control</>}
              description="See how this agent thrives in the chaos of battle, using every tool to maintain control and secure the win"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <Bentocard
              src="videos/Feature 4.mp4"
              title={<>Stealth</>}
              description="Silent yet deadly, this agent strikes without warning, leaving no trace but fallen enemies"
            />
          </BentoTilt>

          <div className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                More Coming Soon
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </div>

          <BentoTilt className="bento-tilt_2">
            <video
              src="/videos/Feature 5.mp4"
              loop
              autoPlay
              muted
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
