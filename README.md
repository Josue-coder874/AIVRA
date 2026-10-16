<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9d15823e-6fc7-4bd0-887c-ae8026c9cccd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Prototipo independiente de la pulsera

En el aplicativo, abre **Ajustes de Periférico** desde el menú del perfil para elegir
entre los fondos Azul noche, Grafito, Violeta y Bosque. La selección se guarda en este navegador.

Con el servidor local en marcha, abre `http://localhost:3000/pulsera` para explorar la pulsera
interactiva en 3D. Puedes girar el modelo, cambiar entre tres acabados, probar SOS y ajustar la batería simulada.

Para ver la sincronización, abre el aplicativo en otra pestaña del mismo navegador, pulsa
**Vincular con la app** y prueba la batería o la alerta SOS. Este enlace usa `BroadcastChannel`
y almacenamiento local del navegador como demostración; no se conecta a una pulsera física.
