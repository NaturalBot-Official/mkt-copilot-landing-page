import { Brain, Languages, Monitor, MessageSquareText } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

const benefits = [
  {
    icon: Brain,
    title: "Inteligência Artificial",
    desc: "Automatize do atendimento à cobrança com uma IA treinada para o seu restaurante.",
  },
  {
    icon: Languages,
    title: "Atendimento Multilíngue",
    desc: "Atenda clientes em mais de 60 idiomas, sem perder o tom da sua marca.",
  },
  {
    icon: Monitor,
    title: "Integração com Monitores",
    desc: "Pedidos enviados direto para o KDS na cozinha, agilizando a operação.",
  },
  {
    icon: MessageSquareText,
    title: "Linguagem Personalizada",
    desc: "Defina o tom de voz e o arquétipo da sua marca para um atendimento único.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background py-5">
        <div className="container flex items-center justify-center">
          <a href="/" className="flex items-center gap-2" aria-label="NaturalBot">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-cta text-purple-foreground">
              <MessageSquareText className="size-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-foreground">Natural</span>
              <span className="text-magenta">Bot</span>
            </span>
          </a>
        </div>
      </header>

      {/* Hero with magenta full-bleed sides + orange center block */}
      <section className="relative bg-magenta">
        <div className="container py-10 sm:py-14 lg:py-20">
          <div className="rounded-2xl bg-gradient-hero p-6 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="text-orange-foreground">
                <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  Se você é dono de Restaurante,{" "}
                  <span className="underline decoration-white/40 underline-offset-4">
                    Preencha o formulário
                  </span>
                  , faça um teste com o nosso Copiloto de vendas com IA no
                  WhatsApp.
                </h1>
                <p className="mt-5 text-lg font-medium text-orange-foreground/95 sm:text-xl">
                  Descubra porque somos a nova geração de chatbot.
                </p>
              </div>

              <div>
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="bg-background py-16 sm:py-20">
        <div className="container">
          <h2 className="mx-auto max-w-3xl text-center text-2xl font-extrabold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            Conheça a nova geração de chatbot para WhatsApp que ajuda no
            atendimento a delivery
          </h2>
          <div className="mx-auto mt-10 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-muted shadow-card">
            <iframe
              className="size-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Conheça o Copiloto NaturalBot"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Somos o 1° Copiloto de Vendas com IA para restaurantes do Brasil!
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tenha um atendimento automatizado dos seus pedidos e com uma
              linguagem mais natural.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, desc }, i) => {
              const palette = [
                "bg-magenta text-magenta-foreground",
                "bg-orange text-orange-foreground",
                "bg-purple text-purple-foreground",
                "bg-foreground text-background",
              ][i];
              return (
                <article
                  key={title}
                  className="rounded-2xl bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
                >
                  <div
                    className={`mb-4 flex size-12 items-center justify-center rounded-xl ${palette}`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-8 text-background/80">
        <div className="container flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} NaturalBot — Copiloto de vendas com IA
            para restaurantes.
          </p>
          <p className="text-background/60">Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
