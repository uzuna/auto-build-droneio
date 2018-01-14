
import vm from 'vm';
import assert_pre from 'assert'

/**
 * javascriptで書かれた計算式を渡すと関数が返ってくる
 * @param {string} code - javascript書式
 * @returns {Promise<Function>}
 */
export function generateF(code){
  const vc = new ClosureVMF(code);
  return async function(data){
    return vc.run(data);
  }
}





/**
 * 計算式を使うパターン
 * 書き方がfunction f(){}でてぎする形式になるが、1/3ほど高速
 */
export class ClosureVMF{

  /**ClosureVMF
   * 
   * @param {string} code - 任意のjavascript code
   * @returns {ClosureVMF}
   * @throws {AssertionError} 関数fの定義がない場合
   * @throws {SyntaxError} 入力されたコードの書式に間違いが在る場合
   */
  constructor(code){
    assert_pre(/function\s+f\(/.test(code), `Need define of "function f(data)" in code`)
    const script = new vm.Script(code)
    const sandbox = {}
    vm.createContext(sandbox)
    script.runInContext(sandbox)
    assert_pre(typeof sandbox.f !== 'Function',
      `Need define of "function f(data)" in code`)
    this._fn = sandbox.f;
  }
  /**
   * Dictを渡すと関数の実行結果が返ってくる
   * @param {Object} data - Dict形式のデータ。
   * @return {Any}
   * @throws {TypeError} コード内のアクセス方法のミス
   */
  async run(data){
    return this._fn(data);
  }
}