import {bindable} from "aurelia-framework";

export class Welcome {
    @bindable workOrderValue;
    @bindable assetValue;

    @bindable workOrderError;

    constructor() {
        this.workOrderValue = "R00100";
        this.assetValue = "A11";
    }

    hasErrorClickHandler() {
        if (!this.workOrderError) {
            this.workOrderError = "something went wrong";
        }
        else {
            this.workOrderError = null;
        }
    }
}