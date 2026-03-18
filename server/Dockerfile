FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y mariadb-client && \
    npm install -g typescript

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"] 


