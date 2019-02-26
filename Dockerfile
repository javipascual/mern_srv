FROM node:10.15.1-jessie-slim

RUN npm install -g ts-node

COPY package.json package-lock.json events.model.ts server.ts ./
RUN ts-node --version
RUN npm install

# Run server.ts when the container launches
CMD ["ts-node", "server.ts"]