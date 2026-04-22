ALTER TABLE public.leads
  ADD CONSTRAINT leads_nome_len CHECK (char_length(nome) BETWEEN 1 AND 120),
  ADD CONSTRAINT leads_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT leads_celular_len CHECK (char_length(celular) BETWEEN 8 AND 30),
  ADD CONSTRAINT leads_segmento_len CHECK (char_length(segmento) BETWEEN 1 AND 60),
  ADD CONSTRAINT leads_consent_true CHECK (consentimento = true);