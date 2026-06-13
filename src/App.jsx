import { useEffect, useRef, useState } from 'react'
import './App.css'
import image1 from './1.png'
import image2 from './2.png'
import image3 from './3.png'
import image4 from './4.png'
import image5 from './5.png'
import image6 from './6.png'
import heroScreenshot from './Screenshot 2026-06-13 152341.png'

const sections = [
  {
    title: 'Appointment Scheduling',
    summary: 'Manage patient visits smoothly and keep the care team in sync.',
    body:
      'Create, update, or cancel appointments quickly. Keep upcoming and completed visits in one clear timeline, send reminders automatically, and assign doctors without extra hassle.',
    image: image1,
  },
  {
    title: 'Check-Up',
    summary: 'Keep patient check-up notes clear, current, and easy to review.',
    body:
      'Review vitals, symptoms, and medical history in one place. The record stays accurate, follow-ups stay organized, and doctors can make decisions faster.',
    image: image2,
  },
  {
    title: 'AI Lab Report',
    summary: 'Turn lab reports into clear summaries that are easy to use.',
    body:
      'Upload a report and let AI organize the findings for you. Get a short, readable summary that is easier to review, share, and store securely.',
    image: image3,
  },
  {
    title: 'Self Screening',
    summary: 'Let patients record symptoms early and help doctors prepare faster.',
    body:
      'Patients can log symptoms before the visit, giving the care team better context right away. It saves time, speeds up consultation, and syncs directly with the patient record.',
    image: image4,
  },
  {
    title: 'Chat System',
    summary: 'Keep doctors, nurses, and patients connected with secure chat.',
    body:
      'Send updates, reports, and prescriptions instantly in one secure place. It keeps communication fast, clear, and protected.',
    image: image5,
  },
  {
    title: 'Patient Management',
    summary: 'Manage patient records from one organized workspace.',
    body:
      'Search records quickly, review patient history, and handle registration with less manual work. Secure storage and automation make daily tasks easier.',
    image: image6,
  },
]

function useInView(options = { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, options)

    observer.observe(element)

    return () => observer.disconnect()
  }, [options])

  return [ref, isVisible]
}

function TypedParagraph({ text, active }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (!active) {
      return undefined
    }

    let cancelled = false
    let timeoutId
    let charIndex = 0

    setDisplayedText('')

    const typeNext = () => {
      if (cancelled) {
        return
      }

      setDisplayedText(text.slice(0, charIndex + 1))
      charIndex += 1

      if (charIndex < text.length) {
        timeoutId = window.setTimeout(typeNext, 16)
      }
    }

    timeoutId = window.setTimeout(typeNext, 50)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [active, text])

  return <p className="typed-paragraph">{displayedText || '\u00A0'}</p>
}

function ScrollSection({ section, index }) {
  const [sectionRef, isVisible] = useInView()

  return (
    <article
      ref={sectionRef}
      className={`story-card ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="story-card-content">
        <div className="story-copy">
          <h2>{section.title}</h2>
          <p className="story-summary">{section.summary}</p>
          <TypedParagraph text={section.body} active={isVisible} />
        </div>

        <div className="story-image-wrap">
          <img
            className="story-image"
            src={section.image}
            alt={`${section.title} illustration`}
            loading="lazy"
          />
        </div>
      </div>
    </article>
  )
}

function App() {
  return (
    <main className="landing">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AlloGate home">
          
          <span className="brand-text">
            <strong>ALLOGATE</strong>
            <small>Connected healthcare access</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#modules">Modules</a>
          <a href="#how-it-works">How it works</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-cta" href="#contact">
          Request Demo
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AlloGate</p>
          <h1>Secure & Smart Access for Connected Healthcare</h1>
          <p className="subtitle">
            Designed for modern healthcare, AlloGate offers secure access to
            patient data for hospitals, clinics, and doctors by combining robust
            authentication, encrypted data sharing, and intelligent AI-powered
            access control.
          </p>

          <div className="actions">
            <a className="primary-action" href="#modules">
              Explore Modules
            </a>
            <a className="primary-action" href="#contact">
              Contact Sales
            </a>
          </div>
        </div>

        <div className="hero-media">
          <div className="hero-visual">
            <div className="hero-visual-glow" aria-hidden="true" />
            <img
              className="hero-shot"
              src={heroScreenshot}
              alt="AlloGate dashboard screenshot"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="modules" id="modules">
        {sections.map((section, index) => (
          <ScrollSection key={section.title} section={section} index={index} />
        ))}
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="how-it-works-header">
          <p className="eyebrow">How Allogate Works</p>
          <h2>See the platform in action</h2>
          <p className="subtitle">
            Watch the short demo to understand how Allogate brings scheduling,
            screening, reports, and communication together.
          </p>
        </div>

        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/OFXE1V5SGCk"
            title="How Allogate Works"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy">
          <p className="contact-label">Start here</p>
          <h2>Bring AlloGate into your care workflow.</h2>
          <p className="contact-summary">
            Book a walkthrough to see how scheduling, screenings, lab reports,
            and patient care come together in one polished platform.
          </p>
        </div>

        <div className="contact-actions">
          <a className="primary-action" href="mailto:hello@example.com">
            Request a Demo
          </a>
          <a className="primary-action" href="#modules">
            Explore Features
          </a>
        </div>

        <p className="contact-footnote">
          Trusted by modern healthcare teams that want a cleaner, faster way to
          manage care.
        </p>
      </section>
    </main>
  )
}

export default App
