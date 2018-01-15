
import assert from 'power-assert';

import {
  generateDummyDict,
  generateF,
  collectProperties,
} from '../src';

describe('Javascript AST', () => {
  it('Collect Menmber Expression', async function(){

    const code = `function f(data){
      return data['n10'] + data['n50'] + 30
    }`;
    const usage_params = collectProperties(code);
    assert(Array.isArray(usage_params));
    assert(usage_params.length === 2);
    const f = generateF(code);
    assert(f instanceof Function);

    const dd = generateDummyDict(usage_params.join(","));
    const result = await f(dd);
    assert(result === 90);
  });
  it('Throw', async function(){

    const code = `function f(data){
      return data['n10'] + data['n50'] + 30 +
    }`;
    try{
      const usage_params = collectProperties(code);
    }catch(e){
      assert(e.constructor.name === 'SyntaxError');
    }
  });
});