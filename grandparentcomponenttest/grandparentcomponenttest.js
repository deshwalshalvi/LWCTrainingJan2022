import { LightningElement,api,track } from 'lwc';

export default class Grandparentcomponenttest extends LightningElement {

    @track selecteditem = 0;

    @api reset;
    fetchValuefromparent( event ) {
        this.selecteditem = event.detail;
        if(this.reset === true){
            this.reset = false;
        }
}

    deselectedItem(){
        if(this.selecteditem > 0){
            this.selecteditem = 0;
        this.reset = true;
        }
    }
}