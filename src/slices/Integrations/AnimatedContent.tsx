"use client";
import React, { Fragment, useRef } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "@/hook/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import StylizedLogoMark from "./StylizedLogoMark";
import { Content } from "@prismicio/client";
import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFigma,
  FaFly,
} from "react-icons/fa6";
import { useGSAP } from "@gsap/react";

export default function AnimatedContent({
  slice,
}: {
  slice: Content.IngetrationsSlice;
}) {
  const icons = {
    cloudflare: <FaCloudflare />,
    digitalocean: <FaDigitalOcean />,
    npm: <FaNpm />,
    github: <FaGithub />,
    figma: <FaFigma />,
    fly: <FaFly />,
  };

  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });
      tl.to(".pulsing-logo", {
        keyframes: [
          {
            filter: "brightness(2)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.in",
          },
          {
            filter: "brightness(1)",
            opacity: 0.7,
            duration: 0.9,
          },
        ],
      });
      tl.to(
        ".signal-line",
        {
          keyframes: [
            {
              backgroundPosition: "0% 0%",
            },
            {
              backgroundPosition: "100% 100%",
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
          ],
        },
        "-=1.4",
      );

      tl.to(
        ".pulsing-icon",
        {
          keyframes: [
            {
              opacity: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
            {
              opacity: 0.4,
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
          ],
        },
        "-=2",
      );
    },
    { scope: container },
  );

  return (
    <div
      className="mt-20 flex flex-col items-center md:flex-row"
      ref={container}
    >
      {slice.items.map((item, index) => (
        <Fragment key={index}>
          {index === Math.floor(slice.items.length / 2) && (
            <>
              <StylizedLogoMark />
              <div className="signal-line rotate-180 bg-gradient-to-t" />
            </>
          )}
          <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
            {item.icons && icons[item.icons]}
          </div>
          {index !== slice.items.length - 1 && (
            <div
              className={clsx(
                "signal-line",
                index >= Math.floor(slice.items.length / 2)
                  ? "rotate-180"
                  : "rotate-0",
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
