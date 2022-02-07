import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getFieldLabels from "@salesforce/apex/QuickCreate.getFieldLabels";

export default class QuickCreateContact extends LightningElement {

    @api isModalOpen;
    @track isHide;

    @track recFields = [];

    handleSuccess(event) {
         if(this.recordid !== null){
             this.dispatchEvent(new ShowToastEvent({
                     title: "SUCCESS!",
                     message: "New record has been created.",
                    variant: "success",
                 }),  
            );
            
            const lwcInputFields = this.template.querySelectorAll(
                'lightning-input-field'
            );
            if (lwcInputFields) {
                lwcInputFields.forEach(field => {
                    field.reset();
                });
            }
            
          }
     }

     closeModal() {
        this.isModalOpen = false;
         const selectedEvent = new CustomEvent( 'childpass', {
            detail: this.isModalOpen
        } );
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }


    loadAllFields(event) {
        this.isHide = true;
        getFieldLabels({'objectName':'Contact'}).then(result => {
            let response = JSON.parse(result);
            for (let key in response) {
                this.recFields.push({value:response[key], key:key});
             }
             console.log('this.recFields'+this.recFields);
          })
          .catch(error => {
            this.error = error.body.message;
          });
    }

    removeAllFields(){
        this.isHide = false;
    }


}