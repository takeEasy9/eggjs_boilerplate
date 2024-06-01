#!/bin/bash
echo "开始停止行情数据同步服务"
echo "当前目录为$PWD"
echo "开始删除 eggjs_boilerplate 目录下的代码"
rm -rf ./eggjs_boilerplate/*
echo "开始解压到 eggjs_boilerplate 目录..."
tar -zxf eggjs_boilerplate.tgz -C ./eggjs_boilerplate
echo "eggjs_boilerplate.tgz 解压完成"
cd ./eggjs_boilerplate
echo "当前目录为$PWD"
echo "修改 egg-scripts文件执行权限"
chmod +x ./node_modules/.bin/egg-scripts
echo "开始构建 eggjs_boilerplate docker 镜像..."
docker build -t eggjs_boilerplate .
CONTAINER_ID=`docker ps -a | grep eggjs_boilerplate.*8079/tcp | grep -v grep | awk '{print $1}'`
echo "容器ID为 $CONTAINER_ID"
if [ -z "$CONTAINER_ID" ]
then
  echo "[ 找不到行情数据同步服务 ]"
  echo "开始启动行情数据同步服务"
  docker run -d -p 8079:8079 \
  --memory=32g --memory-swap=32g --oom-kill-disable \
  -v /home/eggjs_boilerplate/logs/eggjs_boilerplate:/home/app/eggjs_boilerplate/logs/eggjs_boilerplate eggjs_boilerplate \
  eggjs_boilerplate
  echo "行情数据同步服务启动成功"
else
  echo "行情数据同步服务容器ID: $CONTAINER_ID"
  docker stop $CONTAINER_ID
  docker rm $CONTAINER_ID
  echo "成功停止行情数据同步服务"
  echo "开始启动行情数据同步服务"
  docker run -d -p 8079:8079 \
  --memory=32g --memory-swap=32g --oom-kill-disable \
  -v /home/eggjs_boilerplate/logs/eggjs_boilerplate:/home/app/eggjs_boilerplate/logs/eggjs_boilerplate eggjs_boilerplate \
  eggjs_boilerplate
  echo "行情数据同步服务启动成功"
fi