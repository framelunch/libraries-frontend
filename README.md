# FRAME LUNCH frontend libraries

フレームランチのよく使われるコード集(フロント用)

## 依存

### JS

- babel
    - babel-preset-flow
    - babel-preset-env
    - babel-plugin-transform-object-rest-spread

### CSS

- PostCSS
    - postcss-import
    - postcss-custom-media
    - postcss-custom-properties
    - postcss-nested

## 使い方

### インストール

```bash
# newest version
yarn add framelunch/libraries-frontend-framelunch
# target version
yarn add framelunch/libraries-frontend-framelunch#v0.0.1
```

### JS使用例

```javascript
# before
import notice from '../libs/notice';
import state from '../libs/state';
# after 🌻
import notice from 'libraries-frontend-framelunch/js/notice';
import state from 'libraries-frontend-framelunch/js/state';
```

### CSS使用例

```postcss
/* before */
@import "./modules/_variables.css";
@import "./modules/_keyframes.css";
@import "./modules/_reset.css";

/* after(微妙) */
@import "../../node_modules/libraries-frontend-framelunch/css/_variables.css";
@import "../../node_modules/libraries-frontend-framelunch/css/_keyframes.css";
@import "../../node_modules/libraries-frontend-framelunch/css/_reset.css";

/* after(TODO: これでいけると思ったけどダメだった) */
@import "~libraries-frontend-framelunch/css/_variables.css";
@import "~libraries-frontend-framelunch/css/_keyframes.css";
@import "~libraries-frontend-framelunch/css/_reset.css";
```

## TODO

- [ ] ビルドかます
    - JS: ES5
        - 別途型ファイルも吐く
    - CSS: CSS3
        - font-awesomeみたいな形になってると楽だね
