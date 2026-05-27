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
          <p className="text-muted-foreground text-lg mb-8">
            Recebemos seu cadastro. Em breve nosso time entrará em contato para
            liberar seu teste do Copiloto.
          </p>
          <a
            href="https://wa.me/5511920858010"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full rounded-xl bg-[#25D366] px-6 py-4 text-white font-extrabold text-lg hover:brightness-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar com a equipe no WhatsApp
          </a>
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
