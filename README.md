# OH!SHOWN Frontend

`OH!SHOWN 野生動物出沒痕跡通報系統` 的前端。搭配對應的 [後端](https://github.com/tai271828/disfactory-backend) 以呈現通報資料。

本專案為 [Disfactory 違章工廠舉報系統](https://github.com/Disfactory) 分支，感謝相關社群與人士分享與指教。

分支目前還處於基於 [Disfactory 違章工廠舉報系統](https://github.com/Disfactory) 程式碼重構施工階段中。
文件、程式碼與單元測試皆尚未更新完畢；歡迎大家直接送重構用程式碼、補丁與 Pull Request 。

## Project setup
### Pre-requisite

- Download nvm
go to https://github.com/nvm-sh/nvm
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash 
```
if you are using windows
go to https://github.com/coreybutler/nvm-windows and download .zip

- Download node(version 14 and 16 is not allowed)
```
nvm install 15.14.0
```
- git clone
```
git clone https://github.com/OH-SHOWN/ohshown-frontend.git
```


### Usage
- 

```bash
cp .env.example .env
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```
- You can see the following words in the terminal if you success.
```
App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.50.226:8080/
```
then click the URL.

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

### Run your unit tests

```bash
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
