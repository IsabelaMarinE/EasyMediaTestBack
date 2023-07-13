FROM node:18.13.0
WORKDIR '/app'
COPY package*.json .
COPY . .
CMD ["npm", "start"]