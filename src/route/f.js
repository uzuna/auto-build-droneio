import express from 'express';
export const router = express.Router();
import debug_gen from 'debug';
const debug = debug_gen("QUERY_F");

import {
  generateDummyDict,
  generateF,
  collectProperties,
} from '../';

/**
 * 実行EndPoint
 */
router.get('/f', async (req, res) => {
  debug("f query", req.query);
  const rs = await runf(req.query.body, req.query.code)
    .then((rs) => {
      res.send(rs);
    }).catch((e) => {
      res
        .status(400)
        .type('text/plain')
        .send(`[${e.constructor.name}] ${e.message}`);
    });
});


/**
 * 実行EndPoint fx
 */
router.get('/fx', async (req, res) => {
  debug("fx query", req.query);
  const rs = await runfx( req.query.code)
    .then((rs) => {
      res.send(rs);
    }).catch((e) => {
      res
        .status(400)
        .type('text/plain')
        .send(`[${e.constructor.name}] ${e.message}`);
    });
});


/**
 * Query内容で計算して結果を返す
 * @param {string} body_str 
 * @param {string} code
 * @returns {Object}
 */
async function runf(body_str, code){
  const f = generateF(code);
  const dd = generateDummyDict(body_str);
  const result = await f(dd);
  return {
    code,
    body: dd,
    result,
  };
}

/**
 * Codeからpropertyを生成して計算をする
 * @param {string} code
 * @returns {Object}
 */
async function runfx(code){
  const usage_params = collectProperties(code);
  const f = generateF(code);
  const dd = generateDummyDict(usage_params.join(","));
  const result = await f(dd);
  return {
    code,
    body: dd,
    result,
  };
}
