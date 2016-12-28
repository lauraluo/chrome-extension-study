# Markup Starter Kit

- 使用 node v5.4.1
- 使用 Jade
- 使用 Scss
- 使用 Gulp

# 安裝

安裝全域工具gulp(裝過一次即可)
```
$ npm install gulp -g
```

安裝切版環境(每個新專案都要執行)
```
$ npm install 
```

## 檔案結構
- /src: 主要開發目錄
- /dist: gulp生成的最終結果，為自動產生的檔案，切版人員可以無視。

## Gulp Task

啟用gulp(gulp default)

```
$ gulp
```

清掉dist檔
```
$ gulp reset
```
## 注意事項 

### 使用sprites產生圖片及scss
- 將`.png`圖，置入`src/images/sprites/`底下
- 只支援`.png`
- 至少先執行`$ gulp defulat`一次
- gup將圖片合成為一張`dist/images/sprites.png`，並將其對應的樣式宣告及mixin打包成`src/scss/_sprite.scss`
- 最後記得將main.scss裡的註解打開

before
``` scss
//1.utils
@import "utils/_bemify.scss"; //A set of Sass mixins to write well-structured, maintainable, idiomatic BEM-style .scss source:
@import "utils/_variables.scss";
@import "utils/_mixins.scss";
@import "utils/_grid.scss";
//sprite scss import 至少要啟用gulp一次
//@import "_sprite.scss";
```

after

``` scss
//1.utils
@import "utils/_bemify.scss"; //A set of Sass mixins to write well-structured, maintainable, idiomatic BEM-style .scss source:
@import "utils/_variables.scss";
@import "utils/_mixins.scss";
@import "utils/_grid.scss";
//sprite scss import 至少要啟用gulp一次
@import "_sprite.scss";
```

### 清掉多餘的垃圾檔案

- 正式交接靜態網站時，請使用`$ gulp reset`刪掉棄用的檔案
- 然後再執行一次`$ gulp`

