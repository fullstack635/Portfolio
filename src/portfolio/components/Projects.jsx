import React from "react";
import { PROJECTS } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { motion } from "framer-motion";

const Project = (props) => {
  return (
    <motion.div
      className="proj feature-card hover:text-white p-0 transition-colors duration-300 transform border rounded-xl hover:border-transparent group dark:border-gray-700 dark:hover:border-transparent overflow-hidden"
      whileInView={{ y: [-40, 0], opacity: [0, 1] }}
      transition={{ duration: 1, type: 'spring', stiffness: "120" }}
      whileHover={{
        scale: 1.02,
        zIndex: 5,
        boxShadow: "0 20px 60px rgba(10, 24, 57, 0.35)",
        transition: { duration: 0.35, type: "spring", stiffness: 220, damping: 18 }
      }}
    >
      <div
        className="relative w-full overflow-hidden bg-white/10"
        style={{ aspectRatio: "16 / 9" }}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={props.image}
          alt={props.title}
        />
      </div>

      <div className="pl-8 px-8 sm:px-10 py-6 sm:py-8 flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="text-xl sm:text-2xl font-semibold font-poppins text-gray-200 capitalize">
            {props.title}
          </h1>
          <p className="font-poppins font-normal text-dimWhite">
            Tech Stack
          </p>
          <div className="mt-1 text-gray-500 capitalize dark:text-gray-300 flex flex-wrap gap-5">
            {props.stack.map((tech, index) => (
              <span
                key={tech.id}
                index={index}
                className="text-dimWhite text-[22px] sm:text-[24px] hover:text-[#8dbbeb] tooltip transition-transform duration-200 hover:scale-110"
              >
                {React.createElement(tech.icon)}
                <span className="tooltiptext">{tech.name}</span>
              </span>
            ))}
          </div>
        </div>

        <p className="font-poppins text-[#caddf7] text-base sm:text-lg leading-[30px]">
          {props.content}
        </p>

        <div className="flex items-center gap-5">
          {props.github ? (
            <a href={props.github} target="_blank" rel="noreferrer">
              <AiFillGithub
                size="2.25rem"
                className="text-white hover:text-[#8dbbeb] transition-transform duration-200 hover:scale-110"
              ></AiFillGithub>
            </a>
          ) : (
            ""
          )}
          {props.link ? (
            <a href={props.link} target="_blank" rel="noreferrer">
              <BsLink45Deg
                size="2.25rem"
                className="text-white hover:text-[#8dbbeb] transition-transform duration-200 hover:scale-110"
              ></BsLink45Deg>
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-secondaryLinear sm:px-16 px-6 py-4" >
      <div className="w-full mx-auto">
        <motion.div
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 1, type: 'spring', stiffness: "120" }}
        >
          <h1 className="flex-1 font-Poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
            Projects
          </h1>
        </motion.div>

        <div className="px-0 py-10">
          <div className="grid grid-cols-1 gap-8 mt-8 sm:mt-1 md:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <Project key={project.id} index={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;