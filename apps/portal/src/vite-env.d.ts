/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** i-o API server, e.g. https://api.i-o.systems. Leave unset to use the in-browser sample organisation. */
  readonly VITE_IO_API_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
