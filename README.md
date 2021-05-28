## 环境准备

node version >= 10 Install `node_modules`:

```bash
# 推荐使用 yarn 来安装依赖
npm install
或者
yarn
```

### 启动

```bash
npm start
```

### 打包部署

```bash
# 测试环境
npm run build

# 正式环境
npm run build:prod
```

### 检查代码格式

```bash
npm run lint
# 可以使用脚本自动修复某些 lint 错误
npm run lint:fix
```
