
import {parse} from 'babylon';
import traverse from 'babel-traverse';

/**
 * Javascriptのコードからdata["hoge"]で書かれた
 * Propertyへのアクセスパターンを探し、パラメータの一覧を返す
 * @param {string} code 
 * @returns {string[]}
 * @throws {SyntaxError} A code is invalid syntax
 */
export function collectProperties(code){
  const usage_params = [];
  const ast = parse(code);
  traverse(ast, {
    // data["*"] の形式で書かれたパラメータを抽出
    MemberExpression: (path) => {
      const node = path.node;
      // fの引数から推測させるほうが良い
      if(node.object.name === 'data'){
        usage_params.push(node.property.value);
      }
    }
  });
  return usage_params;
}