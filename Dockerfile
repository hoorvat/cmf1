
FROM node:20-alpine

ARG WORK_DIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

RUN mkdir -p /frontend
WORKDIR /frontend
COPY package.json /frontend
RUN npm install @angular/cli
RUN npm install

COPY . /frontend
CMD ng serve --host 0.0.0.0
