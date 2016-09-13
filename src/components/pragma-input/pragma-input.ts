import {bindable, customElement, useShadowDOM, inject} from 'aurelia-framework';

@customElement('pragma-input')
@useShadowDOM()
@inject(Element)
export class PragmaInput {
    element: any;
    descriptorBackup: any = null;
    lookupEvent: Event;

    @bindable value;
    @bindable label;
    @bindable descriptor;
    @bindable id;
    @bindable lookupId;
    @bindable errorMessage;

    constructor(element) {
        this.element = element;
        this.lookupEvent = new Event("lookup");
    }

    hasLookupId(): boolean {
        return this.lookupId ? this.lookupId.length > 0 : false;
    }

    attached() {
        this.updateChildrenId();
        this.setLookupButtonVisiblity(this.hasLookupId());
    }

    detached() {
        const buttonElement = this.element.children["lookup-container"].children[`${this.id}-button`];
        buttonElement.removeEventListener("click", this.lookupButtonClicked.bind(this));

        this.lookupEvent = null;
        this.errorMessage = null;
        this.lookupId = null;
        this.id = null;
        this.descriptor = null;
        this.label = null;
        this.value = null;
        this.descriptorBackup = null;
        this.element = null;
    }

    lookupIdChanged() {
        this.setLookupButtonVisiblity(this.hasLookupId());
    }

    updateChildrenId() {
        if (!this.element.children) {
            return;
        }

        const idLabel = `${this.id}-label`;
        const idInput = `${this.id}-input`;
        const idDescriptor = `${this.id}-descriptor`;
        const idButton = `${this.id}-button`;

        const labelElement = this.element.children.label;
        const inputElement = this.element.children["lookup-container"].children.input;
        const buttonElement = this.element.children["lookup-container"].children.button;
        const descriptorElement = this.element.children.descriptor;

        labelElement.setAttribute("id", idLabel);
        labelElement.setAttribute("for", idInput);

        inputElement.setAttribute("id", idInput);
        inputElement.setAttribute("aria-describedby", idDescriptor);

        buttonElement.setAttribute("id", idButton);
        descriptorElement.setAttribute("id", idDescriptor);

        buttonElement.addEventListener("click", this.lookupButtonClicked.bind(this));
    }

    setLookupButtonVisiblity(isVisible: boolean): boolean {
        if (!this.element.children || this.element.children.length == 0) {
            return false;
        }

        const buttonElement = this.element.children["lookup-container"].children[`${this.id}-button`];

        buttonElement.setAttribute("aria-hidden", !isVisible);

        if (isVisible) {
            if (buttonElement.hasAttribute("hidden")) {
                buttonElement.removeAttribute("hidden");
            }
        }
        else {
            buttonElement.setAttribute("hidden", "hidden")
        }

        return true;
    }

    errorMessageChanged() {
        this.updateDescriptor();
        this.updateHasError(this.errorMessage ? true : false);
    }

    descriptorChanged() {
        if (this.descriptorBackup == null) {
            this.descriptorBackup = this.descriptor;
        }
    }

    updateDescriptor() {
        if (this.errorMessage) {
            this.descriptor = this.errorMessage;
        }
        else {
            this.descriptor = this.descriptorBackup;
        }
    }

    updateHasError(hasError) {
        const inputElement = this.element.children["lookup-container"].children[`${this.id}-input`];
        const descriptorElement = this.element.children[`${this.id}-descriptor`];

        if (hasError) {
            inputElement.classList.add("has-error");
            descriptorElement.classList.add("has-error");
        }
        else {
            inputElement.classList.remove("has-error");
            descriptorElement.classList.remove("has-error");
        }
    }

    lookupButtonClicked() {
        if (this.lookupEvent) {
            this.element.dispatchEvent(this.lookupEvent);
        }
    }
}
