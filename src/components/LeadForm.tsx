import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SEGMENTOS = [
  "Açaí / Sorvetes",
  "Culinária oriental",
  "Esfiharia / Árabe",
  "Hamburgueria",
  "Lanches / Saladas",
  "Marmitas / Prato feito",
  "Padaria / Confeitaria",
  "Pizzaria",
  "Outro",
] as const;

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  celular: z
    .string()
    .trim()
    .min(14, "Celular incompleto")
    .max(20, "Celular inválido"),
  gerencia_restaurante: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),
  trabalha_delivery: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),
  segmento: z.string().min(1, "Selecione um segmento"),
  captcha: z.string().min(1, "Resolva o captcha"),
  consentimento: z.literal(true, {
    message: "É necessário aceitar para continuar",
  }),
});

type FormValues = z.infer<typeof schema>;

function maskCelular(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });

  const regenCaptcha = () => {
    setCaptcha({
      a: Math.floor(Math.random() * 15) + 1,
      b: Math.floor(Math.random() * 15) + 1,
    });
  };

  useEffect(() => {
    regenCaptcha();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      celular: "",
      segmento: "",
      captcha: "",
    },
  });

  const captchaAnswer = useMemo(() => captcha.a + captcha.b, [captcha]);

  const onSubmit = async (values: FormValues) => {
    if (parseInt(values.captcha, 10) !== captchaAnswer) {
      form.setError("captcha", { message: "Resposta incorreta" });
      regenCaptcha();
      return;
    }

    const { error } = await supabase.from("leads").insert([
      {
        nome: values.nome,
        email: values.email,
        celular: values.celular,
        segmento: values.segmento,
        gerencia_restaurante: values.gerencia_restaurante === "sim",
        trabalha_delivery: values.trabalha_delivery === "sim",
        consentimento: values.consentimento,
      },
    ]);

    if (error) {
      toast.error("Erro ao enviar. Tente novamente em instantes.");
      return;
    }

    toast.success("Cadastro enviado com sucesso!");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-card p-10 text-center shadow-card">
        <CheckCircle2 className="mx-auto mb-4 size-14 text-purple" />
        <h3 className="mb-2 text-2xl font-extrabold text-foreground">
          Obrigado!
        </h3>
        <p className="text-muted-foreground">
          Recebemos seu cadastro. Em breve nosso time entrará em contato para
          liberar seu teste do Copiloto.
        </p>
      </div>
    );
  }

  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="rounded-2xl bg-card p-6 shadow-card sm:p-8"
      noValidate
    >
      <div className="space-y-5">
        <div>
          <Label htmlFor="nome" className="mb-1.5 block">
            Nome <span className="text-magenta">*</span>
          </Label>
          <Input id="nome" {...form.register("nome")} maxLength={120} />
          {errors.nome && (
            <p className="mt-1 text-xs text-destructive">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="mb-1.5 block">
            Email <span className="text-magenta">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            maxLength={255}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="celular" className="mb-1.5 block">
            Celular <span className="text-magenta">*</span>
          </Label>
          <div className="flex gap-2">
            <div className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm">
              <span aria-hidden>🇧🇷</span>
              <span className="text-muted-foreground">+55</span>
            </div>
            <Input
              id="celular"
              inputMode="tel"
              placeholder="(11) 90000-0000"
              {...form.register("celular", {
                onChange: (e) => {
                  e.target.value = maskCelular(e.target.value);
                },
              })}
            />
          </div>
          {errors.celular && (
            <p className="mt-1 text-xs text-destructive">
              {errors.celular.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-1.5 block">
            Você trabalha, gerencia ou é dono de uma operação de restaurante?{" "}
            <span className="text-magenta">*</span>
          </Label>
          <Select
            onValueChange={(v) =>
              form.setValue("gerencia_restaurante", v as "sim" | "nao", {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sim">Sim</SelectItem>
              <SelectItem value="nao">Não</SelectItem>
            </SelectContent>
          </Select>
          {errors.gerencia_restaurante && (
            <p className="mt-1 text-xs text-destructive">
              {errors.gerencia_restaurante.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 block">
            Trabalha com delivery? <span className="text-magenta">*</span>
          </Label>
          <RadioGroup
            onValueChange={(v) =>
              form.setValue("trabalha_delivery", v as "sim" | "nao", {
                shouldValidate: true,
              })
            }
            className="flex gap-6"
          >
            <label className="flex cursor-pointer items-center gap-2">
              <RadioGroupItem value="sim" id="del-sim" />
              <span>Sim</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <RadioGroupItem value="nao" id="del-nao" />
              <span>Não</span>
            </label>
          </RadioGroup>
          {errors.trabalha_delivery && (
            <p className="mt-1 text-xs text-destructive">
              {errors.trabalha_delivery.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-1.5 block">
            Segmento de atuação <span className="text-magenta">*</span>
          </Label>
          <Select
            onValueChange={(v) =>
              form.setValue("segmento", v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu segmento" />
            </SelectTrigger>
            <SelectContent>
              {SEGMENTOS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.segmento && (
            <p className="mt-1 text-xs text-destructive">
              {errors.segmento.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="captcha" className="mb-1.5 block">
            Quanto é{" "}
            <span className="font-bold text-foreground">
              {captcha.a} + {captcha.b}
            </span>
            ? <span className="text-magenta">*</span>
          </Label>
          <Input
            id="captcha"
            inputMode="numeric"
            {...form.register("captcha")}
            maxLength={3}
          />
          {errors.captcha && (
            <p className="mt-1 text-xs text-destructive">
              {errors.captcha.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="consent"
            onCheckedChange={(c) =>
              form.setValue("consentimento", c === true ? true : (false as unknown as true), {
                shouldValidate: true,
              })
            }
          />
          <Label
            htmlFor="consent"
            className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
          >
            Concordo em receber comunicações da NaturalBot e autorizo o uso dos
            meus dados conforme a Política de Privacidade (LGPD).
          </Label>
        </div>
        {errors.consentimento && (
          <p className="-mt-2 text-xs text-destructive">
            {errors.consentimento.message as string}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-md bg-gradient-cta text-base font-extrabold uppercase tracking-wide text-purple-foreground shadow-cta hover:opacity-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Enviando...
            </>
          ) : (
            "Testar Copiloto"
          )}
        </Button>

        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          Seus dados estão protegidos. Não enviamos spam.
        </p>
      </div>
    </form>
  );
};
