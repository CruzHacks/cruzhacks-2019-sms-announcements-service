FROM node:10-alpine

LABEL maintainer="Kyle O'Brien, kdobrien@ucsc.edu"

WORKDIR /sms-announcements-service/

COPY . /sms-announcements-service/

RUN npm install --production

ENV API_PORT=80

CMD ["npm", "start"]
