# 中后台项目统一模板 (ii-admin-pro)

`ii-admin-pro` 项目是杭州实在智能前端团队基于现有的中后台业务沉淀的一套中后台项目模板，整个项目模板是基于 Ant Design V4 以及 umi V3 等以上版本进行的沉淀。

## 一、项目启动 

安装依赖。

```bash
$ yarn
```

运行 Mock 环境。

```bash
$ yarn mock 
```

测试环境。

```bash
$ yarn dev
```

项目打包编译。

```bash
$ yarn build
```

## 二、部署事项

### 2.1 持续集成

整个项目是基于 Travis CI 搭建的持续集成环境。

注意：`ii-admin-pro` 项目是基于 `https://travis-ci.org` 进行构建测试的，不是 `https://travis-ci.com`。所以，在本地进行账号登录加密的时候，要使用 `travis login --org`方式进行账号登录。

## 三、参考资料

+ 在 React&&Redux 项目中，如何使用Typescript编写相关约束，见指南[《react-redux-typescript-guide》](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md)
