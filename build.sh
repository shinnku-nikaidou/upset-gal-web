#!/bin/bash
yarn install
yarn build
sudo rm -r /www/wwwroot/shinnku.com/*
sudo cp -r dist/* /www/wwwroot/shinnku.com/
