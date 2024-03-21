## yeoman run loop
### 执行顺序优先级（running order）
1. `initializing`： 初始化方法（check当前项目状态、获取configs。。。）
2. `prompting`：用户配置引导（调用`this.prompt()`）
3. `configuring`：保存配置项并且配置项目（创建`.editorconfig`文件和其他元数据文件（metadata files））
4. `default`： 如果方法没有匹配优先级字段，将会进入这个group
5. `writing`：编写脚手架写入文件的地方（routes,controllers,etc）
6. `conflicts`：处理冲突的地方（一般内部使用）
7. `install`：安装依赖包的地方（npm，bower）
8. `end`：最后调用，清理，say goodbye