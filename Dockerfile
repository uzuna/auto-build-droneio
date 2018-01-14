FROM node:8.9-alpine

RUN npm i -g pm2

ADD ./ /apps
WORKDIR /apps 
RUN npm i \
    && npm run build \
    && npm prune --production


CMD ["pm2", "start", "/apps/lib/server.js", "--no-daemon"]
