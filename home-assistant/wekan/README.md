# WeKan

Run private, self-hosted kanban boards next to Home Assistant. This app uses
WeKan's embedded FerretDB/SQLite database, so no separate database app is
required. Its data, uploaded attachments and database are kept in the app's
private data directory and included in Home Assistant backups.

Before starting WeKan, expose its `8080/tcp` port in the **Network** section
and set **Root URL** to the exact URL that people will use, for example
`http://homeassistant.local:8080` or `https://wekan.example.com`.

See the **Documentation** tab for installation, backups and reverse-proxy
guidance.
