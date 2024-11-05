import { createError, defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export interface CustomRoute {
  type: string
  redirect_target_url: string | null
  file: null | {
    url: string
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (to && to.name === 'slug') {
    const path = decodeURI(to.path)

    const customRoute = await $fetch<CustomRoute>(`/ah-api/routes`, {
      query: {
        path: path,
      },
    }).catch(() => {
      throw createError({
        statusCode: 404,
      })
    })

    if (!customRoute) {
      throw createError({
        statusCode: 404,
      })
    }

    if (customRoute?.type === 'redirect') {
      const url = customRoute.redirect_target_url
      return navigateTo(url, { external: url.startsWith('http') })
    }

    if (customRoute?.type === 'file') {
      const url = customRoute.file?.url
      return navigateTo(url, { external: true })
    }

    to.query.customRoute = customRoute
  }
})
