"use client";
import { useEffect, useState } from "react";
import { HoverEffect } from "./ui/card-hover";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiApollographql,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiCplusplus,
  SiC,
  SiGit,
  SiGithub,
  SiVercel,
  SiThreedotjs,
  SiDocker,
  SiFigma,
  SiRedux,
  SiSass,
} from "react-icons/si";
import { RiArrowDropDownLine } from "react-icons/ri";

interface SkillProps {
  skills: String[];
}

export default function Skills({ skills }: SkillProps) {
  const [icons, setIcons] = useState<string[]>([]);

  useEffect(() => {
    const fetchIconData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ICON_API}`,
        },
      };

      try {
        const iconDataPromises = skills.map(async (skill) => {
          const response = await fetch(
            `https://api.iconfinder.com/v4/icons/search?${skill}&count=1`,
            options
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch icon for skill: ${skill}`);
          }

          const { icons } = await response.json();
          if (icons.length > 0) {
            // Extracting the icon URL for the first icon
            const iconUrl = icons[0].raster_sizes[0].formats[0].preview_url;
            return { name: skill, iconUrl };
          } else {
            throw new Error(`No icon found for skill: ${skill}`);
          }
        });

        // Wait for all requests to complete and store the icon data
        const allIconData: any = await Promise.all(iconDataPromises);
        setIcons(allIconData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIconData();
  }, [skills]);

  const items = [
    {
      title: "React",
      icon: SiReact,
    },
    {
      title: "Next.js",
      icon: SiNextdotjs,
    },
    {
      title: "TailwindCSS",
      icon: SiTailwindcss,
    },
    {
      title: "Node.js",
      icon: SiNodedotjs,
    },
    {
      title: "Express",
      icon: SiExpress,
    },
    {
      title: "MongoDB",
      icon: SiMongodb,
    },
    {
      title: "PostgreSQL",
      icon: SiPostgresql,
    },
    {
      title: "GraphQL",
      icon: SiGraphql,
    },
    {
      title: "Apollo",
      icon: SiApollographql,
    },
    {
      title: "TypeScript",
      icon: SiTypescript,
    },
    {
      title: "JavaScript",
      icon: SiJavascript,
    },
    {
      title: "HTML",
      icon: SiHtml5,
    },
    {
      title: "CSS",
      icon: SiCss3,
    },
    {
      title: "Python",
      icon: SiPython,
    },
    {
      title: "C++",
      icon: SiCplusplus,
    },
    {
      title: "C",
      icon: SiC,
    },
    {
      title: "Git",
      icon: SiGit,
    },
    {
      title: "GitHub",
      icon: SiGithub,
    },
    {
      title: "Docker",
      icon: SiDocker,
    },
    {
      title: "Figma",
      icon: SiFigma,
    },
    {
      title: "Three.js",
      icon: SiThreedotjs,
    },
    {
      title: "Redux",
      icon: SiRedux,
    },
    {
      title: "Sass",
      icon: SiSass,
    },
    {
      title: "Vercel",
      icon: SiVercel,
    },
  ];

  return (
    <div id="skills" className="max-w-5xl mx-auto mt-[20rem] px-8">
      <motion.h1
        className="text-7xl text-center font-bold underline decoration-green-400  underline-offset-8 mt-[15rem] -rotate-6"
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
      >
        Skills
      {/* <div className="bg-red-400 w-full h-2"></div> */}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
      >
        <HoverEffect items={items} />
      </motion.div>
      <a href="#projects">
        <button className="flex mx-auto animate-bounce">
          <RiArrowDropDownLine size={60} />
        </button>
      </a>
    </div>
  );
}
