FROM node:18.16.0

ENV DIRPATH=/home/app/eggjs_boilerolate TIME_ZONE=Asia/Shanghai

RUN \
  mkdir -p $DIRPATH \
  && echo "${TIME_ZONE}" > /etc/timezone \ 
  && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime 

VOLUME $DIRPATH

WORKDIR $DIRPATH

COPY package.json $DIRPATH

# RUN npm i

RUN npm i --registry=https://registry.npm.taobao.org \
 && npm install -g npm@9.6.5

COPY . $DIRPATH

EXPOSE 8079/tcp

CMD EGG_SERVER_ENV=prod NODE_OPTIONS="--max-semi-space-size=256 --max-old-space-size=8192" npm start