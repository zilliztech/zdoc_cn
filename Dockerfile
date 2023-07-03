## preset
FROM python:3.11.4-slim-bullseye as preset
ARG APP_ID
ARG APP_SECRET
ARG SPACE_ID
ARG FIGMA_API_KEY
ENV APP_ID=${APP_ID} APP_SECRET=${APP_SECRET} SPACE_ID=${SPACE_ID} FIGMA_API_KEY=${FIGMA_API_KEY} FEISHU_HOST="https://open.feishu.cn"
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN python guides.py

## base
FROM node:lts as base
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false
WORKDIR /home/node/app
COPY --from=preset --chown=node:node /usr/src/app/site /home/node/app/

## development
FROM base as development
WORKDIR /home/node/app
RUN npm install
USER node
EXPOSE 3000
CMD ["npm", "start"]


## production
FROM base as production
WORKDIR /home/node/app
COPY --from=development --chown=node:node /home/node/app/node_modules /home/node/app/node_modules
RUN npm run build

## deploy
FROM nginx:stable-alpine as deploy
WORKDIR /home/node/app
COPY --from=production /home/node/app/build /usr/share/nginx/html
