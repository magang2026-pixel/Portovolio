import { useEffect, useState } from "react";

type Slide = {
  id: string;
  number: string;
  label: string;
  title: string;
  eyebrow?: string;
};

const slides: Slide[] = [
  { id: "cover", number: "01", label: "COVER", title: "Arya Rafif", eyebrow: "SECOND CEO" },
  { id: "profile", number: "02", label: "PROFILE", title: "A story behind the work." },
  { id: "damar", number: "03", label: "LEADERSHIP", title: "Damar Kusumandaru Sagara", eyebrow: "CEO" },
  { id: "vision", number: "04", label: "VISION", title: "Ideas become direction." },
  { id: "expertise", number: "05", label: "EXPERTISE", title: "Built with intent." },
  { id: "work", number: "06", label: "SELECTED WORK", title: "Things we've built." },
  { id: "detail", number: "07", label: "PROJECT / 01", title: "Digital products, real workflows." },
  { id: "contact", number: "08", label: "CONTACT", title: "Let's create something." },
];

const skills = ["TypeScript", "React", "JavaScript", "HTML & CSS", "Git & GitHub", "UI / UX"];

const projects = [
  ["01", "SIPADU Web App", "A modern academic information experience focused on clean interfaces and practical workflows.", "React · TypeScript · REST API"],
  ["02", "Library System", "Digital library interface for managing members, books, and circulation workflows.", "TypeScript · Web · Database"],
  ["03", "Tracer Study", "Responsive alumni data platform with fast search and structured information views.", "PHP · Excel · Web"],
];

export default function App() {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === active) return;
    setDirection(next > active ? 1 : -1);
    setActive(next);
    setMenu(false);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    let startY = 0;
    let locked = false;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (locked || Math.abs(event.deltaY) < 12) return;
      locked = true;
      goTo(active + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => { locked = false; }, 850);
    };
    const onTouchStart = (event: TouchEvent) => { startY = event.touches[0].clientY; };
    const onTouchEnd = (event: TouchEvent) => {
      const distance = startY - event.changedTouches[0].clientY;
      if (Math.abs(distance) > 55) goTo(active + (distance > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [active]);

  const current = slides[active];

  return (
    <div className="magazine">
      <header className="mag-header">
        <button className="brand" onClick={() => goTo(0)} aria-label="Go to cover">
          <span>AR</span> ARYA RAFIF / 2026
        </button>
        <div className="header-status"><span>EDITORIAL PORTFOLIO</span><b>{current.number} / 08</b></div>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Open navigation">INDEX</button>
      </header>

      <aside className={`index-menu ${menu ? "is-open" : ""}`}>
        <div className="index-title">INDEX <span>08 PAGES</span></div>
        {slides.map((slide, index) => (
          <button key={slide.id} className={index === active ? "active" : ""} onClick={() => goTo(index)}>
            <span>{slide.number}</span><strong>{slide.label}</strong><i>{index === active ? "CURRENT" : "OPEN"}</i>
          </button>
        ))}
      </aside>

      <div className="progress"><span style={{ height: `${((active + 1) / slides.length) * 100}%` }} /></div>

      <main className={`stage direction-${direction}`}>
        {active === 0 && (
          <section className="page page-cover">
            <div className="cover-meta"><span>VOL. 01</span><span>OCTOBER 2026</span><span>CREATIVE / DIGITAL</span></div>
            <div className="cover-content">
              <p className="kicker reveal delay-1">A DIGITAL MAGAZINE PORTFOLIO</p>
              <h1 className="cover-name reveal delay-2">Arya<br /><em>Rafif</em></h1>
              <p className="role reveal delay-3">SECOND CEO</p>
              <p className="cover-description reveal delay-4">A visual portfolio about people, ideas, and digital work — designed as an editorial experience.</p>
            </div>
            <div className="cover-number">01</div>
            <div className="cover-rule" />
          </section>
        )}

        {active === 1 && (
          <section className="page page-profile">
            <PageChrome slide={current} />
            <div className="profile-layout">
              <div>
                <span className="big-index">02</span>
                <h2 className="display reveal delay-1">A story<br /><em>behind</em> the work.</h2>
              </div>
              <div className="editorial-copy reveal delay-2">
                <p className="lead-copy">Arya Rafif</p>
                <p>Second CEO. This page is intentionally editorial: a space for the story, background, and personal direction behind the work.</p>
                <p className="muted-copy">Add a longer biography here when the final profile content is ready. The layout is prepared so the copy can grow without losing the magazine rhythm.</p>
                <div className="signature">AR / 2026</div>
              </div>
            </div>
          </section>
        )}

        {active === 2 && (
          <section className="page page-damar">
            <PageChrome slide={current} />
            <div className="damar-name"><span className="vertical-label">LEADERSHIP / 03</span><h2 className="display reveal delay-1">Damar<br /><em>Kusumandaru</em><br />Sagara</h2></div>
            <div className="damar-card reveal delay-2"><div className="portrait-placeholder">DKS</div><div><p className="role">CEO</p><p className="muted-copy">Leadership profile space. Replace this copy with Damar's approved biography, focus, and story.</p></div></div>
            <div className="side-note">CEO / DAMAR KUSUMANDARU SAGARA</div>
          </section>
        )}

        {active === 3 && (
          <section className="page page-vision">
            <PageChrome slide={current} />
            <div className="vision-layout">
              <span className="huge-quote">“</span>
              <div><p className="kicker reveal delay-1">THE APPROACH</p><h2 className="display reveal delay-2">Ideas become<br /><em>direction.</em></h2></div>
              <div className="vision-copy reveal delay-3"><p>Good digital work starts by understanding the problem before decorating the solution.</p><div className="principles"><span>01 / CLARITY</span><span>02 / USEFULNESS</span><span>03 / CRAFT</span></div></div>
            </div>
          </section>
        )}

        {active === 4 && (
          <section className="page page-expertise">
            <PageChrome slide={current} />
            <div className="expertise-head"><span className="big-index">05</span><h2 className="display reveal delay-1">Built with<br /><em>intent.</em></h2></div>
            <div className="skill-editorial">{skills.map((skill, index) => <div className="skill-row reveal" style={{ "--delay": `${index * 70}ms` } as React.CSSProperties} key={skill}><span>0{index + 1}</span><strong>{skill}</strong><i>↗</i></div>)}</div>
          </section>
        )}

        {active === 5 && (
          <section className="page page-work">
            <PageChrome slide={current} />
            <div className="work-head"><div><span className="big-index">06</span><h2 className="display reveal delay-1">Things we've<br /><em>built.</em></h2></div><span className="work-count">03 SELECTED PROJECTS</span></div>
            <div className="project-editorial">{projects.map(([number, title, description, stack], index) => <article className="project-card reveal" style={{ "--delay": `${index * 90}ms` } as React.CSSProperties} key={number}><span className="project-no">{number}</span><div className="project-image"><span>{number}</span><small>PROJECT / {number}</small></div><h3>{title}</h3><p>{description}</p><small>{stack}</small></article>)}</div>
          </section>
        )}

        {active === 6 && (
          <section className="page page-detail">
            <PageChrome slide={current} />
            <div className="detail-layout">
              <div className="detail-art reveal delay-1"><span>01</span><b>SIPADU</b><small>ACADEMIC WEB APP</small></div>
              <div className="detail-copy"><span className="big-index">07</span><p className="kicker reveal delay-2">CASE STUDY / SELECTED WORK</p><h2 className="display reveal delay-3">Digital products,<br /><em>real workflows.</em></h2><p className="reveal delay-4">SIPADU Web App is presented as an example of practical digital work: clear interfaces, structured information, and workflows designed around real users.</p><div className="tech-line reveal delay-4"><span>REACT</span><span>TYPESCRIPT</span><span>REST API</span></div></div>
            </div>
          </section>
        )}

        {active === 7 && (
          <section className="page page-contact">
            <PageChrome slide={current} />
            <div className="contact-layout"><span className="big-index">08</span><p className="kicker reveal delay-1">THE LAST PAGE</p><h2 className="display reveal delay-2">Let's create<br /><em>something.</em></h2><p className="reveal delay-3">For collaboration, projects, or a conversation about digital products.</p><a className="contact-link reveal delay-4" href="mailto:hello@example.com">hello@example.com <span>↗</span></a></div>
            <div className="contact-footer"><span>ARYA RAFIF / SECOND CEO</span><span>DAMAR KUSUMANDARU SAGARA / CEO</span><span>© 2026</span></div>
          </section>
        )}
      </main>

      <div className="slide-controls">
        <button onClick={() => goTo(active - 1)} disabled={active === 0}>↑</button>
        <button onClick={() => goTo(active + 1)} disabled={active === slides.length - 1}>↓</button>
      </div>
      <div className="scroll-hint">{active < 7 ? "SCROLL TO TURN PAGE" : "END OF ISSUE"}</div>
    </div>
  );
}

function PageChrome({ slide }: { slide: Slide }) {
  return <div className="page-chrome"><span>{slide.number} / 08</span><span>{slide.label}</span><span>PORTOVOLIO / 2026</span></div>;
}
