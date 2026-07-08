import { createFileRoute } from "@tanstack/react-router";
import { animate, motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Instagram, Mail, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import heroGarment from "@/assets/hero-garment.jpg";
import garmentJacket from "@/assets/garment-jacket.png";
import garmentPants from "@/assets/garment-pants.png";
import garmentHoodie from "@/assets/garment-hoodie.png";
import stepUpload from "@/assets/step-upload.jpg";
import stepSizing from "@/assets/step-sizing.jpg";
import stepTryon from "@/assets/step-tryon.jpg";
import stepTryonCutout from "@/assets/step-tryon-cutout.png";
import logoVClothes from "@/assets/logo-vclothes.png";
import ceapLogo from "@/assets/ceap-logo.png";
import ceapCampus from "@/assets/ceap-campus.jpg";
import ceapCourt from "@/assets/ceap-court.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "V-Clothes — Provador Virtual a partir de 2 fotos" },
      {
        name: "description",
        content:
          "V-Clothes é o provador virtual criado por jovens do CEAP Pedreira. Descubra o tamanho ideal de qualquer roupa a partir de duas fotos e veja como fica em você.",
      },
      { property: "og:title", content: "V-Clothes — A moda que finalmente te entende." },
      {
        property: "og:description",
        content: "Provador virtual com IA. Duas fotos, o tamanho certo, a roupa em você.",
      },
    ],
  }),
  component: Index,
});

function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src={logoVClothes}
      alt="V-Clothes"
      className={`object-contain ${className}`}
      width={1024}
      height={1024}
      loading="eager"
      decoding="async"
    />
  );
}



const navLinks = [
  { href: "#dor", label: "O problema" },
  { href: "#solucao", label: "A solução" },
  { href: "#pecas", label: "Peças" },
  { href: "#origem", label: "Nossa origem" },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-primary"
    />
  );
}

function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <ScrollProgress />
      <div className="border-b hairline bg-background/60 backdrop-blur-lg">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="group flex items-center gap-3">
            <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:rotate-6" />
            <span className="text-display text-2xl tracking-tight">V-Clothes</span>
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Fale conosco
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border hairline text-foreground transition-colors hover:bg-secondary md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-10 border-l hairline bg-card">
                <SheetTitle className="text-display text-2xl">V-Clothes</SheetTitle>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <a href={l.href} className="text-lg text-foreground">
                        {l.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <SheetClose asChild>
                  <a
                    href="#contato"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-primary-foreground"
                  >
                    Fale conosco
                  </a>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function AnimatedStat({
  target,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const format = (value: number) => value.toFixed(decimals).replace(".", ",") + suffix;
  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(format(value)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, target, decimals, suffix]);

  return (
    <div ref={ref} className="text-display text-3xl tabular-nums text-ink">
      {display}
    </div>
  );
}

const scanBackground = {
  backgroundColor: "#eaf3fa",
  backgroundImage: [
    "radial-gradient(ellipse at 50% 38%, rgba(255,255,255,0.95) 0%, rgba(207,228,240,0.55) 55%, rgba(191,216,232,0.9) 100%)",
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 1px, transparent 1px, transparent 64px)",
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 1px, transparent 1px, transparent 64px)",
    "radial-gradient(ellipse 40% 8% at 50% 92%, rgba(30,60,90,0.25) 0%, transparent 70%)",
  ].join(", "),
};

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.6], [0.14, 0.04]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });
  const smoothRotate = useSpring(rotate, { stiffness: 80, damping: 20 });

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <motion.div
        style={{ y: smoothY, opacity: watermarkOpacity }}
        className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-display whitespace-nowrap text-[14vw] font-normal leading-none text-ink/[0.04]">
          V-Clothes
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-6xl text-ink md:text-8xl"
          >
            A moda que finalmente
            <br />
            <span className="italic text-primary">te entende.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            A V-Clothes usa visão computacional para transformar duas fotos simples no seu provador
            virtual. Descubra o tamanho ideal de qualquer roupa e veja como ela fica em você —
            antes de comprar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Fale com a gente
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform group-hover:translate-x-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Ver como funciona
            </a>
          </motion.div>

          <div className="mt-16 flex items-center gap-8">
            <div>
              <AnimatedStat target={98.4} decimals={1} suffix="%" />
              <div className="text-mono mt-1 text-muted-foreground">Precisão do sizing</div>
            </div>
            <div className="h-10 w-px bg-hairline" />
            <div>
              <AnimatedStat target={2} decimals={0} suffix=" fotos" />
              <div className="text-mono mt-1 text-muted-foreground">É tudo o que precisa</div>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            style={{ y: smoothY, rotate: smoothRotate, scale }}
            className="relative aspect-[4/5] w-full"
          >
            <div
              className="absolute inset-0 rounded-3xl bg-card"
              style={{ boxShadow: "var(--shadow-editorial)" }}
            />
            <img
              src={heroGarment}
              alt="Camiseta minimalista flutuando em estúdio, iluminação azul suave"
              width={1280}
              height={1280}
              className="relative h-full w-full rounded-3xl object-cover"
            />
            <div className="absolute -bottom-4 -left-4 rounded-2xl border hairline bg-card px-4 py-3 shadow-[var(--shadow-card)]">
              <div className="text-mono text-muted-foreground">Tamanho sugerido</div>
              <div className="text-display mt-1 text-2xl">M · caimento regular</div>
            </div>
            <div className="absolute -top-3 -right-3 flex items-center gap-2 rounded-full border hairline bg-card px-3 py-1.5 shadow-[var(--shadow-card)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-mono">Live render</span>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute -right-10 top-1/3 -z-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        </div>
      </div>

      {/* marquee */}
      <div className="mt-24 overflow-hidden border-y hairline py-4">
        <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                "Visão computacional",
                "Em parceria com a 3DLOOK",
                "Zero devoluções",
                "Feito na periferia",
                "Feira de Ciências 2026",
                "Provador 3D",
              ].map((t) => (
                <span key={t} className="text-mono flex items-center gap-16 text-muted-foreground">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-primary" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pain() {
  const pains = [
    {
      stat: "92,3%",
      label: "compram roupas online com frequência",
    },
    {
      stat: "63,5%",
      label: "já deixaram de comprar uma roupa online com medo de não servir",
    },
    {
      stat: "75%",
      label: "apontam o caimento diferente da foto como a maior dificuldade ao comprar roupa online",
    },
  ];

  return (
    <section id="dor" className="border-t hairline py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="text-mono mb-4 text-primary">O problema</div>
            <h2 className="text-display text-5xl text-ink md:text-6xl">
              Comprar roupa online ainda é um tiro no escuro.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground lg:col-span-5">
            Tabelas de medidas confusas, modelagens diferentes entre marcas e a falta de
            provador digital fazem a gente comprar na esperança — e devolver na frustração.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pains.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border hairline bg-card p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="text-display text-6xl text-primary md:text-7xl">{p.stat}</div>
              <p className="mt-4 text-lg leading-snug text-foreground">{p.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-mono mt-6 text-muted-foreground">
          Fonte: pesquisa própria da equipe V-Clothes, 52 respostas.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#solucao"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Ver como a V-Clothes resolve
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform group-hover:translate-x-0.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    title: "Capture sua silhueta",
    body: "Uma foto de frente, uma de perfil. Nossa IA extrai proporções reais em segundos, sem sensores nem apps complexos.",
    img: stepUpload,
    alt: "Avatar 3D de corpo inteiro em duas poses lado a lado, dos pés à cabeça — frente e perfil",
    tags: ["2 fotos", "Sem sensores", "30 segundos"],
  },
  {
    n: "02",
    title: "Algoritmo de alfaiataria",
    body: "Suas medidas são extraídas com a tecnologia da 3DLOOK, referência mundial em escaneamento corporal, e cruzadas com a modelagem real de cada marca. A V-Clothes sugere o tamanho ideal, do P ao XG.",
    img: stepSizing,
    alt: "Silhueta humana em wireframe azul com pontos de medição",
    tags: ["3DLOOK", "Precisão", "Por marca"],
  },
  {
    n: "03",
    title: "Veja a roupa em você",
    body: "Um avatar fiel ao seu corpo experimenta a peça. Observe o caimento, o comprimento e o estilo antes de comprar.",
    img: stepTryon,
    tags: ["Avatar 3D", "Tempo real", "Antes de comprar"],
    alt: "Avatar 3D vestindo uma jaqueta em holograma azul, visualização do resultado do provador virtual",
  },
];

function Solution() {
  return (
    <section id="solucao" className="border-t hairline bg-secondary/40 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="text-mono mb-4 text-primary">A solução</div>
            <h2 className="text-display text-5xl text-ink md:text-6xl">
              Duas fotos, um provador
              <br />
              <span className="italic">e nenhuma dúvida.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground lg:col-span-4">
            A V-Clothes transforma o corpo do cliente em medidas precisas e gera um provador
            virtual. Menos devolução, menos desperdício, mais confiança.
          </p>
        </div>

        <div className="space-y-24 lg:space-y-40">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24"
            >
              <div className={`order-2 ${i % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative aspect-square overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] transition-shadow duration-400 hover:shadow-[var(--shadow-editorial)]"
                  style={i === 2 ? scanBackground : undefined}
                >
                  {i === 2 ? (
                    <div className="absolute inset-0 flex items-center justify-center p-10" style={{ perspective: 1200 }}>
                      <motion.img
                        src={stepTryonCutout}
                        alt={s.alt}
                        loading="lazy"
                        className="h-full w-auto object-contain"
                        animate={{ rotateY: [-18, 18, -18] }}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                          scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={s.img}
                      alt={s.alt}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </motion.div>
              </div>
              <div className={`order-1 ${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                <div className="text-display mb-6 text-6xl text-primary/30">{s.n}</div>
                <h3 className="text-display mb-6 text-4xl text-ink md:text-5xl">{s.title}</h3>
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{s.body}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border hairline bg-card px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const garments = [
  { img: garmentJacket, name: "Jaqueta Denim Estruturada", size: "M", tone: "float" },
  { img: garmentHoodie, name: "Moletom Oversized", size: "P", tone: "float-alt" },
  { img: garmentPants, name: "Calça Alfaiataria Suave", size: "40", tone: "float" },
];

function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section id="pecas" ref={ref} className="border-t hairline bg-secondary/40 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-mono mb-4 text-primary">Peças em rotação</div>
            <h2 className="text-display max-w-2xl text-5xl text-ink md:text-6xl">
              Cada roupa, um <span className="italic">objeto 3D</span> pronto para vestir.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Passe o mouse. Role a página. Observe como o tecido reage — como se estivesse ali,
            flutuando na sua frente.
          </p>
        </div>

        <motion.div style={{ x }} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {garments.map((g, i) => (
            <motion.article
              key={g.name}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border hairline bg-card"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden p-10">
                <img
                  src={g.img}
                  alt={g.name}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className={`h-full w-full object-contain transition-transform duration-700 group-hover:scale-105 ${
                    i % 2 === 0 ? "animate-float" : "animate-float-alt"
                  }`}
                />
              </div>
              <div className="flex items-center justify-between border-t hairline p-6">
                <div>
                  <div className="text-mono text-muted-foreground">Peça {String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-1 font-medium text-ink">{g.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-mono text-muted-foreground">Ideal</div>
                  <div className="text-display text-2xl text-primary">{g.size}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Origin() {
  return (
    <section id="origem" className="border-t hairline py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-6">
            <div className="text-mono mb-6 text-primary">Nossa origem</div>
            <h2 className="text-display text-5xl text-ink md:text-6xl">
              Estudantes de Redes construindo
              <br />
              <span className="italic">o futuro da moda</span>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Somos estudantes do curso técnico de Redes de Computadores e desenvolvemos este
              projeto para a FECEAP 2026, feira tecnológica promovida pelo CEAP, que incentiva a
              criação de soluções inovadoras conectando tecnologia e impacto real.
            </p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A V-Clothes nasceu da observação de um problema real: comprar roupas online é ainda
              uma experiência incompleta. Unindo conceitos de redes, segurança e inteligência
              artificial, construímos uma solução que coloca o usuário no centro.
            </p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Estamos abertos à troca com profissionais e empresas que queiram acompanhar e
              contribuir com a evolução do projeto, explorando juntos oportunidades de inovação e
              aplicação real.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { k: "🎓", v: "Técnico em Redes" },
                { k: "🏆", v: "FECEAP 2026" },
                { k: "🤖", v: "Indústria 5.0" },
                { k: "📍", v: "São Paulo, SP" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border hairline bg-card p-5">
                  <div className="text-display text-3xl text-ink">{s.k}</div>
                  <div className="text-mono mt-2 text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[400px] w-[520px] scale-[0.6] sm:scale-[0.85] lg:scale-100">
                  <img
                    src={ceapCampus}
                    alt="Vista aérea do campus do CEAP Pedreira"
                    loading="lazy"
                    className="absolute left-[-30px] top-[-100px] z-[1] h-[400px] w-[400px] rotate-[-5deg] rounded-xl border-4 border-white object-cover shadow-2xl transition-all duration-300 ease-out hover:z-30 hover:scale-105"
                  />
                  <img
                    src={ceapCourt}
                    alt="Quadra poliesportiva do CEAP Pedreira"
                    loading="lazy"
                    className="absolute left-[20px] top-[120px] z-[2] h-[300px] w-[500px] rotate-[4deg] rounded-xl border-4 border-white object-cover shadow-2xl transition-all duration-300 ease-out hover:z-30 hover:scale-105"
                  />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-card/95 p-4 backdrop-blur">
                <img src={ceapLogo} alt="Logo do CEAP" className="h-9 w-auto shrink-0" />
                <div>
                  <div className="text-mono text-muted-foreground">CEAP · Pedreira, SP</div>
                  <div className="mt-1 text-sm text-foreground">
                    Centro Educacional Assistencial Profissionalizante
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="border-t hairline py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-20 text-center text-primary-foreground md:px-16 md:py-28"
          style={{ boxShadow: "var(--shadow-editorial)" }}
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

          <div className="text-mono relative mb-6 text-primary-foreground/60">Fale com a gente</div>
          <h2 className="text-display relative text-5xl md:text-7xl">
            Vamos conversar
            <br />
            <span className="italic text-primary-foreground/70">sobre a V-Clothes?</span>
          </h2>
          <p className="relative mx-auto mt-8 max-w-lg text-primary-foreground/70">
            Dúvidas, parcerias ou curiosidade sobre o projeto? Manda uma mensagem no Instagram ou
            um e-mail — a gente responde.
          </p>

          <div className="relative mx-auto mt-10 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://instagram.com/vclothes_pjt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Instagram className="h-4 w-4" />
              @vclothes_pjt
            </a>
            <a
              href="mailto:virtual.clothess@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:border-primary-foreground/50"
            >
              <Mail className="h-4 w-4" />
              virtual.clothess@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t hairline py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          <span className="text-display text-lg">V-Clothes</span>
          <span className="text-mono ml-3 text-muted-foreground">© 2026</span>
        </div>
        <div className="text-mono text-muted-foreground">
          Um projeto CEAP · Pedreira, SP
        </div>
        <div className="flex gap-6">
          <a
            href="https://instagram.com/vclothes_pjt"
            target="_blank"
            rel="noreferrer"
            className="text-mono text-muted-foreground hover:text-foreground"
          >
            Instagram
          </a>
          <a
            href="mailto:virtual.clothess@gmail.com"
            className="text-mono text-muted-foreground hover:text-foreground"
          >
            E-mail
          </a>
          <a href="#contato" className="text-mono text-muted-foreground hover:text-foreground">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Solution />
        <Gallery />
        <Origin />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

