FROM node:16-alpine

RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

WORKDIR /usr/src/app

# ipfs
RUN apk add kubo  
RUN ipfs init


COPY . .

# Copy and install dependencies
RUN npm config set registry https://registry.npm.taobao.org
RUN npm ci --omit=dev
RUN npm install pm2 -g

EXPOSE 9210
CMD pm2-runtime app.js
