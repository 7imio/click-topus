/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_DEVELOPER_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare const __APP_VERSION__: string;
