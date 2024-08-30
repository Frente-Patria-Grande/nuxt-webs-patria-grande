import {
  addImportsDir,
  addRouteMiddleware,
  addServerHandler,
  createResolver,
  defineNuxtModule,
  installModule
} from '@nuxt/kit'
import defu from "defu";

import PatriaGrandePreset from '@frente-patria-grande/tailwind-preset'

// Module options TypeScript interface definition
export interface ModuleOptions {
  baseUrl: string | null,
  websiteSlug: string,
  token: string,
  headers: Object | null,
  paths: Array<string> | null,
  pathRewrite: Object | null,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-webs-patria-grande',
    configKey: 'websPatriaGrande',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: 'https://webs.patriagrande.org.ar/proxy',
    websiteSlug: null,
    token: null,
    paths: ['/ah-api/**'],
    pathRewrite: {
      '^/ah-api': '',
    },
  },
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    const finalConfig = defu(
      _options,
      _nuxt.options.runtimeConfig.websPatriaGrande,
      {
        proxyUrl: _options.baseUrl.replace(/\/+$/, '') + '/' + _options.websiteSlug?.replace(/^\/+/, ''),
      }
    )

    // updateRuntimeConfig({
    //   websPatriaGrande: finalConfig,
    // })
    _nuxt.options.runtimeConfig.websPatriaGrande = finalConfig

    for (const path of finalConfig.paths) {
      addServerHandler({
        route: path,
        handler: resolver.resolve('./runtime/server/ah-proxy.ts'),
      });
    }

    addRouteMiddleware({
      name: 'dynamic-route',
      path: resolver.resolve('runtime/middleware/dynamic-route-middleware.ts'),
      global: true
    })

    addImportsDir(resolver.resolve('./runtime/composables'))

    // Tailwind with preset and defaults
    await installModule('@nuxtjs/tailwindcss', {
      config: {
        content: [
          './components/**/*.{js,vue,ts}',
          './layouts/**/*.vue',
          './content/**/*',
          './pages/**/*.vue',
          './plugins/**/*.{js,ts}',
          './app.vue',
          './error.vue',
        ],
        preset: [PatriaGrandePreset],
      }
    })
  },
})
