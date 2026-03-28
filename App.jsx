import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import './site.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import imgHamed from './Hamed_President.jpg'
import resumePdf from './assets/Resume/Hamed Adam.pdf'

import imgLRS1 from './assets/Pictures/LRS/intro event.JPG'
import imgLRS2 from './assets/Pictures/LRS/LRS 3.JPG'
import imgLRS3 from './assets/Pictures/LRS/LRS 4.JPG'
import imgLRS4 from './assets/Pictures/LRS/LRS 9.jpg'
import imgLRS5 from './assets/Pictures/LRS/LRS 10.jpg'
import imgLRS6 from './assets/Pictures/LRS/LRS 11.jpg'
import imgLRS7 from './assets/Pictures/LRS/LRS 12.jpg'
import imgLRS8 from './assets/Pictures/LRS/LRS 14.jpg'

import imgTEDX1 from './assets/TEDX/TEDX 1.jpg'
import imgTEDX2 from './assets/TEDX/TEDX 2.jpg'
import imgTEDX3 from './assets/TEDX/TEDX 3.jpg'
import imgTEDX4 from './assets/TEDX/TEDX 4.jpg'
import imgTEDX5 from './assets/TEDX/TEDX 5.jpeg'

import imgHack1 from './assets/Pictures/LEFS Hackathon/Hackathon 1.png'
import imgHack2 from './assets/Pictures/LEFS Hackathon/Hackathon 2.png'
import imgHack4 from './assets/Pictures/LEFS Hackathon/Hackathon 4.png'
import imgHack5 from './assets/Pictures/LEFS Hackathon/Hackathon 5.png'
import imgHack6 from './assets/Pictures/LEFS Hackathon/Hackathon 6.png'
import imgHack7 from './assets/Pictures/LEFS Hackathon/Hackathon 7.png'
import imgHack8 from './assets/Pictures/LEFS Hackathon/Hackathon 8.jpg'
import imgRSS7 from './assets/RSS Hackathon/RSS 7.jpg'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experiences', id: 'experiences' },
  { label: 'Contact', id: 'contact' },
]

const EXPERIENCES = [

    {
    title: 'RSS Hackathon',
    subtitle: 'Royal Statistical Society Hackathon',
    description: 'Won second place in the RSS Hackathon where I applied statistical methods to analyze large data sets.',
    images: [imgRSS7],
    icon: 'fa-solid fa-chart-column',
  },

  {
    title: 'LRS',
    subtitle: 'Lancaster Rocketry Society',
    description: 'Co-founded The lancaster rocketry society. As the president i organising launches, intro events, secured funding and affliated the society with the engineering department.',
    images: [imgLRS1, imgLRS2, imgLRS3, imgLRS4, imgLRS5, imgLRS6, imgLRS7, imgLRS8],
    link: 'https://lancaster-rocketry-society.github.io/Website/',
    icon: 'fa-solid fa-rocket',
  },
  {
    title: 'Quant Hackathon',
    subtitle: 'Quantitative Finance Hackathon',
    description: 'Organised the first Quant Hackathon in lancaster: where participants had to buld the bot with the best strategy eering challenge building innovative prototypes under tight deadlines.',
    images: [imgHack1, imgHack2, imgHack4, imgHack5, imgHack6, imgHack7, imgHack8],
    icon: 'fa-solid fa-code',
  },
  
  {
    title: 'TEDx',
    subtitle: 'TEDx Lancaster University',
    description: 'Coordinated the TEDx Lancaster Talk , bringing thought-provoking speakers from around the uk.',
    images: [imgTEDX1, imgTEDX2, imgTEDX3, imgTEDX4, imgTEDX5],
    icon: 'fa-solid fa-microphone-lines',
  },
]

const SKILLS = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'C', 'C++', ' SQL'] },
  { category: 'Web & Frameworks', items: ['React', 'SolidWorks', 'Express', 'CAD SolidWorks', 'Vite'] },
  { category: 'Tools & Platforms', items: ['Git', 'GitHub', 'Firebase', 'Linux', 'Docker'] },
  { category: 'Relevant Modules', items: ['Quantum mechanics', 'Linear Algebra', 'Computational modelling', 'Real Analysis'] },
]

const PROJECTS = [
  {
    title: 'Lancaster Rocketry Society',
    description: 'Designed and built the official website for LRS — a student-led rocketry society. Features event management, team showcase, and a responsive retro space-age design.',
    link: 'https://lancaster-rocketry-society.github.io/Website/',
    icon: 'fa-solid fa-rocket',
  },

    {
    title: 'N Body simulation',
    description: 'Designed and built the official website for LRS — a student-led rocketry society. Features event management, team showcase, and a responsive retro space-age design.',
    link: 'https://github.com/Phys-Hamed-Adam/Solar-System',
    icon: 'fa-solid fa-rocket',
  },


  {
    title: 'Picky',
    description: 'Co-Founded my startup Picky Eater an app-based project tackling real-world problems through creative software solutions and user-centred design.',
    link: 'https://picky-eater-beta.vercel.app/',
    icon: 'fa-solid fa-mobile-screen-button',
  },
]

const SOCIALS = [
  { icon: 'fab fa-github', href: 'https://github.com/Phys-Hamed-Adam', label: 'GitHub' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/hamed-adam-66b774331/', label: 'LinkedIn' },
  { icon: 'fas fa-envelope', href: 'phys.hamed.adam@gmail.com', label: 'Email' },
]

function useScrollSpy(ids, offset = 100) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const handleScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveId(ids[i])
          return
        }
      }
      setActiveId(ids[0])
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ids, offset])

  return activeId
}

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(NAV_LINKS.map(l => l.id), 200)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="site-nav">
        <a href="#home" onClick={(e) => handleClick(e, 'home')} className="nav-logo">
          <span className="nav-wordmark">HA</span>
        </a>
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={activeId === l.id ? 'active' : ''}
                onClick={(e) => handleClick(e, l.id)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume-btn"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

function Hero() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="home" className="section hero" ref={ref}>
      <div className={`hero-inner${inView ? ' visible' : ''}`}>
        <p className="hero-greeting">Hi, my name is</p>
        <h1 className="hero-title">Hamed Adam.</h1>
        <h2 className="hero-subtitle">I build things for the web & beyond.</h2>
        <p className="hero-description">
          I'm a physics student passionate about software engineering,
          aerospace technology, and creating elegant solutions to complex problems.
          Currently leading the{' '}
          <a href="https://github.com/Lancaster-Rocketry-Society" target="_blank" rel="noopener noreferrer">
            Lancaster Rocketry Society
          </a>.
        </p>
        <div className="hero-actions">
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn btn-outline">
            Get In Touch
          </a>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}

function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="section about" ref={ref}>
      <div className={`section-inner${inView ? ' visible' : ''}`}>
        <span className="section-number">01.</span>
        <h2 className="section-title">About Me</h2>
        <div className="section-divider" />
        <div className="about-grid">
          <div className="about-text">
            <p>
              Hello! I'm Hamed, a physics student at Lancaster University
              with a deep passion for research and engineering. 
              I enjoy working at the intersection of technology and engineering — whether
              that's crafting web applications, programming flight computers, or leading a team
              of aspiring rocket engineers.
            </p>
            <p>
              As the President of the Lancaster Rocketry Society, I've gained experience
              in project management, team leadership, and hands-on aerospace engineering.
              I love tackling challenging problems and learning new technologies along the way.
            </p>
            <p>
              When I'm not coding or building rockets, you'll find me exploring new
              technologies, contributing to open-source projects, or mentoring fellow students.
            </p>
          </div>
          <div className="about-photo-wrap">
            <img src={imgHamed} alt="Hamed Adam" className="about-photo" />
            <div className="about-photo-border" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className={`section-inner${inView ? ' visible' : ''}`}>
        <span className="section-number">02.</span>
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="section-divider" />
        <div className="skills-grid">
          {SKILLS.map((group) => (
            <div key={group.category} className="skill-group">
              <h3 className="skill-group-title">{group.category}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item} className="skill-item">
                    <span className="skill-arrow">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1)

  return (
    <div
      className={`project-card${inView ? ' visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="project-card-header">
        <i className={`project-icon ${project.icon}`} />
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-external-link">
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </a>
        )}
      </div>
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-desc">{project.description}</p>
      <ul className="project-card-tech">
        {project.tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  )
}

function Projects() {
  const [ref, inView] = useInView()

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className={`section-inner${inView ? ' visible' : ''}`}>
        <span className="section-number">03.</span>
        <h2 className="section-title">Things I've Built</h2>
        <div className="section-divider" />
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <img
        src={images[index]}
        alt=""
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        <i className="fa-solid fa-xmark" />
      </button>
      {images.length > 1 && (
        <button className="lightbox-arrow lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous">
          <i className="fa-solid fa-chevron-left" />
        </button>
      )}
      {images.length > 1 && (
        <button className="lightbox-arrow lightbox-next" onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next">
          <i className="fa-solid fa-chevron-right" />
        </button>
      )}
      {images.length > 1 && (
        <span className="lightbox-counter">{index + 1} / {images.length}</span>
      )}
    </div>
  )
}

function ExperiencePost({ experience, index }) {
  const [ref, inView] = useInView(0.1)

  return (
    <article
      className={`exp-post${inView ? ' visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="exp-post-icon-wrap">
        <i className={`exp-post-icon ${experience.icon}`} />
      </div>
      <div className="exp-post-body">
        <h3 className="exp-post-title">
          {experience.link ? (
            <a href={experience.link} target="_blank" rel="noopener noreferrer">{experience.title}</a>
          ) : experience.title}
        </h3>
        <p className="exp-post-subtitle">{experience.subtitle}</p>
        <p className="exp-post-desc">{experience.description}</p>
        {experience.images.length > 0 && (
          <div className={`exp-post-gallery count-${Math.min(experience.images.length, 3)}`}>
            {experience.images.slice(0, 3).map((img, i) => (
              <div key={i} className="exp-post-thumb">
                <img src={img} alt={`${experience.title} ${i + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function Experiences() {
  const [ref, inView] = useInView()

  return (
    <section id="experiences" className="section experiences" ref={ref}>
      <div className={`section-inner${inView ? ' visible' : ''}`}>
        <span className="section-number">04.</span>
        <h2 className="section-title">Experiences</h2>
        <div className="section-divider" />
        <div className="exp-posts">
          {EXPERIENCES.map((exp, i) => (
            <ExperiencePost key={exp.title} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className={`section-inner contact-inner${inView ? ' visible' : ''}`}>
        <span className="section-number">05.</span>
        <h2 className="contact-heading">Get In Touch</h2>
        <p className="contact-text">
          I'm currently looking for new opportunities and my inbox is always open.
          Whether you have a question, a project idea, or just want to say hi —
          I'll do my best to get back to you!
        </p>
        <a href="mailto:hamed@example.com" className="btn btn-primary contact-btn">
          Say Hello
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <ul className="footer-socials">
        {SOCIALS.map(s => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <i className={s.icon} />
            </a>
          </li>
        ))}
      </ul>
      <p className="footer-credit">
        Designed & Built by Hamed Adam
      </p>
    </footer>
  )
}

function SideElements() {
  return (
    <>
      <div className="side-element side-email">
        <a href="mailto:hamed@example.com">hamed@example.com</a>
        <div className="side-line" />
      </div>
      <div className="side-element side-socials">
        {SOCIALS.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
            <i className={s.icon} />
          </a>
        ))}
        <div className="side-line" />
      </div>
    </>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <SideElements />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experiences />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
