FROM node:8.9

RUN npm i -g pm2

CMD ["pm2 start app.js --no-daemon"]