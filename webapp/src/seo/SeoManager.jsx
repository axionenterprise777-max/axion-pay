import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageMetadata } from "./usePageMetadata.js";

const ROUTE_META = [
  {
    match: (path) => path === "/",
    meta: {
      title: "AxionPAY | Gateway comercial com checkout white-label",
      description: "Plataforma AxionPAY para operar gateway, SDK e checkout comercial personalizado para clientes dos seus clientes.",
      keywords: "gateway, checkout white-label, sdk pagamentos, pix, cartao, api"
    }
  },
  {
    match: (path) => path.startsWith("/products"),
    meta: {
      title: "AxionPAY | Produtos e APIs avancadas",
      description: "Integracoes modernas de split, antifraude e recorrencia para squads que precisam de controle total sobre recebimentos."
    }
  },
  {
    match: (path) => path.startsWith("/dashboard"),
    meta: {
      title: "AxionPAY | Painel do cliente",
      description: "Painel operacional com acesso a pay-tags, repasses e suporte com visibilidade de ponta a ponta."
    }
  },
  {
    match: (path) => path === "/support",
    meta: {
      title: "AxionPAY | Suporte e atendimento",
      description: "Central de atendimento AxionPAY com chat, WhatsApp e tickets para operacoes comerciais."
    }
  },
  {
    match: (path) => path === "/status",
    meta: {
      title: "AxionPAY | Status da API",
      description: "Status de disponibilidade, latencia e indicadores de saude dos servicos AxionPAY."
    }
  },
  {
    match: (path) => path === "/pay-tags",
    meta: {
      title: "AxionPAY | Pay-tags inteligentes",
      description: "Crie e monitore canais dedicados com pay-tags exclusivas, roteamento seguro e tracking granular."
    }
  },
  {
    match: (path) => path === "/docs",
    meta: {
      title: "AxionPAY | SDK e documentacao oficial",
      description: "Guia tecnico com SDK AxionPAY, API REST, webhooks e fluxo comercial para checkout white-label.",
      keywords: "sdk axionpay, documentacao api, webhook, checkout comercial"
    }
  },
  {
    match: (path) => path.startsWith("/checkout"),
    meta: {
      title: "AxionPAY | Checkout comercial personalizado",
      description: "Publique /checkout/{slug} com identidade do cliente, modos black/white, PIX e cartao para operacoes comerciais.",
      keywords: "checkout white-label, pix, cartao, operacao comercial"
    }
  }
];

const DEFAULT_SITE_URL = "https://pay.axionenterprise.cloud";
const resolvedOrigin = typeof window !== "undefined" ? window.location.origin : DEFAULT_SITE_URL;
const canonicalOrigin =
  resolvedOrigin && resolvedOrigin.includes("localhost") ? DEFAULT_SITE_URL : resolvedOrigin;
const baseUrl = canonicalOrigin || DEFAULT_SITE_URL;
const baseLogo = `${baseUrl}/axionpay_logo.transparent.png`;
const baseOgImage = `${baseUrl}/og/og-image-1200x630.png`;

export default function SeoManager() {
  const location = useLocation();
  const routeMeta = useMemo(() => {
    const matcher = ROUTE_META.find((entry) => entry.match(location.pathname));
    return matcher ? matcher.meta : {};
  }, [location.pathname]);

  const canonicalUrl = `${baseUrl}${location.pathname}`;
  const schemaDescription =
    routeMeta.description ||
    "Receba, monitore e reconcilie pagamentos com o AxionPAY, gateway brasileiro focado em PIX, cartao e checkout white-label.";

  const schemaData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AxionPAY",
      url: canonicalUrl,
      logo: baseLogo,
      description: schemaDescription,
      sameAs: ["https://pay.axionenterprise.cloud", "https://docs.axionenterprise.cloud"]
    }),
    [canonicalUrl, schemaDescription]
  );

  useEffect(() => {
    const scriptId = "axionpay-schema";
    let schemaScript = document.head.querySelector(`#${scriptId}`);
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = scriptId;
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaData);
  }, [schemaData]);

  usePageMetadata({
    title: routeMeta.title,
    description: routeMeta.description,
    keywords: routeMeta.keywords,
    url: canonicalUrl,
    image: baseOgImage
  });

  return null;
}
