# rtsp 服务端和客户端

https://blog.csdn.net/qq_32523587/article/details/103619568 : rtsp 参数详细说明

1. C/C++语言：
    - live555 中的命令行工具： openrtsp （需更改代码，调整数据接收方式，）
    - live555 testRTSPClient [基于 live555 的 rtsp 客户端接收及 ffmpeg 解码](http://blog.chinaunix.net/uid-15063109-id-4482932.html) （简单的 demo，需自己完善支持 sacle，官方推荐基于此改造）
    - https: //github.com/alm4096/FFMPEG-Live555-H264-H265-Streamer
    - GStreamer（大而复杂）:https: //dev.to/ethand91/gstreamer-tutorial-part-1-as-a-node-native-addon-25j8
    - https: //github.com/mpromonet/webrtc-streamer （rtsp 基于 live555, webrtc 不支持 hevc，不支持倍速）
    -
2. node:
    - https: //github.com/mbullington/yellowstone/tree/master :不支持 play 携带参数 scale
    - https: //github.com/chriswiggins/rtsp-streaming-server : 服务端，非 rtsp 客户端
    - https: //github.com/matijagaspar/ws-avc-player ： websocket avc 播放器， 非 rtsp
    - https: //github.com/godka/node-rtsp-live555 （基于 live555 testRTSPClient 改造,输出 flv， 不支持 scale，不支持 hevc）
3. go:
    - rtspv2 不支持 scale
    - https: //github.com/aler9/gortsplib (https: //blog.ritwikjain.com/a-library-for-working-with-rtsp-in-go) 不支持 scale

## EXE 运行失败

-   https://blog.csdn.net/qq_41028985/article/details/112997243 linux 使用 mingw 交叉编译 exe 文件，windows 无法运行

## win32 位编译和打包注意事项

-   编译： mingw-w64 的 i686-8.1.0-release-posix-sjlj 版本，因为要支持需要跨平台线程支持
-   vscode: 调试时，launch.json 的 type 为 cppdbg，MIMode 为 gdb，不能用 type 为 lldb，否则启动失败调试不了
-   打包：打包 32 位的 exe, pkg 需指定为 4.5.1 版本，其 pkg-fetch 才能拉取 32 位的 node 预编译包
-   c++： makefile 中可添加使用静态链接-static-libgcc -static-libstdc++ 避免兼容性问题
-

## 区分不同播放路数的进程通信方案

[进程间通信_消息队列](https: //github.com/puge-up/programming-cpp/blob/main/article/C%2B%2B%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B/%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E4%BF%A1\_%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97.md)

在一路视频中，PLAY PAUSE TEARDOWN 等命令通过进程间通信执行，node 端针对每路视频生成唯一的一个 proId，并携带进入可执行命令中(ftok 使用，生成唯一 msgid)，从而保证每路视频的操作进程消息是处于同一个消息队列中

-   type= 1 PLAY
-   type= 2 PAUSE
-   type= 3 TEARDOWN

PLAY PAUSE TEARDOWN 等进程，执行完成后立即 kill

## todo

— pkgbuild 重新安装后，需强制之前的服务重启，才能生效

## live555 资料

1. [live555 多线程改造](https://blog.csdn.net/weixin_30642267/article/details/97686862?spm=1001.2101.3001.6650.17&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-17-97686862-blog-60135975.235%5Ev38%5Epc_relevant_default_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-17-97686862-blog-60135975.235%5Ev38%5Epc_relevant_default_base&utm_relevant_index=22)
2. [基于 live555 的 rtsp 客户端接收及 ffmpeg 解码](http://blog.chinaunix.net/uid-15063109-id-4482932.html)
3. [testRTSPClient 流程图](https://blog.csdn.net/smilestone_322/article/details/17297817)
4. [＜三：使用，接收端＞ live555--接收端 testRTSPClient.cpp 源码分析-读取 rtsp 流 demo](https://blog.csdn.net/u012459903/article/details/94571433)

## flv 文件格式

**https://github.com/ireader/media-server.git ** 支持各种格式封装 libflv

[图像编码与 H264 基础知识](https://cloud.baidu.com/article/294140)

1. [一张图看懂 FLV 文件格式](https://blog.ibaoger.com/2017/06/04/flv-file-format/)
2. [FLV 封装格式介绍及解析](https://juejin.cn/post/6844903598476754951#heading-3)

## H264 码流格式解析及 RTP 打包规则整理

-   https://blog.csdn.net/luoyaxing0812/article/details/111352155

## makefile 调试

+vscode c++ 环境配置：https://zhuanlan.zhihu.com/p/486021900

-   vscode makefile 项目 传参: https://blog.csdn.net/why_are_you_so/article/details/131610723
-   Makefile 简介及如何指定头文件和库文件: https://blog.csdn.net/new9232/article/details/129107708

*   win 系统 c++环境配置：https://blog.csdn.net/AMDDMA/article/details/111600238 https://blog.csdn.net/u012294613/article/details/126525424 https://zhuanlan.zhihu.com/p/87864677
*   mingw 编译报错：inet_pton 不存在等： https://blog.csdn.net/qq153471503/article/details/132508310

## prompt 提示生成语

将 h264 和 h265 裸流数据转换成 flv 格式，c++类方式实现，不依赖 ffmpeg，按照 FLV 文件格式要求，分析裸流中的视频信息，输出 FLV 格式的数据，需要考虑 h264 和 h265、是否关键帧等情况

z

## RTSP 地址

[RTSP over UDP 与 RTSP over TCP 取流对比（转）](https://www.cnblogs.com/ajianbeyourself/p/17412946.html)

openRTSP -4 -d 15 rtsp://192.168.123.244:8554/mtvh.264 >~/Documents/tmp/a.mp4

o
