import "./styles/MarketingPages.css";

const services = [
  { name: "Pix real time", detail: "99.99% / p95 42ms", badge: "ok" },
  { name: "Cartao e antifraude", detail: "99.97% / score inline", badge: "ok" },
  { name: "Webhooks e callbacks", detail: "Fila drenando sem atraso", badge: "warn" },
  { name: "Split e repasse", detail: "Janela de conciliacao normal", badge: "info" }
];

const incidents = [
  {
    time: "09:12 BRT",
    title: "Reenvio automatico de webhooks estabilizado",
    description: "Uma fila secundaria absorveu pico de notificacoes e manteve assinaturas HMAC sem perda de ordem."
  },
  {
    time: "07:48 BRT",
    title: "Ajuste de threshold no cluster Pix",
    description: "Roteamento interno recalibrado para preservar latencia durante janela de maior liquidacao."
  },
  {
    time: "01:05 BRT",
    title: "Rotina de replica concluida",
    description: "Replica de leitura atualizada e endpoints de consulta seguiram disponiveis sem failover manual."
  }
];

export default function Status() {
  return (
    <section className="marketingPage">
      <section className="marketingPanel marketingHero">
        <span className="marketingGlow one" aria-hidden="true" />
        <span className="marketingGlow two" aria-hidden="true" />
        <div className="marketingHeroGrid">
          <div className="marketingCopy">
            <div className="marketingLabel">
              <span className="marketingLabelDot" />
              observabilidade
            </div>
            <h1>
              Estado da malha de <span>pagamentos</span> em tempo real.
            </h1>
            <p>
              Status, latencia, retries e sinais de risco ficam expostos em uma superficie unica para o time tecnico e
              para a operacao comercial acompanhar sem leitura manual de log.
            </p>
            <div className="marketingMetrics">
              <article className="marketingMetric">
                <strong>99.98%</strong>
                <span>Disponibilidade</span>
              </article>
              <article className="marketingMetric">
                <strong>58ms</strong>
                <span>Media gateway</span>
              </article>
              <article className="marketingMetric">
                <strong>4 regioes</strong>
                <span>Failover ativo</span>
              </article>
            </div>
          </div>

          <div className="marketingTerminal" aria-label="Console de status">
            <div className="marketingTerminalTop">
              <div className="marketingTerminalDots">
                <span />
                <span />
                <span />
              </div>
              <p>status.gateway.axp</p>
            </div>
            <div className="marketingTerminalBody">
              <div className="marketingTerminalLine">
                <small>pix_cluster</small>
                <strong>healthy / queue depth 03</strong>
                <code>latency_p95 42ms</code>
              </div>
              <div className="marketingTerminalLine">
                <small>webhook_bus</small>
                <strong>degraded / retry window active</strong>
                <code>retry_backoff 4s</code>
              </div>
              <div className="marketingTerminalLine">
                <small>card_router</small>
                <strong>healthy / score inline enabled</strong>
                <code>approval_rate 93.4%</code>
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
              servicos
            </div>
            <h2>Sinais que importam para operacao</h2>
          </div>
          <p>Sem ruido. O painel privilegia o que impacta aprovacao, repasse, disponibilidade e comunicacao com lojistas.</p>
        </div>

        <div className="marketingList">
          <article className="marketingListCard">
            <h3>Componentes monitorados</h3>
            <p>Leitura rapida para squads comerciais, integracao e administracao.</p>
            <div className="marketingRows">
              {services.map((service) => (
                <div key={service.name} className="marketingRow">
                  <span className={`marketingRowBadge ${service.badge}`}>{service.badge}</span>
                  <div>
                    <strong>{service.name}</strong>
                    <small>{service.detail}</small>
                  </div>
                  <small>live</small>
                </div>
              ))}
            </div>
          </article>

          <article className="marketingListCard">
            <h3>Eventos recentes</h3>
            <p>Registro compacto de incidentes e mitigacoes aplicadas pelo time.</p>
            <div className="marketingTimeline">
              {incidents.map((incident) => (
                <div key={incident.time + incident.title} className="marketingTimelineItem">
                  <small>{incident.time}</small>
                  <strong>{incident.title}</strong>
                  <p>{incident.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
