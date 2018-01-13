
/**
 * @param {string} str - ダミーを生成するパラメータ一覧を表す文字列
 * @returns {Object}
 */
export function generateDummyDict(str){
  return str.split(/[\,\t\r\n]+/g).reduce((a, b) => {
    const v = parseDummyValueSafe(b);
    if(v !== undefined){
      a[b] = v;
    }
    return a;
  }, new DummyDict());
}

/**
 * 
 */
class DummyDict{}

/**
 * @param {string} str
 * @returns {?(string|number|Date)}
 */
function parseDummyValueSafe(str){
  // number
  if(/^n\-?\d+(\.\d)?/.test(str)){
    return Number(str.substr(1));
  }
  // string random
  else if(/^sr\d+/.test(str)){
    return _generateRandomString(Number(str.substr(2)));
  }
  // string
  else if(/^s[\w\d\_\-]+/.test(str)){
    return str.substr(1);
  }
  // Date
  else if(/^d[\d\w\:\s\-\/]+/.test(str)){
    const d = new Date(str.substr(1));
    if(isNaN(d.getTime())) { return undefined }
    return d;
  }
  // null
  else if(/^p/.test(str)){
    return null;
  }

  return undefined;
}


/**
 * ランダム生成する文字の種類
 * @readonly
 * @type {string}
 */
const CHARACTOR_LIST = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-*/';

/**
 * ランダム文字列のマップ長
 * @readonly
 * @type {number}
 */
const CHARACTOR_LIST_LENGTH = CHARACTOR_LIST.length;

/**
 * 指定した長さのランダム文字列を取得する
 * @param {number} length
 * @returns {string}
 */
function _generateRandomString(length){
  let str = "";
  for(let i = 0; i < length; i++){
    str += CHARACTOR_LISTc[Math.floor(Math.random() * CHARACTOR_LIST_LENGTH)];
  }
  return str;
}