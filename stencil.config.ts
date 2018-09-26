import { Config } from '@stencil/core';
import { sass } from "@stencil/sass"; 
export const config: Config = {
  namespace: 'pdicomponents',
  plugins: [
    sass({injectGlobalPaths: [
      'src/globals/variables.scss'
    ]})
  ],
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
