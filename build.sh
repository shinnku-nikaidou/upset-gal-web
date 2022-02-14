#!/usr/bin/bash
yarn build
sudo rm -r /www/wwwroot/shinnku.com/*
sudo cp -r build/* /www/wwwroot/shinnku.com/
