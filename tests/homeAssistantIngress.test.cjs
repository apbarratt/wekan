'use strict';

(async () => {
  const assert = require('assert');
  const { ingressBaseUrl } = await import('../server/lib/homeAssistantIngress.js');

  assert.strictEqual(
    ingressBaseUrl({
      'x-ingress-path': '/api/hassio_ingress/session_token',
      'x-forwarded-host': 'ha.example.test',
      'x-forwarded-proto': 'https',
    }),
    'https://ha.example.test/api/hassio_ingress/session_token',
  );
  assert.strictEqual(
    ingressBaseUrl({
      'x-ingress-path': '/api/hassio_ingress/token/',
      'x-forwarded-host': 'ha.example.test, proxy.internal',
      'x-forwarded-proto': 'HTTPS, http',
    }),
    'https://ha.example.test/api/hassio_ingress/token',
  );
  for (const headers of [
    {},
    { 'x-ingress-path': '/unexpected', 'x-forwarded-host': 'ha.example.test', 'x-forwarded-proto': 'https' },
    { 'x-ingress-path': '/api/hassio_ingress/token', 'x-forwarded-host': 'bad/path', 'x-forwarded-proto': 'https' },
    { 'x-ingress-path': '/api/hassio_ingress/token', 'x-forwarded-host': 'ha.example.test', 'x-forwarded-proto': 'ftp' },
  ]) assert.strictEqual(ingressBaseUrl(headers), null);

  console.log('homeAssistantIngress: header parsing checks passed');
})();
