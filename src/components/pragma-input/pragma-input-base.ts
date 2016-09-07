export class PragmaInputBase {
    element = null;
    id = null;

    constructor(element) {
       this.element = element;
    }

    /*
        this code is to overcome existing issues with shadowdom in aurelia.
        when the control id changes make sure that the content id's also change so that they can function along with other
        controls of the same type.

        this should only happen once because the id of the pragma-input only changes once and that is during assignment
     */
    updateChildrenId() {
        const idLabel = `${this.id}-label`;
        const idInput = `${this.id}-input`;
        const idDescriptor = `${this.id}-descriptor`;
        const idButton = `${this.id}-button`;

        const labelElement = this.element.children.label;
        const inputElement = this.element.children.input;
        const buttonElement = this.element.children.button;
        const descriptorElement = this.element.children.descriptor;

        labelElement.setAttribute("id", idLabel);
        labelElement.setAttribute("for", idInput);

        inputElement.setAttribute("id", idInput);
        inputElement.setAttribute("aria-describedby", idDescriptor);

        buttonElement.setAttribute("id", idButton);
        descriptorElement.setAttribute("id", idDescriptor);
    }

    setLookupButtonVisiblity(isVisible: boolean) {
        const buttonElement = this.element.children[`${this.id}-button`];

        // Button does not yet exist in the visual tree.
        if (!buttonElement) {
            return;
        }

        buttonElement.setAttribute("aria-hidden", !isVisible);

        if (isVisible) {
            if (buttonElement.hasAttribute("hidden")) {
                buttonElement.removeAttribute("hidden");
            }
        }
        else {
            buttonElement.setAttribute("hidden", "hidden")
        }
    }
}