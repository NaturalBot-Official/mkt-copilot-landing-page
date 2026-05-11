import { CheckCircle2 } from "lucide-react";
import naturalbotLogo from "@/assets/naturalbot-logo.png";

const Obrigado = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background py-5">
        <div className="container flex items-center justify-center">
          <a href="/" aria-label="NaturalBot">
            <img
              src={naturalbotLogo}
              alt="NaturalBot - Copiloto de vendas com IA para restaurantes"
              className="h-12 w-auto sm:h-14"
            />
          </a>
        </div>
      </header>

      {/* Confirmation */}
      <section className="container flex items-center justify-center py-24">
        <div className="rounded-2xl bg-card p-10 md:p-16 text-center shadow-card max-w-lg w-full">
          <CheckCircle2 className="mx-auto mb-6 size-16 text-purple" />
          <h1 className="mb-3 text-3xl font-extrabold text-foreground">
            Obrigado!
          </h1>
          <p className="text-muted-foreground text-lg">
            Recebemos seu cadastro. Em breve nosso time entrará em contato para
            liberar seu teste do Copiloto.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Natural Bot — Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Obrigado;
