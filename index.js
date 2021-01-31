const _ = require('underscore');
const hmacSHA1 = require('crypto-js/hmac-sha1');
const Base64 = require('crypto-js/enc-base64');
const fetch = require('node-fetch');

const getRequestParams = ({
  ObjectPath,
  ObjectType,
  AccessKeyId,
  AccessKeySecret,
}) => {
  const params = {};

  params.AccessKeyId = AccessKeyId;
  params.Action = 'RefreshObjectCaches';
  params.Format = 'JSON';
  params.ObjectPath = ObjectPath;
  params.ObjectType = ObjectType;
  params.SignatureMethod = 'HMAC-SHA1';
  params.SignatureNonce = Math.random();
  params.SignatureVersion = '1.0';
  params.Timestamp = new Date().toISOString();
  params.Version = '2018-05-10';

  const queryString = _.map(params, (content, key) => `${key}=${encodeURIComponent(content)}`).join('&');
  const stringToSign = `GET&%2F&${encodeURIComponent(queryString)}`;

  const sign = Base64.stringify(hmacSHA1(stringToSign, AccessKeySecret + '&'));

  return `${queryString}&Signature=${encodeURIComponent(sign)}`;
};

const operate = ({
  ObjectPath,
  ObjectType,
  AccessKeyId,
  AccessKeySecret,
}) => {
  const sign = getRequestParams({
    ObjectPath,
    ObjectType,
    AccessKeyId,
    AccessKeySecret,
  });

  return fetch(`https://cdn.aliyuncs.com/?${sign}`).then(data => data.json());
};

module.exports = operate;
