# Nerd Bot
A simple Matrix bot written in TypeScript.

# Docker
## Docker Run
```bash
docker run -d --name MatrixBot -v <location of config>/config.json:/data/config.json gaycookie/matrix-bot:latest
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
      - <location of config>/config.json:/data/config.json
```