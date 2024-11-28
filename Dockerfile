
FROM node:20-alpine AS build

ARG APP_NAME="custom_mf"
ARG SCOPE="652d381a3a657e208e2f5803"

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN mkdir -p /app/projects-panel/projectPage/${SCOPE}/${APP_NAME}
COPY --from=build /frontend/dist/${APP_NAME} /app/projects-panel/projectPage/${SCOPE}/${APP_NAME}
COPY nginx.conf /etc/nginx/nginx.conf
