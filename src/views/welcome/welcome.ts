import {bindable} from "aurelia-framework";

export class Welcome {
    @bindable workOrderValue;
    @bindable assetValue;

    constructor() {
        this.workOrderValue = "R00100";
        this.assetValue = "A11";
    }
}