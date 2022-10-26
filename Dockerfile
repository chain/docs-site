FROM node:18-alpine AS deps

WORKDIR /site

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install

FROM node:18-alpine AS builder

WORKDIR /site
COPY --from=deps /site/node_modules ./node_modules
COPY . .

RUN npm run build

EXPOSE 80

CMD yarn serve
