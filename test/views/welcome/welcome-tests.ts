import {expect} from 'chai';
import 'aurelia-polyfills';
import {Welcome} from './../../../src/views/welcome/welcome';

describe('Welcome Tests', function() {
    var welcome;

    beforeEach(function() {
       welcome = new Welcome();
    });

    it('constructor', function() {
       expect(welcome).to.not.be.null;
    });

    it('hasErrorClickHandler, no error -> error', function() {
        // Arrange
        welcome.workOrderError = null;

        // Act
        welcome.hasErrorClickHandler();

        // Assert
        expect(welcome.workOrderError).to.equal('something went wrong')
    });

    it('hasErrorClickHandler, error -> no error', function() {
        // Arrange
        welcome.workOrderError = "something went wrong";

        // Act
        welcome.hasErrorClickHandler();

        // Assert
        expect(welcome.workOrderError).to.be.null;
    })
});