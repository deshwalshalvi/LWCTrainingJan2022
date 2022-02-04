import { api, LightningElement } from 'lwc';

export default class Childcomponenttwotest extends LightningElement {

    @api strInput;

    isselected = true;
    isdeselected;

    @api isresetall;

    selectedItem(){
        this.strInput = true;
        this.isselected = false;
        this.isdeselected = true;
        const selectedEvent = new CustomEvent( 'childpass', {
            detail: this.strInput
        } );
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    deselectedItem(){
        this.strInput = false;
        this.isselected = true;
        this.isdeselected = false;
        const selectedEvent = new CustomEvent( 'childpass', {
            detail: this.strInput
        } );
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    resetItem(){
        this.isresetall = false;
        this.isselected = true;
        this.selectedItem();
    }
}