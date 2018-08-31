# template-vue-spa

> A awsome kaola project

## start

For the first time:
```
npm install
```

```bash
npm run build:dll
```

develop(本地mock):

```bash
npm run dev

进入 /mock/data  根据请求的api创建对应的文件路径

如 /api/dashboard/pie 需要创建三层文件夹  api - dashboard - pie - data.json

默认访问路径 http://localhost:9000/
```

develop(连接后台):

```bash
npm run devb


进入 /mock/proxy/rule.js文件夹，修改要连接的后台服务,修改规则看文件中的示例

默认访问路径 http://localhost:9000/ , 注意有权限控制的要先登陆连接的页面然后把cookie粘过来
```



build:

```bash
npm run build
```

## License

&copy; kaola-fed