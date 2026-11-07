'use strict';

// Home Assistant discovers config.yaml files recursively. Keep the repository
// manifest and the WeKan app metadata in sync with the wrapper that starts the
// published WeKan image. Run: node tests/homeAssistantApp.test.cjs

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const config = read('home-assistant/wekan/config.yaml');
const repository = read('repository.yaml');
const dockerfile = read('home-assistant/wekan/Dockerfile');
const launcher = read('home-assistant/wekan/run.sh');

assert.match(repository, /^name: "WeKan Home Assistant Apps"$/m);
assert.match(config, /^slug: "wekan"$/m);
const version = /^version: "(\d+\.\d+)"$/m.exec(config)?.[1];
assert.ok(version, 'config has a numeric app version');
assert.match(config, /^  - amd64$/m);
assert.match(config, /^  - aarch64$/m);
assert.match(config, /^ingress: true$/m);
assert.match(config, /^ingress_port: 8080$/m);
assert.match(config, /^ingress_stream: true$/m);
assert.match(config, /^panel_title: "WeKan"$/m);
assert.doesNotMatch(config, /^ports:$/m);
assert.match(config, /^watchdog: "http:\/\/\[HOST\]:\[PORT:8080\]\/"$/m);
assert.match(config, /^  root_url: url\?$/m);
assert.match(dockerfile, new RegExp(`ARG WEKAN_VERSION=${version}`));
for (const setting of ['ROOT_URL', 'WRITABLE_PATH=/data', 'WEKAN_DB=ferretdb', 'PORT=8080', 'WITH_API=true', 'DDP_TRANSPORT=sockjs', 'HOME_ASSISTANT_INGRESS=true']) {
  assert.ok(launcher.includes(setting), `launcher configures ${setting}`);
}
assert.match(launcher, /setpriv --reuid=wekan --regid=wekan --init-groups/);
assert.match(read('home-assistant/wekan/DOCS.md'), /Home Assistant backup/);
assert.match(read('server/imports.js'), /import '\/server\/homeAssistantIngress';/);
assert.match(read('server/homeAssistantIngress.js'), /ROOT_URL_PATH_PREFIX/);
assert.match(read('server/homeAssistantIngress.js'), /172\.30\.32\.2/);

console.log('homeAssistantApp: metadata and launcher checks passed');
