import { LightningElement } from 'lwc';

export default class Ifelseconditionalstatement extends LightningElement {

    //Permanent address

    addressline1value;
    addressline2value;
    landmarkvalue;
    zipcodevalue;

    // Current address

    ischecked;
    addressline1currentvalue;
    addressline2currentvalue;
    landmarkcurrentvalue;
    zipcodecurrentvalue;

    handlecheckbox(event){
        this.ischecked = event.target.checked;
        if(this.ischecked === true){
            this.addressline1currentvalue = this.addressline1value;
            this.addressline2currentvalue = this.addressline2value;
            this.landmarkcurrentvalue = this.landmarkvalue;
            this.zipcodecurrentvalue = this.zipcodevalue;
                }
     }

    handleAddressline1(event) {
        this.addressline1value = event.detail.value;
    }

    handleAddressline2(event) {
        this.addressline2value = event.detail.value;
    }

    handlelandmark(event) {
        this.landmarkvalue = event.detail.value;
    }

    handlezipcode(event) {
        this.zipcodevalue = event.detail.value;
    }

}