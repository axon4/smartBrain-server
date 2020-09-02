FROM node:12.17.0

WORKDIR /usr/src/smartbrain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]