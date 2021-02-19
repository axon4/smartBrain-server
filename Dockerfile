FROM node:14.15.0

WORKDIR /usr/src/smartBrain-server

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]