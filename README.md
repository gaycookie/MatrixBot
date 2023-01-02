# Matrix Bot
A simple Matrix bot written in TypeScript.

# Configuration
An example configuration file can be found [here](config-example.yaml).  
If you're running this without Docker the config file must be named `config.yaml`.

# Docker
## Docker Run
```bash
docker run -d --name MatrixBot -v <location of config>/config.yaml:/data/config.yaml gaycookie/matrix-bot:latest
```

## Docker Compose
```yaml
version: "3.9"
services:
  synapse:
    container_name: MatrixBot
    image: gaycookie/matrix-bot:latest
    restart: unless-stopped
    volumes:
      - <location of config>/config.yaml:/data/config.yaml
```