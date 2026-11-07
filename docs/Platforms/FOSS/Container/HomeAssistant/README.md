# WeKan Home Assistant App

The repository includes a Home Assistant App package at
[`home-assistant/wekan`](../../../../../home-assistant/wekan). It wraps the
published multi-architecture WeKan image, uses the built-in FerretDB/SQLite
database, and keeps all state in Home Assistant's private app data directory.

For installation and configuration, see its [Home Assistant documentation](../../../../../home-assistant/wekan/DOCS.md).

The package is a Home Assistant App repository because
[`repository.yaml`](../../../../../repository.yaml) is at this repository's
root. Home Assistant recursively finds the `config.yaml` below
`home-assistant/wekan` when the repository is added.
