# WeKan for Home Assistant

## Install

1. In Home Assistant, open **Settings > Apps > Install app**.
2. Open the three-dot menu, choose **Repositories**, add
   `https://github.com/apbarratt/wekan`, then close the dialog.
3. Select **WeKan** from the new *WeKan Home Assistant Apps* section and install it.
4. Before the first start, open the app's **Configuration** tab and set **Root
   URL** to the exact address used in browsers. For example,
   `http://homeassistant.local:8080`, `http://192.168.1.20:8080`, or the public
   HTTPS address of a reverse proxy.
5. In the app's **Network** tab, enable `8080/tcp` and choose the same port used
   in Root URL. Start the app and use **Open Web UI**.

The first account registered in a new WeKan instance is its administrator.

## Configuration

| Option | Required | Meaning |
| --- | --- | --- |
| **Root URL** (`root_url`) | Yes | The complete `http://` or `https://` URL that browsers use for WeKan. This must agree exactly with the hostname, scheme and port that users open. |

The Supervisor cannot infer this value: Home Assistant may be reached through a
LAN address, a remote URL, or a reverse proxy. A mismatch can break login
cookies, attachment links and live board updates.

## Data and backups

The app runs WeKan with its embedded FerretDB v1/SQLite backend. All application
state, attachments and avatars are stored under the app's private `/data`
directory. Home Assistant includes this directory in an app backup. Create a
Home Assistant backup before updating WeKan or changing its database settings.

This app intentionally does not expose the database port.

## Reverse proxy and HTTPS

If a reverse proxy publishes WeKan, map the app's port only to the proxy as
appropriate for your network, configure the proxy to forward WebSocket traffic,
and set Root URL to the public HTTPS URL. Do not use the Home Assistant ingress
URL as Root URL: WeKan needs a stable, directly reachable canonical URL.

## Troubleshooting

- If the app exits immediately, verify that **Root URL** begins with `http://`
  or `https://`.
- If **Open Web UI** cannot open WeKan, enable `8080/tcp` in the app's Network
  tab and ensure that the selected host port matches Root URL.
- Check the app log after the first start. The embedded database can take a
  little longer to initialise on slower storage.

Report WeKan issues at <https://github.com/wekan/wekan/issues>.

## License

WeKan is released under the [MIT License](../../LICENSE).
