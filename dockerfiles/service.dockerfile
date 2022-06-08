###
FROM node:18.2.0-alpine3.15 as starter
WORKDIR /app
COPY ./package*.json ./
COPY ./protos/package.json protos/package.json
COPY ./protos/*.proto ./protos/
RUN npm i --omit=dev



###
FROM node:18.2.0-alpine3.15 as builder
COPY --from=starter /app /app 
WORKDIR /app
COPY ./*.json ./
RUN npm i
COPY ./libs ./libs
COPY ./apps ./apps
ARG domain
RUN ./node_modules/.bin/nest build ${domain}



###
FROM node:18.2.0-alpine3.15 as runner
COPY --from=starter /app /app
ARG domain
COPY --from=builder /app/dist/apps/${domain}/main.js /app
WORKDIR /app
CMD [ "/usr/local/bin/node", "main.js" ]
