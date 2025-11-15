import ehippo from '../assets/images/Projects/1.png';
import uncover from '../assets/images/Projects/2.png'
import bank from "../assets/images/Projects/6.png";
import bloodBank from '../assets/images/Projects/3.png';
import bookmark from "../assets/images/Projects/5.png";
import expenseTracker from '../assets/images/Projects/12.png';
import gocli from '../assets/images/Projects/7.png';
import keepNotes from "../assets/images/Projects/8.png";
import movieLand from "../assets/images/Projects/9.png";
import npm from '../assets/images/Projects/10.png';
import portfolio from '../assets/images/Projects/11.png';
import videotube from "../assets/images/Projects/4.png";

import {
    AiFillHtml5
} from "react-icons/ai";
import { BsDiamond, BsDroplet } from "react-icons/bs";
import { DiDatabase } from "react-icons/di";
import { FaStripe } from "react-icons/fa";
import { GiDiamondTrophy } from "react-icons/gi";
import { GrDiamond, GrStripe } from "react-icons/gr";
import { RiDrizzleFill, RiDrizzleLine } from "react-icons/ri";
import {
    SiCss3,
    SiDart,
    SiExpress,
    SiFlutter,
    SiGo,
    SiMui,
    SiNextdotjs,
    SiNodedotjs,
    SiNpm,
    SiMongodb,
    SiReact,
    SiRedux,
    SiStripe,
    SiSupabase,
    SiTailwindcss,
    SiVite
} from "react-icons/si";

export const PROJECTS = [
  {
    id: "project-200",
    title: "Shopify_to_WordPress_sitemap_Integration",
    github: "https://github.com/stevenlai530/Shopify_to_WordPress_sitemap_Integrator",
    // link: "https://e-hippo.vercel.app/",
    image: ehippo,
    content:
      "Modern e-commerce platform built with React and Node.js",
    stack: [
      {
        id: "icon-1",
        icon: SiNextdotjs,
        name: "NextJs"
      },
      {
        id: "icon-2",
        icon: SiSupabase,
        name: "Supabase"
      },
      {
        id: "icon-3",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-5",
        icon: BsDroplet,
        name: "Drizzle ORM"
      },
      {
        id: "icon-6",
        icon: SiTailwindcss,
        name: "Tailwind css"
      },
      {
        id: "icon-7",
        icon: GrDiamond,
        name: "Zod"
      },
      {
        id: "icon-8",
        icon: GrStripe,
        name: "Stripe"
      },
    ],
  },
  {
    id: "project-201",
    title: "Crypto Trading Dashboard",
    github: "https://github.com/stevenlai530/ethereum-solidity-course-updated-code",
    // link: "https://un-cover.vercel.app/",
    image: uncover,
    content:
      "Real-time cryptocurrency trading dashboard with advanced charts",
    stack: [
      {
        id: "icon-1",
        icon: SiNextdotjs,
        name: "NextJs"
      },
      {
        id: "icon-3",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-2",
        icon: SiSupabase,
        name: "Supabase"
      },
      {
        id: "icon-6",
        icon: SiTailwindcss,
        name: "Tailwind css"
      },
      {
        id: "icon-5",
        icon: BsDroplet,
        name: "Drizzle ORM"
      },
      {
        id: "icon-7",
        icon: GrDiamond,
        name: "Zod"
      },
      {
        id: "icon-8",
        icon: GrStripe,
        name: "Stripe"
      },
    ],
  },
  {
    id: "project-100",
    title: "Chatbot-flow-builder",
    github: "https://github.com/stevenlai530/Chatbot-flow-builder",
    // link: "https://sbn-bloodbank.onrender.com/",
    image: bloodBank,
    content:
      "This project is a simple React application built with React Flow and next.js . It demonstrates the implementation of drag and drop nodes with the ability to connect them. The state of the nodes and their connections can be saved and restored.",
    stack: [
      {
        id: "icon-1",
        icon: SiMongodb,
        name: "MongoDB"
      },
      {
        id: "icon-2",
        icon: SiExpress,
        name: "Express"
      },
      {
        id: "icon-3",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-4",
        icon: SiNodedotjs,
        name: "Node.js"
      },
    ],
  },
  {
    id: "project-101",
    title: "API Gateway Service",
    github: "https://github.com/Sudhanva-Nadiger/react-leetcode",
    // link: "https://react-leetcode-exampple.vercel.app/",
    image: npm,
    content:
      "Microservices API gateway with authentication and rate limiting",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-2",
        icon: SiTailwindcss,
        name: "Tailwind CSS"
      },
      {
        id: "icon-3",
        icon: SiVite,
        name: "Vite"
      },
      {
        id: "icon-4",
        icon: SiNpm,
        name: "NPM"
      },
    ],
  },
  {
    id: "project-1",
    title: "shopify-cli",
    github: "https://github.com/stevenlai530/shopify-cli",
    // link: "",
    image: bookmark,
    content:
      "Shopify CLI is a command line utility used to perform operations on Shopify stores. It makes doing some typical operations in a store much easier, especially if you're doing dev work.",
    stack: [
      {
        id: "icon-1",
        icon: SiMongodb,
        name: "MongoDB"
      },
      {
        id: "icon-2",
        icon: AiFillHtml5,
        name: "HTML"
      },
      {
        id: "icon-3",
        icon: SiCss3,
        name: "CSS"
      },
      {
        id: "icon-4",
        icon: SiReact,
        name: "React"
      },
    ],
  },
  {
    id: "project-2",
    title: "Solana DeFi App",
    github: "https://github.com/Sudhanva-Nadiger/Modern_Bank_App",
    // link: "https://sudhanva-nadiger.github.io/Modern_Bank_App/index.html",
    image: bank,
    content:
      "Decentralized finance application on Solana blockchain",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-2",
        icon: SiTailwindcss,
        name: "Tailwind CSS"
      },

    ],
  },
  {
    id: "project-3",
    title: "stm-2018.github.io",
    github: "https://github.com/stevenlai530/stm-2018.github.io",
    // link: "",
    image: keepNotes,
    content: "Decentralized finance application on Solana blockchain",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-2",
        icon: SiCss3,
        name: "CSS"
      },

    ],
  },
  {
    id: "project-4",
    title: "React_FrontEnd_Boilerplate-TypeScript",
    github: "https://github.com/stevenlai530/stm-2018.github.io",
    // link: "",
    image: movieLand,
    content:
      "Node.js Boilerplate for Front-End using TypeScript and Next.js (React.js).",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-4",
        icon: SiRedux,
        name: "Redux Toolkit"
      },
      {
        id: "icon-5",
        icon: SiCss3,
        name: "CSS"
      },
    ],
  },
  {
    id: "project-5",
    title: "DevSecOps_Blockchain_App",
    github: "https://github.com/stevenlai530/DevSecOps_Blockchain_App",
    image: gocli,
    content:
      "DevSecOps Blockchain App – Xác Thực Nguồn Gốc Sản Phẩm",
    stack: [
      {
        id: "icon-1",
        icon: SiGo,
        name: "Go"
      },
      {
        id: "icon-3",
        icon: DiDatabase,
        name: "BoltDB"
      },
    ],
  },
  {
    id: "project-7",
    title: "nextjs-blog-react-admin",
    github: "https://github.com/stevenlai530/nextjs-blog-react-admin",
    // link: "https://video-tube-react.netlify.app/",
    image: videotube,
    content:
      "个人博客系统.包括博客页面(next.js),博客后台管理(React)和后端(node.js).本项目提供了一个简洁方便的博客方案,可以让发布和管理博客更加轻松.如果对项目有任何建议和想法,欢迎发起issue.",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-2",
        icon: SiRedux,
        name: "Redux Toolkit"
      },
      {
        id: "icon-3",
        icon: SiMui,
        name: "Redux Toolkit"
      },
    ]
  },
  {
    id: "project-8",
    title: "instalura",
    github: "https://github.com/stevenlai530/instalura",
    // link: "https://sudhanva-nadiger.netlify.app/",
    image: portfolio,
    content:
      "Project of Advanced Front-End Bootcamp from Alura using the JAMStack.",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-2",
        icon: SiTailwindcss,
        name: "Tailwind CSS"
      },
      {
        id: "icon-3",
        icon: SiCss3,
        name: "CSS"
      },
    ],
  },
  {
    id: "project-9",
    title: "Shopify SaaS Clone using WordPress, WooCommerce, WPCS & k8s",
    github: "https://github.com/stevenlai530/wp-shopify-clone",
    // link: "",
    image: expenseTracker,
    content:
      "This is a Shopify Clone build using various technologies to illustrate how easy it is to build SaaS products using WordPress",
    stack: [
      {
        id: "icon-1",
        icon: SiFlutter,
        name: "Flutter"
      },
      {
        id: "icon-2",
        icon: SiDart,
        name: "Dart"
      },
    ],
  },
]