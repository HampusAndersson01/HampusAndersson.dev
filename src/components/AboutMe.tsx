import React from "react";
import "./styles/AboutMe.css";
import Portrait from "../assets/Portrait tansparent.webp";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <div className="about-me-side-container">
        <div className="image-container">
          <img
            src={Portrait}
            alt="Hampus Andersson"
            className="profile-image"
          />
        </div>
        <div className="social-icons-container">
          <a
            href="https://github.com/HampusAndersson01"
            target="_blank"
            rel="noopener noreferrer"
            id="github-icon"
          >
            <UseAnimations
              animation={github}
              size={64}
              strokeColor="#f0f0f0"
              loop={true}
              speed={0.7}
            ></UseAnimations>
          </a>
          <a
            href="https://www.linkedin.com/in/hampus-a-0957b9140"
            target="_blank"
            rel="noopener noreferrer"
            id="linkedin-icon"
          >
            <UseAnimations
              animation={linkedin}
              size={64}
              strokeColor="#0077cc"
              loop={true}
              speed={0.7}
            ></UseAnimations>
          </a>
        </div>
      </div>
      <div className="text-container">
        <h1>HAMPUS ANDERSSON</h1>
        <p>
          <strong>Software Developer</strong>
        </p>
        <p>
          I am Hampus Andersson, a software developer with a passion for
          technology and a recent graduate from Borås Yrkeshögskola's Software
          Developer .NET program. Currently residing in Varberg, I have recently
          completed an intensive course of study, equipping me with a solid
          foundation in software development and a diverse range of skills.
        </p>
        <p>
          My journey into the world of technology started during my high school
          years, where I delved into various programming languages such as
          Python, HTML, CSS, and PHP. This exploration laid the groundwork for
          my subsequent education, and I continued to build on these skills
          during my time at Peder Skrivares Skola.
        </p>
        <p>
          The culmination of my academic journey was the completion of the
          Software Developer .NET program at Borås Yrkeshögskola from September
          2021 to June 2023. This educational experience provided me with a
          strong background in C#, Javascript, and Typescript, as well as
          practical insights into agile development methodologies.
        </p>
        <p>
          Following my education, I had the opportunity to intern at Volvo
          Powertrain in Gothenburg, where I actively contributed to the
          development of an internal application within a C# development team.
          This internship, from November 2022 to June 2023, not only added
          valuable practical experience to my skill set but also honed my
          ability to thrive in an agile work environment.
        </p>
        <p>
          In addition to my academic and professional experiences, I have been
          employed part-time at Gekås Ullared AB since October 2017, showcasing
          my commitment and ability to balance work responsibilities alongside
          my focused studies.
        </p>
        <p>
          My technical skills include proficiency in programming languages such
          as Python, C#, JavaScript, and Typescript, along with expertise in
          technologies such as React.JS, HTML, PHP, CSS, and MySQL. I am also
          adept at using tools like Word, Excel, and CAD.
        </p>
        <p>
          Fluent in both Swedish and English, I am excited about the prospect of
          contributing my skills to dynamic projects and further developing as a
          software developer. Please feel free to explore my GitHub and LinkedIn
          profiles for a more detailed overview of my work and experiences.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
