/// <reference types="vite/client" />
import type GA4 from 'react-ga4'
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_TITLE: string
  readonly VITE_GA_MEASUREMENT_ID: string
  readonly VITE_SENTRY_DNS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  const gtag: GA4['gtag']
}

interface EventParams {
  debug_target?: any
  metric_delta: number
  metric_id: string
  metric_value: number
  value: number
}
