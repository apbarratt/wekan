// Home Assistant's ingress proxy removes its session path before forwarding a
// request to the app, but sends it in X-Ingress-Path together with the public
// host and scheme. Meteor needs all three in the client runtime configuration:
// without the path prefix, SockJS and dynamic imports would incorrectly target
// the Home Assistant root instead of this app's ingress session.
function ingressBaseUrl(headers = {}) {
  const path = headers['x-ingress-path'];
  const forwardedHost = headers['x-forwarded-host'];
  const forwardedProto = headers['x-forwarded-proto'];
  if (typeof path !== 'string' || !/^\/api\/hassio_ingress\/[-_A-Za-z0-9]+\/?$/.test(path)) return null;
  if (typeof forwardedHost !== 'string' || typeof forwardedProto !== 'string') return null;

  const host = forwardedHost.split(',')[0].trim();
  const proto = forwardedProto.split(',')[0].trim().toLowerCase();
  if (!/^[A-Za-z0-9.:[\]-]+$/.test(host) || !['http', 'https'].includes(proto)) return null;
  return `${proto}://${host}${path.replace(/\/$/, '')}`;
}

export { ingressBaseUrl };
