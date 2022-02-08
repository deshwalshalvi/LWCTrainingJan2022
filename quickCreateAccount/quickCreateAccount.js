import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getFieldLabels from "@salesforce/apex/QuickCreate.getFieldLabels";

export default class QuickCreateAccount extends LightningElement {

    @track isModalOpen = true;
    @track isHide;

    @api columns;
    @track recFields = [];

    @track arrayfield = [];

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
                console.log('lwcInputFields'+lwcInputFields);
                lwcInputFields.forEach(field => {
                    field.reset();
                });
            }
          }
     }

     fetchValue(event){
        this.isModalOpen = event.detail;
     }

     closeModal() {
        this.isModalOpen = false;
    }


    loadAllFields(event) {
        this.isHide = true;

        let fields = this.template.querySelectorAll('lightning-input-field');
        for(var i=0;i < fields.length;i++){
            this.arrayfield.push(fields[i].fieldName);
        }
        getFieldLabels({'objectName':'Account'}).then(result => {
            let response = JSON.parse(result);
            
            
            for (let key in response) {
                if(this.arrayfield.includes(key))
                {
                    console.log('It is available');
                }
                else{
                    this.recFields.push({value:response[key], key:key});
                }
             }
          })
          .catch(error => {
            this.error = error.body.message;
          });
    }

    removeAllFields(){
        this.isHide = false;
    }



}