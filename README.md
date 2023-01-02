# Matrix Bot
A simple Matrix bot written in TypeScript.

# Configuration
An example configuration file can be found [here](config-example.yaml).  
If you're running this without Docker the config file must be named `config.yaml`.

# Docker
## Docker Run
```bash
# Docker Run with external config.yaml.
docker run -d --name MatrixBot --restart unless-stopped \ 
  -v <location of config>/config.yaml:/data/config.yaml \
  gaycookie/matrix-bot:latest

# Docker Run with external config.yaml and storage.json.
docker run -d --name MatrixBot --restart unless-stopped \ 
  -v <location of config>/config.yaml:/data/config.yaml \ 
  -v <location of config>/storage.json:/data/storage.json \ 
  gaycookie/matrix-bot:latest
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
      #- <location of config>/storage.json:/data/storage.json
```

While the `storage.json` bind is optional, it is recommended to do this.  
So whenever the docker image is updated or recreated everything is still saved.