FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT_APP 8080
ENV PORT_JSON_SERVER 4200

EXPOSE 4200
EXPOSE 8080

CMD ["npm", "run", "serve"]
