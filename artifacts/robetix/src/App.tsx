import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ArrowUpRight, Bot, Check, ChevronRight, CircleDot, Cpu, Mail, MapPin, Menu, X, Zap } from 'lucide-react';
import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const navItems = [
  ['/solutions', 'Solutions'],
  ['/pcb-design', 'PCB Design'],
  ['/robotics', 'Robotics'],
  ['/autonomous-systems', 'Autonomy'],
  ['/drones-uavs', 'Drones & UAVs'],
  ['/projects', 'Projects'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

const capabilities = ['PCB DESIGN', 'ROBOTICS', 'AUTOMATION', 'EMBEDDED SYSTEMS', 'AUTONOMOUS SYSTEMS', 'DRONES / UAVs', 'FLEX PCBs', 'RIGID-FLEX', 'STRETCHABLE ELECTRONICS', 'HIGH-DENSITY ELECTRONICS'];

const ButtonArrow = ({ children, variant = 'primary', href = '/contact', onClick }: { children: ReactNode; variant?: 'primary' | 'secondary'; href?: string; onClick?: () => void }) => {
  const className = variant === 'primary' ? 'button-primary' : 'button-secondary';
  return onClick ? <button data-testid="button-action-arrow" className={className} onClick={onClick}>{children}<ArrowUpRight size={15} /></button> : <Link data-testid="link-action-arrow" href={href} className={className}>{children}<ArrowUpRight size={15} /></Link>;
};

function Brand() {
  return <Link href="/" className="brand" data-testid="link-brand"><span className="brand-mark" aria-hidden="true"><CircleDot size={17} /></span><span>ROBETIX</span></Link>;
}

function Navigation() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [location]);
  return <header className="nav-wrap">
    <nav className={`nav glass ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <Brand />
      <div className="nav-links">
        <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`} data-testid="link-home">Home</Link>
        {navItems.map(([href, label]) => <Link key={href} href={href} className={`nav-link ${location === href ? 'active' : ''}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>)}
      </div>
      <ButtonArrow href="/contact">Start a Project</ButtonArrow>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      {open && <div className="mobile-menu">
        <Link href="/" data-testid="link-mobile-home">Home</Link>
        {navItems.map(([href, label]) => <Link key={href} href={href} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>)}
        <Link href="/contact" data-testid="link-mobile-start-project">Start a Project <ArrowUpRight size={14} /></Link>
      </div>}
    </nav>
  </header>;
}

function Eyebrow({ children }: { children: string }) {
  return <div className="eyebrow"><span className="status-dot" />{children}</div>;
}

function Marquee({ items = capabilities }: { items?: string[] }) {
  return <div className="marquee-shell" aria-label="ROBETIX capabilities"><div className="marquee">{[...items, ...items].map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}</div></div>;
}

function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="container-wide hero-grid">
      <div className="reveal">
        <Eyebrow>Engineering mode / system online</Eyebrow>
        <h1 id="hero-title">Engineering<br /><em>intelligence</em><br />into motion.</h1>
        <p className="hero-copy">ROBETIX designs intelligent robotic systems, autonomous machines, advanced electronics, high-density PCBs, drones, and next-generation embedded platforms.</p>
        <div className="hero-actions"><ButtonArrow>Start a Project</ButtonArrow><ButtonArrow variant="secondary" href="/projects">Explore Our Work</ButtonArrow></div>
        <div className="hero-meta mono"><span>01 — IDEA → SYSTEM</span><span>16-LAYER CAPABILITY</span><span><span className="status-dot" />AVAILABLE FOR NEW BUILDS</span></div>
      </div>
      <div className="hero-visual reveal delay-2" aria-label="Technical illustration of a high-density robotics control board">
        <div className="technical-orbit" /><div className="visual-crosshair" />
        <div className="pcb-visual"><div className="pcb-board"><div className="chip chip-a" /><div className="chip chip-b" /></div><span className="pcb-tag tag-a">16-LAYER PCB</span><span className="pcb-tag tag-b">AI CONTROL</span><span className="pcb-tag tag-c">CAN-FD / 48V</span></div>
      </div>
    </div>
  </section>;
}

function CircuitStory() {
  const cards = [
    ['01', 'SENSE', 'Sensors, perception, data acquisition and environmental awareness.'],
    ['02', 'THINK', 'Embedded intelligence, control systems, edge AI and decision-making.'],
    ['03', 'MOVE', 'Motors, actuators, robotics, autonomous navigation and mechanical systems.'],
  ];
  return <section className="section" id="story"><div className="container-wide story-grid">
    <div className="story-lead"><Eyebrow>02 / System thinking</Eyebrow><h2>From circuit<br />to motion.</h2><p>ROBETIX brings electronics, robotics, embedded intelligence and mechanical systems together to create machines that sense, think and move.</p><ButtonArrow variant="secondary" href="/solutions">Explore the system <ChevronRight size={15} /></ButtonArrow></div>
    <div className="sense-stack">{cards.map(([index, title, text]) => <article className="sense-card glass" key={title} data-testid={`card-sense-${title.toLowerCase()}`}><span className="card-index">{index}</span><div className="sense-graphic" /><h3>{title}</h3><p>{text}</p></article>)}</div>
  </div></section>;
}

function ServiceSection() {
  const services = [
    { id: '01', title: 'Robotics', icon: Bot, text: 'Intelligent robotic systems designed for real-world environments.', tags: ['Mobile robots', 'Manipulators', 'Service robots'], graphic: 'robot' },
    { id: '02', title: 'Automation systems', icon: Zap, text: 'Control architectures that turn industrial complexity into repeatable motion.', tags: ['PLC integration', 'Motor control', 'Machine vision'], graphic: 'auto' },
    { id: '03', title: 'Advanced PCB design', icon: Cpu, text: 'Professional PCB engineering from concept to manufacturing-ready design.', tags: ['HDI', 'High-speed', 'Power / RF'], graphic: 'pcb' },
  ];
  return <section className="section dark-band" id="services"><div className="container-wide"><div className="section-head"><Eyebrow>03 / Core engineering services</Eyebrow><h2>What we engineer.</h2><p>One accountable engineering partner across the layers that make a product real: electrical, embedded, mechanical and intelligent.</p></div><div className="service-grid">{services.map(({ id, title, text, tags, graphic, icon: Icon }) => <article className={`service-card ${graphic === 'pcb' ? 'featured' : ''}`} key={title} data-testid={`card-service-${id}`}><div className={`service-graphic ${graphic}`}><Icon size={21} color="#8de7e3" /></div><span className="card-index">{id} / CAPABILITY</span><h3>{title}</h3><p>{text}</p><div className="service-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div></div></section>;
}

function PcbTechnology() {
  return <section className="section" id="pcb-tech"><div className="container-wide tech-feature"><div><Eyebrow>04 / Electronics platform</Eyebrow><h2>Built for<br /><span style={{ color: 'var(--electric)' }}>complexity.</span></h2><p>From two-layer sensor boards to 16-layer compute platforms, we design the electrical backbone that your intelligent machine depends on.</p><div className="spec-row">{['2–16 LAYERS', 'HDI / BGA', 'HIGH-SPEED DIGITAL', 'DFM / DRC', 'RF + POWER'].map(s => <span className="spec" key={s}>{s}</span>)}</div><div style={{ marginTop: 28 }}><ButtonArrow href="/pcb-design" variant="secondary">See PCB capability</ButtonArrow></div></div><div className="layer-art" aria-label="Exploded visualization of an eight-layer PCB stack-up"><div className="stack-board">{Array.from({ length: 8 }).map((_, i) => <div className="layer" style={{ ['--i' as string]: i } as CSSProperties} key={i}><span className="layer-label">L{i + 1} — {i % 2 ? 'GND / POWER' : 'SIGNAL / COMPONENT'}</span></div>)}</div></div></div></section>;
}

function FlexSection() {
  const items = [['flex', 'Flexible PCB', 'Thin flexible electronics for compact and dynamic applications.'], ['rigid', 'Rigid-flex PCB', 'Rigid and flexible technologies combined into one engineered platform.'], ['stretch', 'Stretchable PCB', 'Elastomeric electronics for soft robotics, wearables and human-machine interfaces.']];
  return <section className="section" id="flex"><div className="container-wide"><div className="section-head"><Eyebrow>05 / Advanced materials</Eyebrow><h2>Engineered to bend.</h2><p>When a rigid board is the wrong answer, we engineer electronics that follow the shape, movement and softness of the product.</p></div><div className="flex-grid">{items.map(([className, title, text]) => <article className={`flex-card glass ${className}`} key={title} data-testid={`card-flex-${className}`}><div className="flex-illustration" /><span className="eyebrow">{className === 'rigid' ? 'RIGID / FLEX' : className.toUpperCase()}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div style={{ marginTop: 24 }}><ButtonArrow href="/flex-electronics" variant="secondary">Explore flexible electronics</ButtonArrow></div></div></section>;
}

function SoftRobotics() {
  return <section className="section section-tight"><div className="container-wide soft-grid"><div className="soft-art" aria-label="Abstract technical illustration of stretchable robotic skin" /><div className="soft-copy"><Eyebrow>06 / Soft robotics</Eyebrow><h2>Soft electronics<br />for soft machines.</h2><p className="muted">Stretchable circuits and pressure-sensitive surfaces create a more expressive relationship between machine and environment.</p><ul className="feature-list">{['Stretchable circuits', 'Flexible sensors', 'Soft actuators', 'Wearable electronics', 'Robotic skin', 'Pressure sensing'].map(item => <li key={item}><Check size={13} color="var(--electric)" /> {item}</li>)}</ul></div></div></section>;
}

function AutonomySection() {
  return <section className="section dark-band" id="autonomy"><div className="container-wide"><div className="section-head"><Eyebrow>07 / Perception + control</Eyebrow><h2>Systems that think<br />for themselves.</h2><p>We combine sensor fusion, mapping and embedded control into autonomous platforms that understand where they are and what happens next.</p></div><div className="autonomy-stage" aria-label="Autonomous robot navigation visualization"><div className="lidar" /><div className="rover" /><span className="hud-label hud-a">LIDAR / SCAN ACTIVE</span><span className="hud-label hud-b">PATH: OPTIMIZED / 98.4%</span><span className="hud-label hud-c">MAP NODE 04 / 12</span></div><div style={{ marginTop: 25 }}><ButtonArrow href="/autonomous-systems" variant="secondary">Explore autonomous systems</ButtonArrow></div></div></section>;
}

function DroneSection() {
  return <section className="section" id="drones"><div className="container-wide"><div className="section-head"><Eyebrow>08 / Flight systems</Eyebrow><h2>Intelligence above<br />the ground.</h2><p>Flight controllers, navigation, telemetry and power systems engineered for UAVs that need to do more than stay in the air.</p></div><div className="drone-stage" aria-label="Technical drone visualization"><div className="telemetry"><span>ALTITUDE<strong>124.8 m</strong></span><span>SPEED<strong>18.4 m/s</strong></span><span>BATTERY<strong>78.2%</strong></span><span>GNSS<strong>RTK FIX</strong></span><span>HEADING<strong>042°</strong></span></div><div className="drone"><div className="arm a" /><div className="arm b" /><div className="rotor a" /><div className="rotor b" /><div className="drone-body" /></div></div><div style={{ marginTop: 25 }}><ButtonArrow href="/drones-uavs" variant="secondary">Explore UAV engineering</ButtonArrow></div></div></section>;
}

function Projects() {
  const projects = [
    ['AUTONOMOUS ROBOTICS PLATFORM', 'Mobile robot architecture with perception, embedded control and path planning.', '/robotics'],
    ['HIGH-DENSITY COMPUTE PCB', '16-layer embedded computing board for demanding edge applications.', '/pcb-design'],
    ['UAV FLIGHT CONTROLLER', 'Compact flight-control electronics built around resilient telemetry.', '/drones-uavs'],
  ];
  return <section className="section" id="projects"><div className="container-wide"><div className="section-head"><Eyebrow>09 / Selected engineering work</Eyebrow><h2>Proof in the hardware.</h2><p>A few of the product directions where electronics become intelligent, physical and ready for the field.</p></div><div className="showcase-grid"><Link href={projects[0][2]} className="project-tile" data-testid="card-project-autonomous"><span className="eyebrow">CASE / 001</span><h3>{projects[0][0]}</h3><p>{projects[0][1]}</p><ArrowUpRight className="project-arrow" /></Link><div className="project-stack">{projects.slice(1).map(([title, text, href], i) => <Link href={href} className="project-tile small" key={title} data-testid={`card-project-${i + 2}`}><span className="eyebrow">CASE / 00{i + 2}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight /></Link>)}</div></div><div style={{ marginTop: 25 }}><ButtonArrow href="/projects" variant="secondary">View all projects</ButtonArrow></div></div></section>;
}

function Process() {
  const steps = [['01', 'Discover', 'Understand the product requirements.'], ['02', 'Architect', 'Define system architecture and technology.'], ['03', 'Design', 'Create schematic, PCB, mechanical and embedded designs.'], ['04', 'Prototype', 'Build and validate the first hardware.'], ['05', 'Test', 'Verify electrical, mechanical and software performance.'], ['06', 'Optimize', 'Improve reliability and manufacturability.'], ['07', 'Deploy', 'Prepare the system for real-world implementation.']];
  return <section className="section section-tight"><div className="container-wide"><div className="section-head"><Eyebrow>10 / The build path</Eyebrow><h2>From idea to engineered system.</h2></div><div className="timeline">{steps.map(([num, title, text]) => <div className="step" key={num}><span className="step-dot" /><span className="eyebrow">{num}</span><b>{title}</b><p>{text}</p></div>)}</div></div></section>;
}

function WhyRobetix() {
  const reasons = [['01', 'Engineering-first', 'Solutions are designed around real constraints, tolerances and failure modes.'], ['02', 'System thinking', 'Electronics, firmware, mechanics and intelligence are considered together.'], ['03', 'Manufacturing ready', 'Designs move beyond demos, with production considerations from day one.'], ['04', 'Future focused', 'We explore the next generation without losing respect for what works.']];
  return <section className="section section-tight"><div className="container-wide"><div className="section-head"><Eyebrow>11 / Why ROBETIX</Eyebrow><h2>Calm in the complexity.</h2><p>Serious product teams need an engineering partner who can hold the whole system in view.</p></div><div className="why-grid">{reasons.map(([num, title, text]) => <article className="why-card glass" key={num} data-testid={`card-why-${num}`}><span className="eyebrow">{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="stats">{[['16+', 'PCB LAYERS'], ['100+', 'ENGINEERING CONCEPTS'], ['50+', 'SYSTEM ARCHITECTURES'], ['∞', 'POSSIBILITIES']].map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div></section>;
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  if (submitted) return <div className="success-box" role="status" data-testid="status-contact-success"><strong>Brief received. Engineering mode engaged.</strong><span>Thanks for reaching out. We will review your project details and respond with a considered next step.</span><div style={{ marginTop: 18 }}><button className="button-secondary" onClick={() => setSubmitted(false)} data-testid="button-send-another">Send another brief</button></div></div>;
  return <form className="contact-form glass" onSubmit={handleSubmit} data-testid="form-contact"><div className="form-grid">
    <div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" required placeholder="Your name" data-testid="input-name" /></div>
    <div className="field"><label htmlFor="email">Work email *</label><input id="email" name="email" type="email" required placeholder="you@company.com" data-testid="input-email" /></div>
    <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" placeholder="Company or team" data-testid="input-company" /></div>
    <div className="field"><label htmlFor="project-type">Project type *</label><select id="project-type" name="projectType" required defaultValue="" data-testid="select-project-type"><option value="" disabled>Select a direction</option>{['PCB Design', 'Robotics', 'Automation', 'Embedded Systems', 'Flex PCB', 'Rigid-Flex PCB', 'Stretchable Electronics', 'Drone / UAV', 'Autonomous Systems', 'Other'].map(item => <option value={item} key={item}>{item}</option>)}</select></div>
    <div className="field"><label htmlFor="budget">Budget range</label><select id="budget" name="budget" defaultValue="" data-testid="select-budget"><option value="">Select a range</option><option>$10k — $25k</option><option>$25k — $75k</option><option>$75k — $150k</option><option>Let's scope it together</option></select></div>
    <div className="field"><label htmlFor="files">Project files</label><input id="files" name="files" type="file" data-testid="input-files" /></div>
    <div className="field full"><label htmlFor="description">Project description *</label><textarea id="description" name="description" required placeholder="What are you trying to make, and where are you in the process?" data-testid="textarea-description" /></div>
  </div><div className="submit-row"><span className="form-note">Your information stays with the engineering team.<br />We respond to serious product inquiries.</span><button className="button-primary" type="submit" data-testid="button-submit-contact">Start engineering <ArrowUpRight size={15} /></button></div></form>;
}

function ContactSection() {
  return <section className="section" id="contact"><div className="container-wide contact-grid"><div><Eyebrow>12 / Start a conversation</Eyebrow><h2>Let’s build<br />what’s next.</h2><p className="muted">Have a robotics, electronics, PCB, automation, drone or autonomous-system idea? Let’s engineer it into reality.</p><div className="contact-detail"><div><Mail size={15} /> hello@robetix.engineering</div><div><MapPin size={15} /> Engineering globally / UTC ± 05:30</div></div></div><ContactForm /></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container-wide"><div className="footer-grid"><div><Brand /><p className="footer-tag">Robotics. Electronics. Intelligence.<br />Engineering the intelligent future.</p></div><div><h4>Explore</h4>{navItems.slice(0, 5).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</div><div><h4>Connect</h4><a href="mailto:hello@robetix.engineering">Email the lab</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div></div><div className="footer-bottom"><span>© 2026 ROBETIX. All rights reserved.</span><span className="mono">PCB / ROBOTICS / AUTONOMY</span></div></div></footer>;
}

function Home() {
  return <><Hero /><Marquee /><CircuitStory /><ServiceSection /><PcbTechnology /><FlexSection /><SoftRobotics /><AutonomySection /><DroneSection /><Projects /><Marquee items={['KICAD', 'ALTIUM', 'STM32', 'ESP32', 'ARM', 'RISC-V', 'CAN-FD', 'USB', 'ETHERNET', 'BLE', 'GNSS', 'LIDAR', 'IMU', 'ROS', 'RTOS']} /><Process /><WhyRobetix /><section className="cta-band"><div className="container-wide"><Eyebrow>13 / Next system</Eyebrow><h2>Bring the hard problem.</h2><p>We’ll bring the architecture, the boards, the firmware and the resolve to make it real.</p><div style={{ marginTop: 25 }}><ButtonArrow>Start a Project</ButtonArrow></div></div></section><ContactSection /></>;
}

const pageData: Record<string, { eyebrow: string; title: string; description: string; cards: [string, string, string][]; visual?: boolean }> = {
  '/solutions': { eyebrow: 'ROBETIX / Solutions', title: 'One lab for the whole machine.', description: 'From first architecture to field-ready deployment, ROBETIX connects the disciplines that are too often separated.', cards: [['01', 'System architecture', 'A coherent technical direction across electronics, mechanics, firmware and intelligence.'], ['02', 'Product engineering', 'A practical path from early schematic and prototype through verification and production.'], ['03', 'Intelligent machines', 'Robots, autonomous platforms and connected devices designed for the physical world.']] },
  '/pcb-design': { eyebrow: 'ROBETIX / PCB design', title: 'The board is the product.', description: 'High-density PCB design for products where signal integrity, thermal behavior and manufacturing readiness cannot be afterthoughts.', cards: [['01', 'Multilayer design', '2 to 16-layer stack-ups with intentional impedance, return paths and power distribution.'], ['02', 'Embedded compute', 'MCUs, processors, memory, high-speed buses and edge intelligence in a reliable package.'], ['03', 'Manufacturing handoff', 'DRC, DFM, assembly documentation and the clarity your manufacturer needs.']], visual: true },
  '/robotics': { eyebrow: 'ROBETIX / Robotics', title: 'Machines with a reason to move.', description: 'Robotic platforms that combine believable mechanics with sensing, control and the intelligence to work outside the lab.', cards: [['01', 'Mobile platforms', 'Drive systems, sensor integration, localization and control for mobile robots.'], ['02', 'Manipulation', 'Actuation, end-effectors and control architectures for useful robotic work.'], ['03', 'Robot electronics', 'The power, compute and communications layer inside every physical behavior.']], visual: true },
  '/autonomous-systems': { eyebrow: 'ROBETIX / Autonomous systems', title: 'Perception becomes behavior.', description: 'Autonomy is not a feature added at the end. We design the sensing, mapping and control loop as one system.', cards: [['01', 'Perception', 'LiDAR, camera, IMU and environmental sensing shaped into useful world models.'], ['02', 'Decision', 'Path planning, object detection and behavior logic for changing environments.'], ['03', 'Control', 'Embedded real-time systems that turn decisions into safe, repeatable motion.']], visual: true },
  '/drones-uavs': { eyebrow: 'ROBETIX / Drones + UAVs', title: 'Flight systems, engineered.', description: 'Compact and capable UAV electronics for teams building beyond-the-shelf flight behavior.', cards: [['01', 'Flight control', 'Reliable compute and real-time control for stable, responsive aircraft.'], ['02', 'Navigation', 'GNSS, IMU, telemetry and sensor fusion for confident flight decisions.'], ['03', 'Power + comms', 'Motor control, power integrity and communication systems designed as one platform.']], visual: true },
  '/flex-electronics': { eyebrow: 'ROBETIX / Flexible electronics', title: 'Electronics that follow the form.', description: 'Flexible, rigid-flex and stretchable systems for products that bend, move, conform and interact.', cards: [['01', 'Flexible PCB', 'Thin circuits that route around tight spaces and dynamic assemblies.'], ['02', 'Rigid-flex', 'Mechanical strength where it matters, flexibility where the product moves.'], ['03', 'Stretchable systems', 'Elastomeric electronics, soft sensors and human-machine interfaces.']], visual: true },
};

function FocusPage({ data }: { data: typeof pageData['/solutions'] }) {
  return <><main><section className="sub-hero"><div className="container-wide"><Eyebrow>{data.eyebrow}</Eyebrow><h1>{data.title}</h1><p>{data.description}</p><div className="hero-actions"><ButtonArrow>Start a Project</ButtonArrow><ButtonArrow variant="secondary" href="/projects">See selected work</ButtonArrow></div>{data.visual && <div className="page-visual" aria-label="Abstract technical engineering visualization"><div className="page-visual-line" /><div className="page-visual-chip" /></div>}</div></section><section className="section"><div className="container-wide"><div className="section-head"><Eyebrow>How we contribute</Eyebrow><h2>Precision where it counts.</h2></div><div className="sub-grid">{data.cards.map(([num, title, text]) => <article className="info-card glass" key={num} data-testid={`card-focus-${num}`}><span className="eyebrow">{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><section className="cta-band"><div className="container-wide"><Eyebrow>Ready when you are</Eyebrow><h2>Let’s make the system legible.</h2><p>Bring us the constraints, the ambition or the unresolved question. We’ll help define the next engineering move.</p><div style={{ marginTop: 25 }}><ButtonArrow>Start a Project</ButtonArrow></div></div></section></main></>;
}

function ProjectsPage() {
  return <><main><section className="sub-hero"><div className="container-wide"><Eyebrow>ROBETIX / Selected work</Eyebrow><h1>Hardware with a point of view.</h1><p>Case-study directions across mobile robotics, advanced electronics, autonomous flight and the interfaces between people and machines.</p></div></section><Projects /><section className="section section-tight"><div className="container-wide sub-grid">{[['Sensing', 'Sensor boards and perception systems.'], ['Compute', 'High-density processing and control.'], ['Motion', 'Actuation, navigation and power.']].map(([title, text]) => <article className="info-card glass" key={title}><span className="eyebrow">ENGINEERING LAYER</span><h3>{title}</h3><p>{text}</p></article>)}</div></section></main></>;
}

function AboutPage() {
  return <><main><section className="sub-hero"><div className="container-wide"><Eyebrow>ROBETIX / About the lab</Eyebrow><h1>We make complexity useful.</h1><p>ROBETIX is an independent robotics and electronics engineering company for serious product teams. We believe the best intelligent machines are built when every layer can speak to every other layer.</p></div></section><section className="section"><div className="container-wide tech-feature"><div><Eyebrow>Our operating principle</Eyebrow><h2>Make the invisible<br /><span style={{ color: 'var(--electric)' }}>physical.</span></h2></div><div><p className="muted" style={{ lineHeight: 1.9 }}>A schematic is a promise. A PCB is a decision. A prototype is a question made tangible. Our work is to make those steps clearer, faster and more honest — until a product can leave the lab and earn its place in the world.</p><div className="spec-row">{['CURIOUS', 'PRECISE', 'SYSTEMIC', 'MANUFACTURABLE'].map(item => <span className="spec" key={item}>{item}</span>)}</div></div></div></section><section className="dark-band section"><div className="container-wide"><div className="section-head"><Eyebrow>How we work</Eyebrow><h2>Small team.<br />Whole system.</h2><p>We stay close to the actual engineering decisions. Fewer handoffs. Better questions. Hardware that behaves like the idea that started it.</p></div></div></section></main></>;
}

function ContactPage() {
  return <><main><section className="sub-hero"><div className="container-wide"><Eyebrow>ROBETIX / Contact</Eyebrow><h1>Start with the hard question.</h1><p>Tell us what you are building, where it is stuck and what success looks like. We’ll come back with a thoughtful engineering direction.</p></div></section><ContactSection /></main></>;
}

function PageMeta() {
  const [location] = useLocation();
  useEffect(() => {
    const meta: Record<string, [string, string]> = {
      '/': ['ROBETIX — Robotics, Electronics & Intelligent Systems', 'ROBETIX engineers robotics, advanced PCB design, embedded systems, autonomous machines, drones and flexible electronics.'],
      '/solutions': ['Robotics & Electronics Engineering Solutions | ROBETIX', 'One engineering lab for robotics, electronics, PCB design, embedded intelligence and autonomous systems.'],
      '/pcb-design': ['Advanced PCB Design & 16-Layer Electronics | ROBETIX', 'High-density multilayer PCB engineering, embedded compute, high-speed digital, DFM and manufacturing-ready design.'],
      '/robotics': ['Robotics Engineering for Real-World Machines | ROBETIX', 'Robotics engineering across mobile platforms, manipulators, sensors, control and embedded systems.'],
      '/autonomous-systems': ['Autonomous Systems Engineering | ROBETIX', 'Perception, mapping, path planning and embedded control for autonomous robots and intelligent machines.'],
      '/drones-uavs': ['Drone & UAV Electronics Engineering | ROBETIX', 'Flight controllers, navigation, telemetry, GNSS, IMU, power and communication systems for UAVs.'],
      '/flex-electronics': ['Flexible, Rigid-Flex & Stretchable PCB Design | ROBETIX', 'Flexible electronics for dynamic, compact, wearable and soft robotic products.'],
      '/projects': ['Robotics & Electronics Engineering Projects | ROBETIX', 'Selected ROBETIX engineering work across autonomous robotics, PCBs and UAV flight systems.'],
      '/about': ['About ROBETIX | Engineering Intelligent Machines', 'Meet ROBETIX, an independent robotics and electronics engineering lab for serious product teams.'],
      '/contact': ['Contact ROBETIX Engineering', 'Start a robotics, electronics, PCB, autonomous systems, drone or flexible electronics project with ROBETIX.'],
    };
    const [title, description] = meta[location] ?? meta['/'];
    document.title = title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement('meta'); desc.setAttribute('name', 'description'); document.head.appendChild(desc); }
    desc.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', `${window.location.origin}${location}`);
    const setMeta = (selector: string, attribute: string, value: string) => {
      let node = document.head.querySelector(selector);
      if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, selector.includes('property=') ? selector.split('"')[1] : selector.split('"')[1]); document.head.appendChild(node); }
      node.setAttribute('content', value);
    };
    setMeta('meta[property="og:title"]', 'property', title);
    setMeta('meta[property="og:description"]', 'property', description);
    setMeta('meta[property="og:type"]', 'property', 'website');
    setMeta('meta[property="og:url"]', 'property', `${window.location.origin}${location}`);
    setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', title);
    setMeta('meta[name="twitter:description"]', 'name', description);
    if (!document.head.querySelector('script[data-robetix-schema]')) {
      const schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.robetixSchema = 'true';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ROBETIX',
        description: 'Robotics, electronics, PCB design and intelligent systems engineering company.',
        url: window.location.origin,
        email: 'hello@robetix.engineering',
        knowsAbout: ['PCB Design', 'Robotics Engineering', 'Embedded Systems', 'Autonomous Systems', 'Drone Electronics', 'Flexible Electronics'],
      });
      document.head.appendChild(schema);
    }
  }, [location]);
  return null;
}

function AppContent() {
  return <><PageMeta /><Navigation /><Switch>
    <Route path="/" component={Home} />
    <Route path="/solutions"><FocusPage data={pageData['/solutions']} /></Route>
    <Route path="/pcb-design"><FocusPage data={pageData['/pcb-design']} /></Route>
    <Route path="/robotics"><FocusPage data={pageData['/robotics']} /></Route>
    <Route path="/autonomous-systems"><FocusPage data={pageData['/autonomous-systems']} /></Route>
    <Route path="/drones-uavs"><FocusPage data={pageData['/drones-uavs']} /></Route>
    <Route path="/flex-electronics"><FocusPage data={pageData['/flex-electronics']} /></Route>
    <Route path="/projects" component={ProjectsPage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/contact" component={ContactPage} />
    <Route component={NotFound} />
  </Switch><Footer /></>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><AppContent /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;