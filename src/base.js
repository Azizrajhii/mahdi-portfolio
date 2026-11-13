// Site root: "/" on a custom domain, "/mahdi-pcb/" on madou003.github.io/mahdi-pcb/.
// Set at build time (vite --base); the deploy workflow passes the right value.
export const BASE = import.meta.env.BASE_URL;
// url('img/x.webp') -> '/img/x.webp' or '/mahdi-pcb/img/x.webp'
export const url = (path) => BASE + path.replace(/^\//, '');
