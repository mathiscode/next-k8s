import type { IncomingMessage } from 'http'

interface APIClient {
  baseURL: String;
  options: Object;
}

class APIClient {
  constructor ({ req, ingress }: { req?: IncomingMessage, ingress?: String }) {
    const isServer = typeof window === 'undefined'
    const baseURL = isServer ? ingress || 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' : ''
    const headers = isServer && req ? req.headers as any : {}
    const options = isServer ? { headers } : {}

    this.baseURL = baseURL || ''
    this.options = options || {}
  }

  async request (path: String) {
    const response = await fetch(`${this.baseURL}/api${path}`, this.options)
    return await response.json()
  }
}

export default APIClient
