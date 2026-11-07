# WeKan for Home Assistant

## Install

1. In Home Assistant, open **Settings > Apps > Install app**.
2. Open the three-dot menu, choose **Repositories**, add
   `https://github.com/wekan/wekan`, then close the dialog.
3. Select **WeKan** from the new *WeKan Home Assistant Apps* section and install it.
4. Start the app. **WeKan** appears in the Home Assistant sidebar; select it to
   open the board interface.

The first account registered in a new WeKan instance is its administrator.

## Configuration

| Option | Required | Meaning |
| --- | --- | --- |
| **Root URL** (`root_url`) | No | An optional, direct public `http://` or `https://` URL for WeKan. It is used in email invitation and password-reset links. |

The sidebar uses Home Assistant ingress: its private URL is created per session
and WeKan reads it automatically. It does not need, and must not be configured
as, Root URL. Leave Root URL blank for sidebar-only use. If you make WeKan
available separately through a reverse proxy, set it to that stable public URL
so email invitation and password-reset links work outside the current session.

## Data and backups

The app runs WeKan with its embedded FerretDB v1/SQLite backend. All application
state, attachments and avatars are stored under the app's private `/data`
directory. Home Assistant includes this directory in an app backup. Create a
Home Assistant backup before updating WeKan or changing its database settings.

This app intentionally exposes no host ports, including the database port.
Its internal web port accepts only Home Assistant's ingress proxy.

## Reverse proxy and HTTPS

Home Assistant ingress proxies WebSocket traffic for the sidebar automatically.
If you also create a direct reverse-proxy deployment, configure it to forward
WebSocket traffic and set Root URL to its stable public HTTPS URL. Do not use a
Home Assistant ingress URL as Root URL: its session token changes.

## Troubleshooting

- If the sidebar item does not appear, confirm that the app is running and
  refresh the Home Assistant browser page.
- If the app exits immediately after setting **Root URL**, verify that it begins
  with `http://` or `https://`.
- Check the app log after the first start. The embedded database can take a
  little longer to initialise on slower storage.

Report WeKan issues at <https://github.com/wekan/wekan/issues>.

## License

WeKan is released under the [MIT License](../../LICENSE).
