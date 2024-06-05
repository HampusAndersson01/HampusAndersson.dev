import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <aside className="sidebar">
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </aside>
      <main className="content">
        <section id="about">
          <h1>Hampus Andersson</h1>
          <h2>Software Developer</h2>
          <p>
            I am Hampus Andersson, a software developer with a passion for
            technology and a recent graduate from Borås Yrkeshögskola's Software
            Developer .NET program. Currently residing in Varberg, I have
            recently completed an intensive course of study, equipping me with a
            solid foundation in software development and a diverse range of
            skills.
          </p>
          <a href="#work" className="button">
            Check out my projects!
          </a>
        </section>
        <section id="experience">
          <h2>Experience</h2>
          <p>
            My journey into the world of technology started during my high
            school years, where I delved into various programming languages such
            as Python, HTML, CSS, and PHP. This exploration laid the groundwork
            for my subsequent education, and I continued to build on these
            skills during my time at Peder Skrivares Skola.
          </p>
          <p>
            The culmination of my academic journey was the completion of the
            Software Developer .NET program at Borås Yrkeshögskola from
            September 2021 to June 2023. This educational experience provided me
            with a strong background in C#, Javascript, and Typescript, as well
            as practical insights into agile development methodologies.
          </p>
          <p>
            Following my education, I had the opportunity to intern at Volvo
            Powertrain in Gothenburg, where I actively contributed to the
            development of an internal application within a C# development team.
            This internship, from November 2022 to June 2023, not only added
            valuable practical experience to my skill set but also honed my
            ability to thrive in an agile work environment.
          </p>
        </section>
        <section id="work">
          <h2>Work</h2>
          <p>Details about your projects here.</p>
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <p>Details about how to contact you here.</p>
        </section>
      </main>
    </div>
  );
};

export default App;
