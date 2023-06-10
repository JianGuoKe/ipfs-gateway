FROM node:16-alpine

COPY . .

# (0.16.0-r6)
RUN apk add kubo  
# RUN wget https://github.com/ipfs/kubo/releases/download/v0.17.0/kubo_v0.17.0_linux-amd64.tar.gz
# RUN tar zxvf kubo_v0.17.0_linux-amd64.tar.gz
# RUN cd kubo/
# RUN ./install.sh
RUN ipfs init

WORKDIR /usr/src/app

# Copy and install dependencies
RUN npm ci --only=production


EXPOSE 9210

# Use pm2 to run app
RUN npm install pm2 -g 

COPY docker-entrypoint.sh /usr/local/bin/ 

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["%%CMD%%"]
