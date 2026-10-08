import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Eye,
  HeartHandshake,
  Leaf,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const queryClient = new QueryClient();

const questions = [
  {
    question: '¿SAVIA BO reemplaza la batería de riesgo psicosocial?',
    answer:
      'No. SAVIA BO se presenta como una ayuda organizacional de alerta temprana para orientar conversaciones preventivas. No es un instrumento diagnóstico clínico ni sustituye la evaluación de factores de riesgo psicosocial exigida por la normativa aplicable.',
  },
  {
    question: '¿Qué reciben los equipos de talento humano y SST?',
    answer:
      'La oferta comunicada por SAVIA BO incluye una lectura agregada de señales y contexto de trabajo para apoyar la conversación preventiva. Los detalles de alcance, acceso y tratamiento de información deben confirmarse directamente con el equipo antes de implementarla.',
  },
  {
    question: '¿La evaluación diagnostica a las personas?',
    answer:
      'No. Su propósito no es evaluar clínicamente, etiquetar ni diagnosticar a una persona. Es una instancia para escuchar señales relacionadas con la experiencia laboral y ayudar a orientar conversaciones con cuidado.',
  },
  {
    question: '¿Cuánto tarda la evaluación?',
    answer:
      'La información comercial actual de SAVIA BO indica una duración aproximada de 12 a 18 minutos. Confirma con el equipo el formato y los tiempos aplicables a tu organización.',
  },
];

function ContactActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`contact-actions${compact ? ' contact-actions-compact' : ''}`}>
      <a
        className="button button-primary"
        href="https://wa.me/573158921112?text=Hola%2C%20quisiera%20conocer%20SAVIA%20BO"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-demo-whatsapp"
      >
        <MessageCircle size={17} strokeWidth={1.8} />
        Solicitar una demo
        <ArrowRight size={16} strokeWidth={1.8} />
      </a>
      <a
        className="email-link"
        href="mailto:contacto@savia-bo.com?subject=Consulta%20sobre%20SAVIA%20BO"
        data-testid="link-contacto-email"
      >
        Prefiero escribir por correo <ArrowRight size={15} />
      </a>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" />
        Tecnología colombiana para conversaciones preventivas más informadas
      </div>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="SAVIA BO, ir al inicio" onClick={closeMenu} data-testid="link-brand-home">
          <span className="brand-mark"><Leaf size={21} strokeWidth={2.2} /></span>
          <span className="brand-word">SAVIA<span>BO</span></span>
        </a>
        <button className="mobile-menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
          <a href="#enfoque" onClick={closeMenu} data-testid="link-nav-enfoque">Nuestro enfoque</a>
          <a href="#como-funciona" onClick={closeMenu} data-testid="link-nav-como-funciona">Cómo funciona</a>
          <a href="#para-quien" onClick={closeMenu} data-testid="link-nav-audiencia">Para quién</a>
          <a href="#preguntas" onClick={closeMenu} data-testid="link-nav-preguntas">Preguntas</a>
          <a className="nav-cta" href="#contacto" onClick={closeMenu} data-testid="link-nav-contacto">Conversemos <ArrowRight size={15} /></a>
        </nav>
      </header>

      <main>
      <section className="hero section-wrap" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> BIENESTAR COGNITIVO EN EL TRABAJO</div>
          <h1>Ver lo que el trabajo también <em>nos hace sentir.</em></h1>
          <p className="hero-intro">
            SAVIA BO ayuda a equipos de talento humano y SST a reconocer señales del bienestar cognitivo y del contexto laboral que merecen una conversación preventiva.
          </p>
          <div className="hero-actions">
            <a href="#contacto" className="button button-primary" data-testid="link-hero-demo">Conoce SAVIA BO <ArrowRight size={17} /></a>
            <a href="#enfoque" className="text-link" data-testid="link-hero-enfoque">Descubre el enfoque <ArrowDown size={15} /></a>
          </div>
          <div className="hero-footnote"><span className="tiny-leaf"><Leaf size={14} /></span> Una mirada organizacional. Sin etiquetas ni diagnósticos clínicos.</div>
        </div>

          <div className="hero-art" aria-label="Ilustración abstracta de señales que se conectan alrededor del bienestar en el trabajo" role="img" data-testid="illustration-wellbeing">
          <div className="art-grid" />
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-sun"><span /></div>
          <div className="art-leaf leaf-a"><Leaf /></div>
          <div className="art-leaf leaf-b"><Leaf /></div>
          <div className="art-leaf leaf-c"><Leaf /></div>
          <div className="art-node node-a"><span>ritmo</span><b /></div>
          <div className="art-node node-b"><span>atención</span><b /></div>
          <div className="art-node node-c"><span>contexto</span><b /></div>
          <div className="art-note"><span className="note-icon"><Sparkles size={16} /></span><span>Señales que abren<br />mejores conversaciones</span></div>
          <div className="art-label">UNA MIRADA MÁS HUMANA AL TRABAJO</div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Qué aporta SAVIA BO">
        <div><span className="strip-number">01</span><p>Observar señales<br /><strong>más allá de lo evidente</strong></p></div>
        <span className="strip-divider" />
        <div><span className="strip-number">02</span><p>Entender el trabajo<br /><strong>en su contexto cotidiano</strong></p></div>
        <span className="strip-divider" />
        <div><span className="strip-number">03</span><p>Conversar a tiempo<br /><strong>con información útil</strong></p></div>
      </section>

      <section className="section-wrap story-section" id="enfoque">
        <div className="section-kicker">01 — EL PUNTO DE PARTIDA</div>
        <div className="story-layout">
          <h2>La prevención también empieza por <em>escuchar.</em></h2>
          <div className="story-aside">
            <p>Los indicadores habituales cuentan una parte. La forma en que las personas viven su trabajo —su carga, su ritmo, su capacidad de enfocarse— también puede aportar contexto.</p>
            <p>SAVIA BO busca hacer visibles esas señales para que las organizaciones puedan abrir conversaciones más oportunas y mejor informadas.</p>
          </div>
        </div>
        <div className="statement-band">
          <div className="statement-symbol"><Eye size={28} strokeWidth={1.45} /></div>
          <p>No se trata de ponerle nombre a una persona.<br /><strong>Se trata de mirar mejor el entorno que compartimos.</strong></p>
          <span className="statement-mark">S.</span>
        </div>
      </section>

      <section className="method-section" id="como-funciona">
        <div className="section-wrap">
          <div className="section-kicker light-kicker">02 — UNA RUTA SENCILLA</div>
          <div className="method-heading">
            <h2>De la señal<br />a la conversación.</h2>
            <p>Una herramienta de apoyo para equipos que quieren sumar contexto a su trabajo preventivo.</p>
          </div>
          <div className="method-steps">
            <article className="method-step">
              <span className="step-index">A</span>
              <div className="step-icon"><Compass size={22} /></div>
              <h3>Escuchar</h3>
              <p>Las personas responden una evaluación orientada a señales de bienestar cognitivo y experiencia de trabajo. La información comercial actual describe 12 dimensiones y una duración aproximada de 12 a 18 minutos.</p>
              <span className="step-foot">La empresa informa su alcance y condiciones antes de comenzar.</span>
            </article>
            <article className="method-step">
              <span className="step-index">B</span>
              <div className="step-icon"><Eye size={22} /></div>
              <h3>Observar</h3>
              <p>La oferta actual de SAVIA BO contempla una lectura organizacional agregada para apoyar la comprensión del contexto.</p>
              <span className="step-foot">No busca diagnosticar ni etiquetar a una persona.</span>
            </article>
            <article className="method-step">
              <span className="step-index">C</span>
              <div className="step-icon"><HeartHandshake size={22} /></div>
              <h3>Conversar</h3>
              <p>Los equipos pueden usar esa información como punto de partida para conversaciones preventivas cuidadosas.</p>
              <span className="step-foot">La decisión y las acciones siguen siendo de la organización.</span>
            </article>
          </div>
          <div className="method-caption"><span /> La plataforma acompaña la conversación; no la reemplaza.</div>
        </div>
      </section>

      <section className="section-wrap audience-section" id="para-quien">
        <div className="audience-intro">
          <div className="section-kicker">03 — PARA QUIÉN</div>
          <h2>Un mismo lugar de trabajo.<br /><em>Distintas responsabilidades.</em></h2>
          <p>Una conversación útil conecta a quienes cuidan la experiencia cotidiana con quienes construyen la prevención.</p>
        </div>
        <div className="audience-list">
          <article className="audience-item">
            <span className="audience-count">01</span>
            <div><h3>Talento humano</h3><p>Sumar una perspectiva sobre las condiciones cotidianas que acompañan la experiencia de las personas.</p></div>
            <ArrowRight className="audience-arrow" size={18} />
          </article>
          <article className="audience-item">
            <span className="audience-count">02</span>
            <div><h3>Equipos de SST</h3><p>Explorar señales organizacionales como complemento al trabajo preventivo existente, no como reemplazo.</p></div>
            <ArrowRight className="audience-arrow" size={18} />
          </article>
          <article className="audience-item">
            <span className="audience-count">03</span>
            <div><h3>Personas trabajadoras</h3><p>Participar en una escucha sobre su experiencia laboral dentro del alcance que informe su organización.</p></div>
            <ArrowRight className="audience-arrow" size={18} />
          </article>
        </div>
      </section>

      <section className="trust-section">
        <div className="section-wrap trust-layout">
          <div className="trust-copy">
            <div className="section-kicker">04 — CLARIDAD, DESDE EL INICIO</div>
            <h2>Una herramienta de apoyo.<br /><em>No una respuesta automática.</em></h2>
            <p>El bienestar en el trabajo es complejo. SAVIA BO propone sumar señales para conversar mejor, con límites claros sobre lo que una plataforma puede y no puede decir.</p>
          <a className="text-link dark-link" href="#preguntas" data-testid="link-trust-faq">Leer preguntas frecuentes <ArrowRight size={16} /></a>
          </div>
          <div className="trust-card">
            <div className="trust-card-heading"><ShieldCheck size={20} /><span>LO QUE CONVIENE SABER</span></div>
            <div className="trust-point"><Check size={16} /><p>Es una ayuda organizacional de alerta temprana, según la descripción actual de SAVIA BO.</p></div>
            <div className="trust-point"><Check size={16} /><p>No es diagnóstico clínico ni sustituye evaluaciones obligatorias de riesgo psicosocial.</p></div>
            <div className="trust-point"><Check size={16} /><p>No afirmamos aquí eficacia científica validada, cumplimiento legal, reducción de accidentes ni retorno garantizado.</p></div>
            <div className="trust-foot">Pide al equipo comercial detalles de alcance, privacidad, metodología y condiciones antes de decidir.</div>
          </div>
        </div>
      </section>

      <section className="section-wrap faq-section" id="preguntas">
        <div className="faq-intro">
          <div className="section-kicker">05 — PREGUNTAS FRECUENTES</div>
          <h2>Lo importante,<br /><em>sin letra pequeña.</em></h2>
          <p>Si estás evaluando la herramienta, empieza por entender bien qué ofrece y cuáles son sus límites.</p>
        </div>
        <div className="faq-list">
          {questions.map((item, index) => (
            <article className={`faq-item${openQuestion === index ? ' is-open' : ''}`} key={item.question}>
              <button aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? null : index)} data-testid={`button-faq-${index + 1}`}>
                <span>{item.question}</span><ChevronDown size={19} />
              </button>
              {openQuestion === index && <p>{item.answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="contact-orb orb-left" />
        <div className="contact-orb orb-right" />
        <div className="section-wrap contact-content">
          <div className="contact-kicker"><span /> SIGUIENTE PASO</div>
          <h2>Una mejor conversación<br />puede empezar <em>hoy.</em></h2>
          <p>Cuéntanos qué necesita tu organización. Conversemos sobre el alcance, el funcionamiento y las condiciones antes de dar el siguiente paso.</p>
          <ContactActions />
          <div className="contact-small">Sin formularios automáticos. Una conversación directa con el equipo SAVIA BO.</div>
        </div>
        <div className="contact-side-note">PREVENCIÓN CON CONTEXTO · COLOMBIA</div>
      </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio" aria-label="SAVIA BO, volver al inicio" data-testid="link-footer-home">
          <span className="brand-mark"><Leaf size={19} strokeWidth={2.2} /></span>
          <span className="brand-word">SAVIA<span>BO</span></span>
        </a>
        <p>Una mirada más humana al trabajo.</p>
        <div className="footer-right"><span>Hecho en Colombia</span><a href="#inicio" data-testid="link-footer-top">Volver arriba ↑</a></div>
      </footer>
      <aside className="disclaimer"><ShieldCheck size={15} /><p>SAVIA BO es una herramienta de apoyo organizacional. No es un instrumento diagnóstico clínico ni sustituye las evaluaciones de riesgo psicosocial que sean legalmente requeridas. Confirma directamente con SAVIA BO las características, condiciones de privacidad y alcance de su oferta.</p></aside>
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
