import {bindable, customElement, useShadowDOM, inject} from 'aurelia-framework';
import {PragmaInputBase} from './pragma-input-base';

@customElement('pragma-input')
@useShadowDOM()
@inject(Element)
export class PragmaInput extends PragmaInputBase {
    @bindable value;
    @bindable label;
    @bindable descriptor;
    @bindable id;
    @bindable lookupId;

    constructor(element) {
        super(element);
    }

    attached() {
        this.updateChildrenId();
        this.setLookupButtonVisiblity(this.lookupId && this.lookupId.length > 0);
    }

    lookupIdChanged() {
        this.setLookupButtonVisiblity(this.lookupId && this.lookupId.length > 0);
    }
}
