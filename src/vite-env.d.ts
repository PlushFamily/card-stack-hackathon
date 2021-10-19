/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_APP_MAGIC_KEY: string,
  VITE_APP_CERAMIC_API: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}