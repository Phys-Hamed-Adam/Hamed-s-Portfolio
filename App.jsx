import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import './site.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import imgHamed from './Hamed_President.jpg'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

const SKILLS = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java'] },
  { category: 'Web & Frameworks', items: ['React', 'Node.js', 'Express', 'HTML/CSS', 'Vite'] },
  { category: 'Tools & Platforms', items: ['Git', 'GitHub', 'Firebase', 'Linux', 'Docker'] },
  { category: 'Interests', items: ['Aerospace Engineering', 'Embedded Systems', 'Robotics', 'AI/ML'] },
]

const PROJECTS = [
  {
    title: 'Lancaster Rocketry Society Website',
    description: 'Designed and built the official website for LRS — a student-led rocketry society. Features event management, team showcase, and a responsive retro space-age design.',
    tech: ['React', 'Vite', 'Firebase', 'CSS'],
    link: 'https://github.com/Lancaster-Rocketry-Society',
    icon: 'fa-solid fa-rocket',
  },
  {
    title: 'Portfolio Website',
    description: 'This very website — a personal portfolio built with React and Vite, featuring smooth animations, responsive design, and a modern dark aesthetic.',
    tech: ['React', 'Vite', 'CSS3'],
    icon: 'fa-solid fa-laptop-code',
  },
  {
    title: 'Rocket Avionics System',
    description: 'Developed flight computer software for model rockets, including sensor integration, data logging, and telemetry for real-time altitude and trajectory tracking.',
    tech: ['C++', 'Arduino', 'Python'],
    icon: 'fa-solid fa-microchip',
  },
]

const SOCIALS = [
  { icon: 'fab fa-github', href: 'https://github.com/hamedadam', label: 'GitHub' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/hamed-adam-66b774331/', label: 'LinkedIn' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/', label: 'Instagram' },
  { icon: 'fas fa-envelope', href: 'mailto:hamed@example.com', label: 'Email' },
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
              href="/resume.pdf"
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
              with a deep passion for building software and hardware that makes a difference.
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

function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className={`section-inner contact-inner${inView ? ' visible' : ''}`}>
        <span className="section-number">04.</span>
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
        <Contact />
      </main>
      <Footer />
    </>
  )
}
