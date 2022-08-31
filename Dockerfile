FROM node:16.15 AS docusaurus
COPY . /site
WORKDIR /site

RUN npm install && npm run build

FROM nginx:1.23 AS server
COPY --from=docusaurus /site/build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf