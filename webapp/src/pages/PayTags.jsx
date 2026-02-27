import "./styles/MarketingPages.css";

const tagCards = [
  {
    title: "Criacao por canal",
    description:
      "Publique pay-tags separadas por campanha, vendedor, filial ou produto e mantenha regras de split isoladas.",
    endpoint: "POST /account/pay-tags"
  },
  {
    title: "Controle de ativacao",
    description:
      "Ligue e desligue tags com prioridade de roteamento, expiracao e bloqueio de concorrencia para evitar uso duplicado.",
    endpoint: "PATCH /account/pay-tags/:id"
  },
  {
    title: "Checkout white-label",
    description:
      "Cada tag pode expor identidade visual, campos, PIX copia e cola e cartao com checkout comercial para o cliente final.",
    endpoint: "GET /checkout/:slug"
  }
];

const liveTags = [
  { tag: "insta-premium", route: "pix > split_marketplace", status: "ok" },
  { tag: "crm-b2b-abril", route: "card > anti-fraud tier 2", status: "info" },
  { tag: "loja-centro", route: "pix + fallback boleto", status: "warn" }
];

export default function PayTags() {
  return (
    <section className="marketingPage">
      <section className="marketingPanel marketingHero">
        <span className="marketingGlow one" aria-hidden="true" />
        <span className="marketingGlow two" aria-hidden="true" />
        <div className="marketingHeroGrid">
          <div className="marketingCopy">
            <div className="marketingLabel">
              <span className="marketingLabelDot" />
              pay tags
            </div>
            <h1>
              Tokens de venda com <span>roteamento comercial</span> e identidade propria.
            </h1>
            <p>
              As pay-tags do AxionPAY encapsulam checkout, split, regras de aprovacao e canal de captura para que cada
              cliente opere o proprio fluxo sem duplicar integracao.
            </p>
            <div className="marketingActionRow">
              <a className="marketingBtn primary" href="/dashboard">
                Gerenciar tags
              </a>
              <a className="marketingBtn" href="/docs">
                Ver endpoints
              </a>
            </div>
            <div className="marketingMetrics">
              <article className="marketingMetric">
                <strong>1 tag</strong>
                <span>1 canal dedicado</span>
              </article>
              <article className="marketingMetric">
                <strong>slug</strong>
                <span>Checkout publico</span>
              </article>
              <article className="marketingMetric">
                <strong>split</strong>
                <span>Repasse embutido</span>
              </article>
            </div>
          </div>

          <div className="marketingTerminal" aria-label="Preview de pay tag">
            <div className="marketingTerminalTop">
              <div className="marketingTerminalDots">
                <span />
                <span />
                <span />
              </div>
              <p>tag_router.axp</p>
            </div>
            <div className="marketingTerminalBody">
              <div className="marketingTerminalLine">
                <small>tag</small>
                <strong>insta-premium</strong>
                <code>checkout /c/insta-premium</code>
              </div>
              <div className="marketingTerminalLine">
                <small>rota</small>
                <strong>pix first / card fallback / split 12%</strong>
                <code>brand theme cyan-neon</code>
              </div>
              <div className="marketingTerminalLine">
                <small>protecoes</small>
                <strong>single active session + anti replay</strong>
                <code>token ttl 15m</code>
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
              fluxo
            </div>
            <h2>Camadas que transformam a tag em canal de receita</h2>
          </div>
          <p>O mesmo objeto publica a oferta, governa o roteamento e preserva a experiencia do comprador.</p>
        </div>

        <div className="marketingGrid">
          {tagCards.map((card) => (
            <article key={card.title} className="marketingCard">
              <div className="marketingCardHead">
                <div className="marketingIcon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 7.5 12 3l8 4.5-8 4.5L4 7.5Z" />
                    <path d="M4 12l8 4.5 8-4.5" />
                    <path d="M4 16.5 12 21l8-4.5" />
                  </svg>
                </div>
                <h3>{card.title}</h3>
              </div>
              <p>{card.description}</p>
              <a className="marketingLink" href="/docs">
                <code>{card.endpoint}</code>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="marketingPanel marketingSection">
        <div className="marketingSectionHeader">
          <div>
            <div className="marketingLabel">
              <span className="marketingLabelDot" />
              ao vivo
            </div>
            <h2>Tags ativas e regras aplicadas</h2>
          </div>
          <p>Visual pronto para o time comercial entender para onde cada venda esta sendo direcionada.</p>
        </div>

        <article className="marketingListCard">
          <div className="marketingRows">
            {liveTags.map((item) => (
              <div key={item.tag} className="marketingRow">
                <span className={`marketingRowBadge ${item.status}`}>{item.status}</span>
                <div>
                  <strong>{item.tag}</strong>
                  <small>{item.route}</small>
                </div>
                <small>public checkout</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}
