import TriNit from "../assets/images/Experience/TriNit.jfif";
import acm from '../assets/images/Experience/acm.png';
import appleute from '../assets/images/Experience/appleute.svg';
import flipkart from '../assets/images/Experience/flipkart.png';

import {
    SiAntdesign,
    SiMui,
    SiNestjs,
    SiPostgresql,
    SiPrisma,
    SiPython,
    SiReact,
    SiTypescript
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";


export const EXPERIENCES = [
  {
    organisation: "Flipkart",
    logo: flipkart,
    link: "",
    positions: [
      {
        title: "Full Stack developer",
        duration: "May 2024-Current "
      },
    ],
  },
  {
    organisation: "Freelance",
    logo: appleute,
    link: "",
    positions: [
      {
        title: "Ecommerce Site Developer (Remote)",
        duration: "Jan 2023-May 2024",
        content: [
          {
            text: "Audited and optimized smart contracts to minimize gas costs and improve security posture.",
            tech: [
              {
                id: "f-2",
                icon: SiTypescript,
                name: "TypeScript",
              },
              {
                id: "f-1",
                icon: SiReact,
                name: "ReactJS",
              },
              {
                id: "f-3",
                icon: SiAntdesign,
                name: "Antd",
              },
              {
                id: "f-4",
                icon: TbBrandReactNative,
                name: "React Native",
              },
              {
                id: "f-5",
                icon: SiNestjs,
                name: "NestJS",
              },
              {
                id: "f-6",
                icon: SiPostgresql,
                name: "Postgres",
              },
              {
                id: "f-7",
                icon: SiPrisma,
                name: "Prisma ORM",
              },
            ]
          },
        ],
      },
    ],
  },
  {
    organisation: "CryptoX Labs",
    logo: TriNit,
    link: " ",
    positions: [
      {
        title: "Cryptocurrency Web Developer",
        duration: "Mar 2021-Aug 2022",
        content: [
          {
            text: "Built decentralized apps (dApps) for Ethereum-based tokens and NFT platforms using React and Solidity",
            link: "",
            tech: [
              {
                id: "f-1",
                icon: SiReact,
                name: "ReactJS",
              },
              {
                id: "f-2",
                icon: SiMui,
                name: "Material UI",
              },
            ]
          },
        ],
      },
    ],
  },
  {
    organisation: "TechBridge Agency",
    logo: acm,
    link: "",
    positions: [
      {
        title: "Project Mentor",
        duration: "Sep 2020-Jan 2021",
        content: [
          {
            text: "Implemented Vercel-based CI/CD pipelines for instant preview links and auto-deployments.",
            link: "https://github.com/Amruth-S05/Online-Code-Editor",
          },
        ],
      },
      {
        title: "DSA mentor",
        duration: "Feb-Jun 2020",
        content: [
          {
            text: "Integrated REST and GraphQL APIs with dynamic React UIs and client-side state management.",
            link: "",
          },
        ],
      },
      {
        title: "Project Mentee - Scalable SaaS",
        duration: "Jan-Oct 2019",
        content: [
          {
            text: "Built scalable SaaS dashboards and web portals using Next.js with server-side rendering.",
            link: "",
            tech: [
              {
                id: "f-1",
                icon: SiPython,
                name: "Python"
              }
            ]
          },
        ],
      },
    ],
  },
]