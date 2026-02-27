import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from '../i18n'
import { getCopy } from '../lib/controlPlane.js'
import './HomePage.css'

const WHATSAPP_URL =
  'https://wa.me/5511933331462?text=Ola%2C%20AxionPAY.%20Quero%20ativar%20gateway%20e%20checkout%20comercial.'

function IconPix() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.3 18.3a3.5 3.5 0 0 0 2.5-1l3.6-3.6a.7.7 0 0 1 .9 0l3.6 3.6a3.5 3.5 0 0 0 2.5 1h.7l-4.5 4.5a3.6 3.6 0 0 1-5.2 0l-4.6-4.5Zm13.1-12.7a3.5 3.5 0 0 0-2.5 1L12.3 10a.7.7 0 0 1-.9 0l-3.6-3.6a3.5 3.5 0 0 0-2.5-1h-.5l4.6-4.5a3.6 3.6 0 0 1 5.2 0l4.5 4.5ZM1.1 9.4l2.7-2.7h1.5a2.5 2.5 0 0 1 1.7.7l3.6 3.6a1.7 1.7 0 0 0 2.4 0l3.6-3.6a2.5 2.5 0 0 1 1.7-.7h1.8l2.7 2.7a3.6 3.6 0 0 1 0 5.2l-2.7 2.7h-1.8a2.5 2.5 0 0 1-1.7-.7l-3.6-3.6a1.8 1.8 0 0 0-2.4 0l-3.6 3.6a2.5 2.5 0 0 1-1.7.7H3.8l-2.7-2.7a3.6 3.6 0 0 1 0-5.2"
        fill="currentColor"
      />
    </svg>
  )
}

function IconCard() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconSplit() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4v4m0 8v4M17 4v4m0 8v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="12" r="2.2" fill="currentColor" />
      <circle cx="17" cy="12" r="2.2" fill="currentColor" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3 5 6v6.2c0 4.6 3 7.8 7 9.8 4-2 7-5.2 7-9.8V6l-7-3Zm3.5 7.2-4 4a1 1 0 0 1-1.4 0l-1.6-1.6 1.4-1.4 1 1 3.3-3.3 1.3 1.3Z"
        fill="currentColor"
      />
    </svg>
  )
}

const STATS = [
  { value: '99.9%', label: 'SLA de uptime' },
  { value: '15ms', label: 'Latencia media' },
  { value: '256bit', label: 'Criptografia' },
]

const FLOW_CARDS = [
  {
    icon: <IconPix />,
    title: 'PIX instantaneo',
    text: 'Geracao de payload, QR e confirmacao em segundos para venda direta.',
  },
  {
    icon: <IconCard />,
    title: 'Cartao roteado',
    text: 'Processamento em cartao com logica de aprovacao e acompanhamento de status.',
  },
  {
    icon: <IconSplit />,
    title: 'Split comercial',
    text: 'Distribuicao de valores entre contas para operacoes com subclientes.',
  },
  {
    icon: <IconShield />,
    title: 'Camada antifraude',
    text: 'Regras de risco para proteger receita e reduzir chargeback da operacao.',
  },
]

const ENDPOINTS = [
  {
    method: 'POST',
    title: 'Criar cobranca PIX',
    subtitle: 'Pagamento instantaneo com webhook',
    endpoint: '/api/payments/pix',
    sample: 'curl /api/payments/pix -H "Content-Type: application/json" -d "{...}"',
  },
  {
    method: 'POST',
    title: 'Criar cobranca cartao',
    subtitle: 'Checkout com tokenizacao e retorno de status',
    endpoint: '/api/payments/card',
    sample: 'curl /api/payments/card -H "Content-Type: application/json" -d "{...}"',
  },
  {
    method: 'GET',
    title: 'Consultar transacao',
    subtitle: 'Status consolidado para operacao e conciliacao',
    endpoint: '/api/payments/{id}',
    sample: 'curl /api/payments/trx_01001',
  },
]

const LIVE_TX = [
  { store: 'Loja Orion', amount: 'R$ 189,00', method: 'PIX aprovado' },
  { store: 'Studio Lux', amount: 'R$ 620,90', method: 'Cartao aprovado' },
  { store: 'Academia Move', amount: 'R$ 99,00', method: 'PIX aprovado' },
  { store: 'Ecom Atlas', amount: 'R$ 1.349,00', method: 'Cartao aprovado' },
]

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('isVisible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function LiveFeed() {
  const [feed, setFeed] = useState(() => LIVE_TX.slice(0, 3).map((item, idx) => ({ ...item, id: idx + 1 })))
  const cursor = useRef(3)
  const seq = useRef(4)

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = LIVE_TX[cursor.current % LIVE_TX.length]
      cursor.current += 1
      setFeed((current) => [{ ...next, id: seq.current++ }, ...current.slice(0, 2)])
    }, 2600)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="apLiveFeed" aria-label="Pagamentos ao vivo">
      {feed.map((item) => (
        <article key={item.id} className="apLiveCard">
          <p>{item.method}</p>
          <strong>{item.store}</strong>
          <span>{item.amount}</span>
        </article>
      ))}
    </div>
  )
}

export default function HomePage({ controlPayload = {} }) {
  const navigate = useNavigate()
  useReveal()

  const heroPrimary = useMemo(() => getCopy(controlPayload, 'home-hero', 'cta_primary_label', t('home.ctaPrimary')), [controlPayload])

  return (
    <div className="apHome">
      <section className="apHero" data-reveal>
        <div className="apGlow apGlowOne" aria-hidden="true" />
        <div className="apGlow apGlowTwo" aria-hidden="true" />

        <div className="apHeroGrid">
          <div className="apCopy">
            <div className="apBadgeRow">
              <span className="apBadge">Pronto para empresas</span>
              <span className="apVersion">v3.0.0</span>
            </div>

            <h1>
              Pagamentos
              <br />
              <span>de alto nivel.</span>
            </h1>

            <p>
              Gateway AxionPAY com fluxo completo para PIX, cartao e conciliacao em tempo real. Checkout comercial pronto
              para clientes e subclientes.
            </p>

            <div className="apActions">
              <button className="apBtn primary" onClick={() => navigate('/cadastro')}>
                {heroPrimary}
              </button>
              <button className="apBtn ghost" onClick={() => navigate('/docs')}>
                Explorar documentacao
              </button>
              <a className="apBtn ghost" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Falar com comercial
              </a>
            </div>

            <div className="apStats">
              {STATS.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="apTerminalWrap" aria-hidden="true">
            <article className="apTerminal">
              <header>
                <div className="apDots">
                  <span />
                  <span />
                  <span />
                </div>
                <p>gateway_query.axionpay</p>
              </header>
              <div className="apTerminalBody">
                <p>
                  <span>{'>>>'}</span> import axionpay_sdk
                </p>
                <p>
                  <span>{'>>>'}</span> client = AxionPay(API_KEY)
                </p>
                <p>
                  <span>{'>>>'}</span> client.charge({`{ method: 'pix' }`})
                </p>
                <p className="apRun">[executando] requisicao enviada...</p>
                <p>{`{`}</p>
                <p className="apJson">  "status": "success",</p>
                <p className="apJson">  "latency": "15ms",</p>
                <p className="apJson">  "id": "trx_01011"</p>
                <p>{`}`}</p>
                <p className="apCursor">_</p>
              </div>
            </article>
            <LiveFeed />
          </div>
        </div>
      </section>

      <section className="apSection" data-reveal>
        <header className="apSectionHead">
          <p>Fluxo de pagamento</p>
          <h2>Elementos visuais para operacao PIX e cartao em escala.</h2>
        </header>
        <div className="apFlowGrid">
          {FLOW_CARDS.map((item) => (
            <article key={item.title} className="apFlowCard">
              <span className="apIcon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="apSection apEndpoint" data-reveal>
        <header className="apSectionHead apEndpointHead">
          <div>
            <p>API interna</p>
            <h2>Endpoints prontos para producao</h2>
            <small>Use x-api-key e payload JSON para integrar checkout e pagamento.</small>
          </div>
          <aside className="apKeyBox">
            <p>x-api-key</p>
            <strong>SEU_TOKEN_PUBLICO</strong>
            <span>Rate limit publico: 120 req/min</span>
          </aside>
        </header>

        <div className="apEndpointGrid">
          {ENDPOINTS.map((item) => (
            <article key={item.title} className="apEndpointCard">
              <p className="apMethod">
                <span>{item.method}</span> {item.subtitle}
              </p>
              <h3>{item.title}</h3>
              <code>{item.endpoint}</code>
                <p className="apSample">{item.sample}</p>
                <button className="apInlineLink" onClick={() => navigate('/docs')}>
                  Usar agora {'->'}
                </button>
              </article>
            ))}
        </div>
      </section>
    </div>
  )
}
