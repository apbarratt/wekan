import { WebApp } from 'meteor/webapp';
import { ingressBaseUrl } from '/server/lib/homeAssistantIngress';

// Home Assistant validates the user before proxying an ingress request. Its
// session URL changes over time, so a fixed ROOT_URL cannot be sent to the
// browser. Rewrite only the runtime config for requests that carry the
// Supervisor's ingress headers; the configured ROOT_URL remains available for
// server-side email links when an administrator has a public URL.
if (process.env.HOME_ASSISTANT_INGRESS === 'true') {
  // The Supervisor's ingress proxy is the only supported caller. The app port
  // is not published to the host, and this closes the remaining Docker-network
  // path to other containers. IPv4-mapped IPv6 is what Node reports on some
  // hosts for the same Supervisor address.
  WebApp.rawHandlers.use((request, response, next) => {
    const remote = request.socket && request.socket.remoteAddress;
    if (remote === '172.30.32.2' || remote === '::ffff:172.30.32.2') return next();
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Home Assistant ingress only');
    return undefined;
  });

  if (typeof WebApp.addRuntimeConfigHook !== 'function'
    || typeof WebApp.decodeRuntimeConfig !== 'function'
    || typeof WebApp.encodeRuntimeConfig !== 'function') {
    console.warn('[home-assistant] this Meteor version cannot configure ingress clients');
  } else {
    WebApp.addRuntimeConfigHook(({ request, encodedCurrentConfig }) => {
      try {
        const baseUrl = ingressBaseUrl(request && request.headers);
        if (!baseUrl) return null;
        const config = WebApp.decodeRuntimeConfig(encodedCurrentConfig);
        config.ROOT_URL = `${baseUrl}/`;
        config.ROOT_URL_PATH_PREFIX = new URL(baseUrl).pathname;
        config.DDP_DEFAULT_CONNECTION_URL = baseUrl;
        return WebApp.encodeRuntimeConfig(config);
      } catch (e) {
        console.error('[home-assistant] runtime ingress configuration failed:', e && e.message ? e.message : e);
        return null;
      }
    });
  }
}
