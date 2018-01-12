Drone ioを使ったCiとcontainer buildを試す




docker build -t {REGISTRY_HOST}/auto-build-node .
docker push {REGISTRY_HOST}/auto-build-node:latest