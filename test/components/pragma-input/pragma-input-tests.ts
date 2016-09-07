import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {PragmaInput} from './../../../src/components/pragma-input/pragma-input';

describe('PragmaInput Tests', function() {
    var pragmaInput;

    beforeEach(function() {
        pragmaInput = new PragmaInput({});
        pragmaInput.id = "test";
    });

    it('constructor', function() {
       expect(pragmaInput).to.not.be.null;
    });

    it('attached, ensure initialization functions called', function() {
        // Arrange
        let updateChildrenIdSpy = sinon.spy(pragmaInput, "updateChildrenId");
        let setLookupButtonVisiblitySpy = sinon.spy(pragmaInput, "setLookupButtonVisiblity");

        // Act
        pragmaInput.attached();

        // Assert
        assert(updateChildrenIdSpy.calledOnce, 'expected updateChildrenId to be called from attached');
        assert(setLookupButtonVisiblitySpy.calledOnce, 'expected setLookupButtonVisiblity to be called from attached');

        updateChildrenIdSpy.restore();
        setLookupButtonVisiblitySpy.restore();
    });

    it('lookupIdChanged, lookupId false, do not show button', function() {
        // Arrange
        pragmaInput.lookupId = null;
        let setLookupButtonVisiblitySpy = sinon.spy(pragmaInput, "setLookupButtonVisiblity");

        // Act
        pragmaInput.lookupIdChanged();

        // Assert
        assert(setLookupButtonVisiblitySpy.withArgs(false).calledOnce);

        setLookupButtonVisiblitySpy.restore();
    });

    it('lookupIdChanged, lookupId true, show button', function() {
        // Arrange
        pragmaInput.lookupId = "some lookup id";
        let setLookupButtonVisiblitySpy = sinon.spy(pragmaInput, "setLookupButtonVisiblity");

        // Act
        pragmaInput.lookupIdChanged();

        // Assert
        assert(setLookupButtonVisiblitySpy.withArgs(true).calledOnce);

        setLookupButtonVisiblitySpy.restore();
    });

    it('updateChildrenId', function() {
        // Arrange
        pragmaInput.id = "test";
        pragmaInput.element = {
            children: {
                label: {
                    setAttribute(attribute: string, value: string) {}
                },
                input: {
                    setAttribute(attribute: string, value: string) {}
                },
                button: {
                    setAttribute(attribute: string, value: string) {}
                },
                descriptor: {
                    setAttribute(attribute: string, value: string) {}
                }
            }
        };

        let labelSpy = sinon.spy(pragmaInput.element.children.label, "setAttribute");
        let inputSpy = sinon.spy(pragmaInput.element.children.input, "setAttribute");
        let buttonSpy = sinon.spy(pragmaInput.element.children.button, "setAttribute");
        let descriptorSpy = sinon.spy(pragmaInput.element.children.descriptor, "setAttribute");

        // Act
        pragmaInput.updateChildrenId();

        // Assert
        assert(labelSpy.withArgs("id", "test-label").calledOnce, "label id should be test-label");
        assert(labelSpy.withArgs("for", "test-input").calledOnce, "label for attribute should be test-input");
        assert(inputSpy.withArgs("id", "test-input").calledOnce, "input id shold be test-input");
        assert(inputSpy.withArgs("aria-describedby", "test-descriptor").calledOnce, "input described by should be test-descriptor");
        assert(buttonSpy.withArgs("id", "test-button").calledOnce, "button id should be test-button");
        assert(descriptorSpy.withArgs("id", "test-descriptor").calledOnce, "descriptor id should be set to test-descriptor");

        labelSpy.restore();
        inputSpy.restore();
        buttonSpy.restore();
        descriptorSpy.restore();
    });

    it('setLookupButtonVisiblity, show button');

    it('setLookupButtonVisiblity, hide button');
});

