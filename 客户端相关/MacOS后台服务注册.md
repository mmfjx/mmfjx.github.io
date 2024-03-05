# MacOS 后台服务注册

1. **.plist** 文件位置: /Library/LaunchDaemons/com.video.RtspFmp4.plist， 注意根目录是 macintoshHD，不是 Users
2. 载入并运行

    ```
    	launchctl load ~/Library/LaunchAgents/com.video.RtspFmp4.plist
    	launchctl start com.video.RtspFmp4.plist

    	sudo launchctl list | grep com.video.RtspFmp4
    	sudo launchctl print system/com.video.RtspFmp4
    ```


    	launchctl stop com.video.RtspFmp4.plist
    	launchctl unload ~/Library/LaunchAgents/com.video.RtspFmp4.plist
    ````


    pkgbuild --root /Users/mmf/pj/RTSPtoWSMP4f/RtspFmp4 --identifier com.video.RtspFmp4 --version 1.0 RtspFmp4.pkg

有一个可执行文件 aiot-node-rtsp，要求在 macOS 系统上能开机启动、后台运行、能在浏览器地址栏中通过自定义协议唤醒运行，希望在用户安装完成的同时自动完成以上动作，另外给出生成 pkg 安装包的过

## 已完成

-   后台运行
-   开机启动
-   pkg 安装包

## TODO

-   日志位置
-   自定义协议
-   是否切换为用户级别的应用

sudo launchctl bootout ~/Library/LaunchDaemons/com.mt.aiotNodeRtsp.plist
sudo launchctl bootstrap system /Library/LaunchDaemons/com.mt.aiot-node-rtsp.plist
sudo launchctl start ~/Library/LaunchDaemons/com.mt.aiot-node-rtsp.plist

## 坑记录

-   服务名称不能用‘-’拼接，用驼峰，不然一直启动失败
-   install-location 一定要设置路径（一般是/Applications）， 不然默认根目录，会安装失败，提示“软件包正尝试将内容安装到系统宗卷。请联系软件生产企业以获得帮助。”
