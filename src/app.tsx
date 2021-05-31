import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: 'http://248c7xxxxxxxxxxx248624de0a9b@sentry.ai-indeed.com/3',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  release: '2.1.0',
})

export const dva = {
  config: {
    onError(e: { msg: string }) {
      console.error('error', e.msg)
    },
  },
}
