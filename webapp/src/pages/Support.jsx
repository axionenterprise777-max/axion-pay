import "./styles/MarketingPages.css";

const supportChannels = [
  {
    title: "Squad prioritario",
    description:
      "Onboarding, ajuste de limite, risco e roteamento comercial com resposta humana no mesmo fluxo da operacao.",
    action: "Acionar squad",
    href: "https://wa.me/5511933331462?text=Quero%20suporte%20AxionPAY",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 12a8 8 0 0 1-11.8 7l-4.2 1 1-4.2A8 8 0 1 1 20 12Z" />
        <path d="M9.5 10.5c.6 1.5 2.5 3.4 4 4" />
        <path d="M14.6 14.4c.4.2.9.2 1.3 0l1-.7" />
      </svg>
    )
  },
  {
    title: "Playbooks tecnicos",
    description:
      "SDK, exemplos de webhook, Pix, cartao, split e idempotencia organizados para liberar o time de integracao sem atrito.",
    action: "Abrir docs",
    href: "/docs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5" />
        <path d="M10 13h6" />
        <path d="M10 17h4" />
      </svg>
    )
  },
  {
    title: "Escalada em painel",
    description:
      "Casos de conciliacao, chargeback, liquidacao e rastreio sobem direto da dashboard para um canal administrado.",
    action: "Ir para dashboard",
    href: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="3" />
        <path d="M7 20h10" />
        <path d="M9 10h2v4H9zM13 8h2v6h-2zM17 11h2v3h-2z" />
      </svg>
    )
  }
];

export default function Support() {
  return (
    <section className="marketingPage">
      <section className="marketingPanel marketingHero">
        <span className="marketingGlow one" aria-hidden="true" />
        <span className="marketingGlow two" aria-hidden="true" />
        <div className="marketingHeroGrid">
          <div className="marketingCopy">
            <div className="marketingLabel">
              <span className="marketingLabelDot" />
              suporte ativo
            </div>
            <h1>
              Operacao e <span>suporte de receita</span> no mesmo painel.
            </h1>
            <p>
              O suporte do AxionPAY nao fica isolado em ticket. Comercial, risco, integracao e operacao recebem
              contexto da transacao para reduzir tempo de resposta e evitar retrabalho.
            </p>
            <div className="marketingActionRow">
              <a className="marketingBtn primary" href="https://wa.me/5511933331462?text=Quero%20suporte%20AxionPAY">
                Falar com especialista
              </a>
              <a className="marketingBtn" href="/docs">
                Ver base tecnica
              </a>
            </div>
            <div className="marketingMetrics">
              <article className="marketingMetric">
                <strong>24/7</strong>
                <span>Cobertura operacional</span>
              </article>
              <article className="marketingMetric">
                <strong>&lt; 15min</strong>
                <span>Primeira resposta</span>
              </article>
              <article className="marketingMetric">
                <strong>1 fluxo</strong>
                <span>Suporte + compliance</span>
              </article>
            </div>
          </div>

          <div className="marketingTerminal" aria-label="Fluxo de atendimento">
            <div className="marketingTerminalTop">
              <div className="marketingTerminalDots">
                <span />
                <span />
                <span />
              </div>
              <p>support_session.axp</p>
            </div>
            <div className="marketingTerminalBody">
              <div className="marketingTerminalLine">
                <small>conta</small>
                <strong>merchant_pro_018</strong>
                <code>ticket.open --channel whatsapp</code>
              </div>
              <div className="marketingTerminalLine">
                <small>contexto</small>
                <strong>pix delayed / split rule / webhook retry</strong>
                <code>trace_id axp_34f91c</code>
              </div>
              <div className="marketingTerminalLine">
                <small>acao</small>
                <strong>risco e operacao sincronizados</strong>
                <code>sla first_response=09m12s</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marketingPanel marketingSection">
        <div className="marketingSectionHeader">
          <div>
            <div className="marketingLabel">
              <span className="marketingLabelDot" />
              canais
            </div>
            <h2>Entradas prontas para resolver rapido</h2>
          </div>
          <p>Todos os canais sao pensados para pagamento, onboarding e conciliacao, nao para suporte generico.</p>
        </div>

        <div className="marketingGrid">
          {supportChannels.map((channel) => (
            <article key={channel.title} className="marketingCard">
              <div className="marketingCardHead">
                <div className="marketingIcon">{channel.icon}</div>
                <h3>{channel.title}</h3>
              </div>
              <p>{channel.description}</p>
              <a className="marketingLink" href={channel.href}>
                {channel.action} <span aria-hidden="true">-&gt;</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
