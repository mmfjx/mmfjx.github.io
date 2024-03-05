## ffmpeg 相关

1、 FFmpeg 探测流程分析：https: //blog.csdn.net/myvest/article/details/90731805 （讲解详细，需重点看）
ffmpeg -i ./Desktop/video/real-265.mp4 -codec: copy -movflags faststart ~/Desktop/video/real-265_moov_before.mp4

/usr/local/ffmpeg/bin/ffprobe -show_entries frame=key_frame http://localhost:9000/live/STREAM_NAME.flv

/usr/local/ffmpeg/bin/ffplay -loglevel debug http://localhost:8000/live/STREAM_NAME.flv

直播推流：
/usr/local/ffmpeg/bin/ffmpeg -stream_loop -1 -re -i ./Desktop/video/song_h265.mp4 -c:v copy -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://127.0.0.1/live/STREAM_NAME

设置 gop :  
ffmpeg -i ./Desktop/video/hls-265-business.mp4 -keyint_min 50 -g 50 -c:v libx265 -movflags faststart ./Desktop/video/hls-265-business-g50.mp4

ffmpeg -i ./Desktop/video/hls-265-business.mp4 -keyint_min 50 -g 50 -codec: copy ./Desktop/video/hls-265-business-g50.mp4

ffmpeg -i ./Desktop/video/hls-265-business-g50.mp4 -movflags faststart ./Desktop/video/hls-265-business-g50-1.mp4

## 关于 HEVC 的 MP4 的 codec_tag 的 hev1 和 hvc1 的区别

hev1 or hvc1 是两种 codec tag，表示 mov 或者其他容器中 hevc 流的不同打包方式
苹果不支持 265 的 hev1 （这种是国际标准的，苹果不用）

hev1 or hvc1 是两种 codec tag，表示 mp4 容器中 hevc 流的不同打包方式。Quicktime Player 和 iOS 不再支持 hev1 tag 的 mp4。
hev1 or hvc1 只是 hevc 在 mp4 中的两种不同打包方式，编码格式本身都是 hevc，所以可以在这两种 tag 之间进行切换，而不用重新编码。
于是尝试通过以下命令转换 mp4 的 codec tag：

```shell
ffmpeg -i leon.mp4 -c:v copy -tag:v hvc1 -c:a copy leon-hvc1.mp4

```

作者：ltlovezh
链接：https: //juejin.cn/post/6854573210579501070
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
