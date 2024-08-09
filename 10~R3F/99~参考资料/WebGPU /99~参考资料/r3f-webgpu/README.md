# React Three Fiber + WebGPU

## How to use

`npm i` or `yarn` or `bun i`

Then `npm run dev` or `yarn dev` or `bun dev`

## Performance

On an M3 Macbook Air:

- Rendering 5000 boxes with WebGPU runs at ~30fps (but shadows are broken).
- Rendering 5000 boxes with WebGL runs at ~14fps (with working shadows).

## Bugs

When the directional light casts shadows, weird line artifacts appear on the cubes (uncomment `/* castShadow */` in `src/index.tsx` to see the bug).

Also, lighting/shadows seems broken in WebGPU. Use 100 boxes to see that WebGL casts shadows but not WebGPU.
