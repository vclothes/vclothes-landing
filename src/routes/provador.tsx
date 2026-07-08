import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Mail, ArrowLeft } from "lucide-react";

import logoVClothes from "@/assets/logo-vclothes.png";

export const Route = createFileRoute("/provador")({
  head: () => ({
    meta: [
      { title: "Provador virtual — V-Clothes" },
      {
        name: "description",
        content:
          "O provador virtual da V-Clothes está em construção, com medidas extraídas via API da 3DLOOK. Em breve por aqui.",
      },
    ],
  }),
  component: Provador,
});

function Provador() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b hairline">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={logoVClothes}
              alt="V-Clothes"
              className="h-9 w-9 object-contain transition-transform duration-300 group-hover:rotate-6"
              width={1024}
              height={1024}
            />
            <span className="text-display text-2xl tracking-tight">V-Clothes</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o site
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="text-mono mb-6 text-primary">Em construção</div>
          <h1 className="text-display text-5xl text-ink md:text-6xl">
            O provador virtual
            <br />
            <span className="italic text-primary">está sendo montado.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Estamos construindo essa parte agora — o upload das fotos, a extração de medidas com a
            API da 3DLOOK e a geração do provador. Assim que estiver pronto pra testar, avisamos
            primeiro quem segue a gente.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://instagram.com/vclothes_pjt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Instagram className="h-4 w-4" />
              @vclothes_pjt
            </a>
            <a
              href="mailto:virtual.clothess@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border hairline px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Mail className="h-4 w-4" />
              virtual.clothess@gmail.com
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t hairline py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
          <span className="text-mono text-muted-foreground">
            Um projeto CEAP · Pedreira, SP
          </span>
        </div>
      </footer>
    </div>
  );
}
