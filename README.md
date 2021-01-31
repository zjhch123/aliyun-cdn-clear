# aliyun-cdn-refresh-cli

## Usage

### From command line

```shell
npm install aliyun-cdn-refresh-cli -g

aliyun-cdn-refresh-cli --ObjectPath * --ObjectType * --AccessKeyId * --AccessKeySecret *
```

### From code

```js
// npm install aliyun-cdn-refresh-cli

const operate = require('aliyun-cdn-refresh-cli');

operate({
  ObjectPath: *,
  ObjectType: *,
  AccessKeyId: *,
  AccessKeySecret: *,
});
```
