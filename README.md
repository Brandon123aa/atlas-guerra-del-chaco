# Chaco · Atlas de una guerra

Enciclopedia multimedia interactiva, desarrollada con **Angular 22**, sobre la
Guerra del Chaco (1932–1935) y el acuerdo de paz firmado en 1938.

## Requisitos

- Node.js `^22.22.3`, `^24.15.0` o una versión compatible posterior.
- npm 10 o posterior.

Angular 22 requiere Node.js 22; Node 20 no es compatible con la CLI actual.

## Instalar y ejecutar

Desde la carpeta de este proyecto:

```bash
npm install
npm start
```

Abre `http://localhost:4200/`. El servidor de Angular actualiza la aplicación
mientras editas los archivos.

## Comprobaciones

```bash
npm test
npm run build
```

## Recorrido

- **Cronología:** cinco hitos entre 1932 y 1938, con reproducción automática y
  relatos históricos.
- **Mapa:** diagrama interactivo con los lugares de la campaña; selecciona un
  punto para ver el acontecimiento asociado.
- **Búsqueda:** encuentra años, acontecimientos y temas del atlas; atajo
  `Ctrl + K` o `⌘ + K`.
- **Narración:** escucha la introducción y los artículos con la síntesis de voz
  disponible en el navegador.
- **Memoria:** materiales divulgativos sobre las comunidades del Chaco, las
  experiencias personales y la posguerra.
- **Video:** [recorrido narrado del proyecto en MP4](./entregables/video-atlas-guerra-chaco.mp4).

El mapa es **esquemático y didáctico**, no representa límites internacionales
oficiales. Las cifras de víctimas y algunos detalles de la campaña difieren
entre las fuentes; el contenido las presenta con cautela. Consulta el apartado
**Fuentes y bibliografía** de la aplicación para iniciar una investigación.

## Estructura

- `src/app/app.ts`: datos, estado reactivo e interacciones del atlas.
- `src/app/app.html`: plantilla de la aplicación.
- `src/styles.css`: diseño adaptable y estilos globales.
- `src/app/app.spec.ts`: pruebas del componente principal.
- `.github/agents/historiador-chaco.agent.md`: agente para investigación y
  divulgación histórica.
