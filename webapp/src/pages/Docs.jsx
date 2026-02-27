import { useState } from 'react'
import './styles/Docs.css'

const BASE_URL = 'https://pay.axionenterprise.cloud'
const SDK_PACKAGE = '@axion777/pay-sdk'

const codeSamples = {
  sdk: `npm install ${SDK_PACKAGE}\n\nimport { AxionPay } from '${SDK_PACKAGE}'\n\nconst pay = new AxionPay({\n  apiKey: process.env.AXION_PAY_API_KEY,\n  baseUrl: '${BASE_URL}/api'\n})\n\nconst charge = await pay.createCharge({\n  amount: 24990,\n  method: 'pix',\n  pay_tag: 'cliente-comercial'\n})`,
  api: `curl -X POST ${BASE_URL}/payments/pix \\\n-H 'Content-Type: application/json' \\\n-H 'x-api-key: SUA_CHAVE_AXIONPAY' \\\n-H 'Idempotency-Key: pedido-987' \\\n-d '{\n  "amount": 12990,\n  "currency": "BRL",\n  "pay_tag": "cliente-comercial"\n}'`,
  webhook: `POST /webhooks/axionpay\n\n{\n  "event": "payment.updated",\n  "transaction": {\n    "id": "txn_01",\n    "status": "paid"\n  }\n}`,
}

const blocks = [
  {
    title: 'SDK oficial',
    text: 'Biblioteca Node.js pronta para cobranca, status e webhook em ambiente comercial.',
  },
  {
    title: 'API REST',
    text: 'Rotas para PIX e cartao com idempotencia, rastreio e operacao segura.',
  },
  {
    title: 'Checkout white-label',
    text: 'Rota /checkout/{slug} para publicar experiencias personalizadas por cliente.',
  },
]

export default function Docs() {
  const [activeTab, setActiveTab] = useState('sdk')
  const [copyState, setCopyState] = useState('')

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text)
      setCopyState(label)
      window.setTimeout(() => setCopyState(''), 1600)
    } catch {
      setCopyState('erro')
    }
  }

  return (
    <section className="docsNeo">
      <article className="docsNeoHero">
        <div>
          <p className="docsKicker">AxionPAY Docs</p>
          <h1>Documentacao viva para SDK, API e checkout comercial.</h1>
          <p>
            Integre pagamentos, publique checkout e valide callbacks em uma base tecnica com linguagem visual alinhada ao
            produto.
          </p>
          <div className="docsNeoActions">
            <button className="docsNeoBtn primary" onClick={() => copy(BASE_URL, 'base')}>Copiar base URL</button>
            <button className="docsNeoBtn" onClick={() => copy(`npm install ${SDK_PACKAGE}`, 'install')}>Copiar install SDK</button>
          </div>
        </div>
        <aside className="docsKeyPanel">
          <p>x-api-key</p>
          <strong>SEU_TOKEN_PUBLICO</strong>
          <span>Rate limit: 120 req/min</span>
        </aside>
      </article>

      <article className="docsNeoPanel">
        <header className="docsNeoHead">
          <p className="docsKicker">Fundacao tecnica</p>
          <h2>Blocos principais da operacao</h2>
        </header>
        <div className="docsBlockGrid">
          {blocks.map((block) => (
            <article key={block.title} className="docsBlockCard">
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
      </article>

      <article className="docsNeoPanel">
        <div className="docsTabs" role="tablist" aria-label="Exemplos de codigo">
          <button className={activeTab === 'sdk' ? 'docsTab active' : 'docsTab'} onClick={() => setActiveTab('sdk')}>
            SDK
          </button>
          <button className={activeTab === 'api' ? 'docsTab active' : 'docsTab'} onClick={() => setActiveTab('api')}>
            API
          </button>
          <button className={activeTab === 'webhook' ? 'docsTab active' : 'docsTab'} onClick={() => setActiveTab('webhook')}>
            Webhook
          </button>
          <button className="docsNeoBtn" onClick={() => copy(codeSamples[activeTab], activeTab)}>
            Copiar exemplo
          </button>
        </div>
        <pre className="docsCode">
          <code>{codeSamples[activeTab]}</code>
        </pre>
      </article>

      {copyState && (
        <p className="docsFeedback" role="status" aria-live="polite">
          {copyState === 'erro' ? 'Nao foi possivel copiar agora.' : 'Conteudo copiado para a area de transferencia.'}
        </p>
      )}
    </section>
  )
}
