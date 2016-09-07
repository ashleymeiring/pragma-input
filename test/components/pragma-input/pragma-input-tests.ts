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
        const updateChildrenIdSpy = sinon.spy(pragmaInput, "updateChildrenId");
        const setLookupButtonVisiblitySpy = sinon.spy(pragmaInput, "setLookupButtonVisiblity");

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
        const setLookupButtonVisiblitySpy = sinon.spy(pragmaInput, "setLookupButtonVisiblity");

        // Act
        pragmaInput.lookupIdChanged();

        // Assert
        assert(setLookupButtonVisiblitySpy.withArgs(false).calledOnce);

        setLookupButtonVisiblitySpy.restore();
    });

    it('lookupIdChanged, lookupId true, show button', function() {
        // Arrange
        pragmaInput.lookupId = "some lookup id";
        const setLookupButtonVisiblitySpy = sinon.spy(pragmaInput, "setLookupButtonVisiblity");

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

        const labelSpy = sinon.spy(pragmaInput.element.children.label, "setAttribute");
        const inputSpy = sinon.spy(pragmaInput.element.children.input, "setAttribute");
        const buttonSpy = sinon.spy(pragmaInput.element.children.button, "setAttribute");
        const descriptorSpy = sinon.spy(pragmaInput.element.children.descriptor, "setAttribute");

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

    it('setLookupButtonVisiblity, show button', function() {
        // Arrange
        pragmaInput.id = "test";
        pragmaInput.element = {
            children: {
                "test-button": {
                    setAttribute(attribute: string, value: string) {},
                    hasAttribute(attribute: string) {
                        return true;
                    },
                    removeAttribute(attribute: string) {}
                }
            }
        };

        let setAttributeSpy = sinon.spy(pragmaInput.element.children["test-button"], "setAttribute");
        let hasAttributeSpy = sinon.spy(pragmaInput.element.children["test-button"], "hasAttribute");
        let removeAttributeSpy = sinon.spy(pragmaInput.element.children["test-button"], "removeAttribute");

        // Act
        const result = pragmaInput.setLookupButtonVisiblity(true);

        // Assert
        assert(setAttributeSpy.withArgs("aria-hidden", false).calledOnce, "aria-hidden should be false");
        assert(hasAttributeSpy.withArgs("hidden").calledOnce, "check if element has hidden attribute should be called once");
        assert(removeAttributeSpy.withArgs("hidden").calledOnce, "remove attribute should have been called to remove hidden attribute");
        assert(result, 'expected setLookupButtonVisibility to return true');

        setAttributeSpy.restore();
        hasAttributeSpy.restore();
        removeAttributeSpy.restore();
    });

    it('setLookupButtonVisiblity, hide button', function() {
        // Arrange
        pragmaInput.id = "test";
        pragmaInput.element = {
            children: {
                "test-button": {
                    setAttribute(attribute: string, value: string) {},
                }
            }
        };

        let setAttributeSpy = sinon.spy(pragmaInput.element.children["test-button"], "setAttribute");

        // Act
        const result = pragmaInput.setLookupButtonVisiblity(false);

        // Assert
        assert(setAttributeSpy.withArgs("aria-hidden", true).calledOnce, "aria-hidden should be true");
        assert(setAttributeSpy.withArgs("hidden", "hidden").calledOnce, "hidden attribute should be set to hidden");
        assert(result, 'expected setLookupButtonVisibility to return true');

        setAttributeSpy.restore();
    });

    it ("setLookupButtonVisiblity, no button", function() {
        // Arrange
        pragmaInput.id = "test";
        pragmaInput.element = {
            children: {
            }
        };

        // Act
        const result = pragmaInput.setLookupButtonVisiblity(true);

        // Assert
        assert(!result, 'expected setLookupButtonVisibility to return false');
    })
});

