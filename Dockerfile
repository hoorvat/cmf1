
FROM node:20-alpine AS build

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN mkdir -p /app/projects-panel/projectPage/652d31a3a657e208e2f5803
COPY --from=build /frontend/dist/${APP_NAME} /app/projects-panel/projectPage/652d31a3a657e208e2f5803
COPY nginx.conf /etc/nginx/nginx.conf
