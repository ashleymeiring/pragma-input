import {expect} from 'chai';
import {PragmaInputBase} from './../../../src/components/pragma-input/pragma-input-base';

describe('PragmaInputBase Tests', function() {
   var pragmaInputBase;

   beforeEach(function() {
       pragmaInputBase = new PragmaInputBase({});
   });

   it('constructor', function() {
       expect(pragmaInputBase).to.not.be.null;
   });
})