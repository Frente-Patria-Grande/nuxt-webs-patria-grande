import {defineEventHandler, proxyRequest} from "h3";
import {useRuntimeConfig} from '#imports'
import consola from "consola";

const getUrlPath = (url?: string, base?: string) => {
  if (!url) return ''

  const {pathname, search} = new URL(url, base)

  return `${pathname}${search}`
}

const rewritePath = (path: string, rules: Object) => {
  for (const rule of Object.keys(rules)) {
    const regex = new RegExp(rule)
    if (regex.test(path)) {
      const replace = rules[rule]
      const newPath = path.replace(regex, replace)
      consola.info('Rewriting path from "%s" to "%s"', path, newPath)
      return newPath
    }
  }

  return path
}


export default defineEventHandler(async (event) => {
  const {req} = event.node;
  const runtimeConfig = useRuntimeConfig(event)

  const config = runtimeConfig.websPatriaGrande

  // Add or override headers
  const proxyHeaders = {
    Authorization: `Bearer ${config.token}`,
    Accept: 'application/json',
    ...config.headers,
    ...req.headers,
  };

  const path = getUrlPath(req.url, config.proxyUrl)
  const rewrittenPath = rewritePath(path, config.pathRewrite)

  const targetUrl = `${config.proxyUrl}${rewrittenPath}`

  const proxyOptions = {
    headers: proxyHeaders,
  }

  consola.success('Proxying to:', targetUrl)

  return proxyRequest(event, targetUrl, proxyOptions);
})
