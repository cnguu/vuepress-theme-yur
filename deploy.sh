#!/usr/bin/env bash
#
# VuePress generic deployment script
# VuePress 通用部署脚本
#
# Windows can't execute .sh file, need to install git client
# Windows 无法执行 .sh 文件，需要安装 git 客户端
#
# Author: cnguu
# Email: www@cnguu.cn
#

# Start
# 开始
set -e

# Compile
# 编译
yarn build

# Delete the dist_temp folder
# 删除 dist_temp 文件夹
rm -fr dist_temp

# Copy the dist folder to the dist_temp folder
# 复制 dist 文件夹到 dist_temp 文件夹
cp -ir dist dist_temp

# Go to the dist_temp directory
# 进入 dist_temp 目录
cd dist_temp

# Create a new CNAME file and write to the gleehub.com domain
# 新建 CNAME 文件，并写入 gleehub.com 域名
echo gleehub.com > CNAME

# Forced push to the master branch of the cnguu.github.io repository
# 强制推送到 cnguu.github.io 仓库的 master 分支
git init
git add -A
git commit -m deploy
git push -f git@github.com:cnguu/cnguu.github.io.git master

# Return to the previous directory
# 返回上一级目录
cd ../

# Delete the dist_temp folder
# 删除 dist_temp 文件夹
rm -fr dist_temp

# End
# 结束
cd -