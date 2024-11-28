
FROM node:20-alpine AS build

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN mkdir -p /app/projects-panel/projectPage/652d381a3a657e208e2f5803/cmf11
COPY --from=build /frontend/dist/custom_mf/* /app/projects-panel/projectPage/652d381a3a657e208e2f5803/cmf11/
COPY nginx.conf /etc/nginx/nginx.conf
