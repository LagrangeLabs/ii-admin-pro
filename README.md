# II-ADMIN-PRO

实在中后台项目模板

## 一、环境准备

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

### sentry 配置

**修改 `.sentryclic文件` **

- 将 project 修改成自己当前的项目名称；
- token 值是在 sentry 服务器上创建的 API keys 令牌，记得需勾选`project:write` 和 `event:write` 这 2 个选项;

```
[defaults]
project=ii-admin-pro
url=http://sentry.ai-indeed.com/
org=sentry

[auth]
token=写入自己的Token
```

**修改 dsn**

在 Sentry 服务器上创建项目时，将正确的 dsn 填入到下方配置中。

```Javascript
Sentry.init({
  dsn: 'http://248c7xxxxxxxxxxx248624de0a9b@sentry.ai-indeed.com/3',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  release: process.env.npm_package_version,
})
```

#### 组件库使用

使用 ii-admin-ui、ii-admin-base、ii-admin-business 时

- 短期项目：版本号可以固定
- 长期项目：版本号固定或者自动升级都可以~

## 二、版本改动点

**版本 2.1.1**

- ii-admin-ui、ii-admin-base、ii-admin-business 支持按需引入

**版本 2.1.0**

- 添加 sentry 的工程化配置；
- 添加 sentry 文档配置描述；
