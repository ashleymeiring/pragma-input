import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {PragmaInput} from './../../../src/components/pragma-input/pragma-input';

declare var global;

(<any>global).Event = class Event {
};

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
                "lookup-container": {
                    children: {
                        input: {
                            setAttribute(attribute: string, value: string) {
                            }
                        },
                        button: {
                            setAttribute(attribute: string, value: string) {
                            },
                            addEventListener(event: string, callback: any) {
                            }
                        }
                    }
                },
                descriptor: {
                    setAttribute(attribute: string, value: string) {}
                }
            }
        };

        const labelSpy = sinon.spy(pragmaInput.element.children.label, "setAttribute");
        const inputSpy = sinon.spy(pragmaInput.element.children["lookup-container"].children.input, "setAttribute");
        const buttonSpy = sinon.spy(pragmaInput.element.children["lookup-container"].children.button, "setAttribute");
        const descriptorSpy = sinon.spy(pragmaInput.element.children.descriptor, "setAttribute");
        const addEventListenerSpy = sinon.spy(pragmaInput.element.children["lookup-container"].children.button, "addEventListener")

        // Act
        pragmaInput.updateChildrenId();

        // Assert
        assert(labelSpy.withArgs("id", "test-label").calledOnce, "label id should be test-label");
        assert(labelSpy.withArgs("for", "test-input").calledOnce, "label for attribute should be test-input");
        assert(inputSpy.withArgs("id", "test-input").calledOnce, "input id shold be test-input");
        assert(inputSpy.withArgs("aria-describedby", "test-descriptor").calledOnce, "input described by should be test-descriptor");
        assert(buttonSpy.withArgs("id", "test-button").calledOnce, "button id should be test-button");
        assert(descriptorSpy.withArgs("id", "test-descriptor").calledOnce, "descriptor id should be set to test-descriptor");
        assert(addEventListenerSpy.calledOnce, "addEventListener on button should be called once");

        labelSpy.restore();
        inputSpy.restore();
        buttonSpy.restore();
        descriptorSpy.restore();
        addEventListenerSpy.restore();
    });

    it('setLookupButtonVisiblity, show button', function() {
        // Arrange
        pragmaInput.id = "test";
        pragmaInput.element = {
            children: {
                "lookup-container": {
                    children: {
                        "test-button": {
                            setAttribute(attribute: string, value: string) {
                            },
                            hasAttribute(attribute: string) {
                                return true;
                            },
                            removeAttribute(attribute: string) {
                            }
                        }
                    }
                }
            }
        };

        let setAttributeSpy = sinon.spy(pragmaInput.element.children["lookup-container"].children["test-button"], "setAttribute");
        let hasAttributeSpy = sinon.spy(pragmaInput.element.children["lookup-container"].children["test-button"], "hasAttribute");
        let removeAttributeSpy = sinon.spy(pragmaInput.element.children["lookup-container"].children["test-button"], "removeAttribute");

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
                "lookup-container": {
                    children: {
                        "test-button": {
                            setAttribute(attribute: string, value: string) {},
                        }
                    }
                }
            }
        };

        const setAttributeSpy = sinon.spy(pragmaInput.element.children["lookup-container"].children["test-button"], "setAttribute");

        // Act
        const result = pragmaInput.setLookupButtonVisiblity(false);

        // Assert
        assert(setAttributeSpy.withArgs("aria-hidden", true).calledOnce, "aria-hidden should be true");
        assert(setAttributeSpy.withArgs("hidden", "hidden").calledOnce, "hidden attribute should be set to hidden");
        assert(result, 'expected setLookupButtonVisibility to return true');

        setAttributeSpy.restore();
    });

    it('detached', function() {
        // Arrange
        pragmaInput.id = "test";
        pragmaInput.element = {
            children: {
                "lookup-container": {
                    children: {
                        "test-button": {
                            removeEventListener(event: string, callback: any) {},
                        }
                    }
                }
            }
        };

        pragmaInput.lookupEvent = {};
        pragmaInput.errorMessage = {};
        pragmaInput.lookupId = {};
        pragmaInput.descriptor = {};
        pragmaInput.label = {};
        pragmaInput.value = {};
        pragmaInput.descriptorBackup = {};

        const removeEventListenerSpy = sinon.spy(pragmaInput.element.children["lookup-container"].children["test-button"], "removeEventListener");

        // Act
        pragmaInput.detached();

        // Assert
        assert(removeEventListenerSpy.calledOnce, "removeEventListener should be called once");

        expect(pragmaInput.errorMessage).to.be.null;
        expect(pragmaInput.lookupId).to.be.null;
        expect(pragmaInput.id).to.be.null;
        expect(pragmaInput.descriptor).to.be.null;
        expect(pragmaInput.label).to.be.null;
        expect(pragmaInput.value).to.be.null;
        expect(pragmaInput.descriptorBackup).to.be.null;
        expect(pragmaInput.element).to.be.null;

        removeEventListenerSpy.restore()
    });

    it("errorMessageChanged, updateHasError = false", function() {
        // Arrange
        pragmaInput.errorMessage = null;
        pragmaInput.updateDescriptor = function(){};
        pragmaInput.updateHasError = function(hasError){};
        const updateDescriptorSpy = sinon.spy(pragmaInput, "updateDescriptor");
        const updateHasErrorSpy = sinon.spy(pragmaInput, "updateHasError");

        // Act
        pragmaInput.errorMessageChanged();

        // Assert
        expect(updateDescriptorSpy.calledOnce, "expected updateDescriptor to be called once");
        expect(updateHasErrorSpy.withArgs(false).calledOnce, "expected updateHasError to be called once with parameter false");

        updateDescriptorSpy.restore();
        updateHasErrorSpy.restore();
    });

    it("errorMessageChanged, updateHasError = true", function() {
        // Arrange
        pragmaInput.errorMessage = "error";
        pragmaInput.updateDescriptor = function(){};
        pragmaInput.updateHasError = function(hasError){};
        const updateDescriptorSpy = sinon.spy(pragmaInput, "updateDescriptor");
        const updateHasErrorSpy = sinon.spy(pragmaInput, "updateHasError");

        // Act
        pragmaInput.errorMessageChanged();

        // Assert
        expect(updateDescriptorSpy.calledOnce, "expected updateDescriptor to be called once");
        expect(updateHasErrorSpy.withArgs(true).calledOnce, "expected updateHasError to be called once with parameter true");

        updateDescriptorSpy.restore();
        updateHasErrorSpy.restore();
    })
});

