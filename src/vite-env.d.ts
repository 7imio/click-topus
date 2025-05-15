/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_DEVELOPER_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.geojson' {
  const value: import('geojson').FeatureCollection;
  export default value;
}

declare module '*.json' {
  const value: any;
  export default value;
}
