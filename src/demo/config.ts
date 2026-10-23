// The public portfolio build is a demo unless live mode is explicitly enabled.
// Never provide real API credentials in a Vite client application.
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false';
