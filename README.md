# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Android PWA install on a local network

Chrome on Android will not offer PWA installation when the app is opened with an untrusted certificate. If the browser shows `NET::ERR_CERT_AUTHORITY_INVALID`, the page is not treated as a secure installable origin.

1. Install `mkcert`.
2. Run `npm run cert:dev` to create `.cert/dev-cert.pem` and `.cert/dev-key.pem`.
3. Copy the `rootCA.pem` file reported by the script to the Android device and install it as a trusted certificate, or use a real public HTTPS domain instead.
4. Start the dev server with `npm run dev`.
5. Open `https://<your-lan-ip>:5173` on the phone again.

Without a trusted certificate Android will keep showing the security warning and the install prompt will remain unavailable.
