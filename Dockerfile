FROM node:6-alpine

ADD . /app
WORKDIR /app
RUN npm install
ENV NODE_ENV production
CMD [ "node", "." ]
