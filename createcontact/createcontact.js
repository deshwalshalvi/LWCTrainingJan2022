import { LightningElement,track,api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContactRecord from '@salesforce/apex/QuickCreate.getContactRecord';

import { publish, MessageContext } from "lightning/messageService";
import conCreated from "@salesforce/messageChannel/messageChanneldemo__c";


export default class Createcontact extends LightningElement {
    
    recordId;
    contactname;
    
    @wire(MessageContext)
    messageContext;
    

    handleSuccess(event) {
        this.recordId = event.detail.id;
        //let contact = getContactRecord({conId:this.recordId});
        getContactRecord({conId:this.recordId}).then(result => {
            console.log('result'+result);
            for(let i=0; i<result.length;i++){
               console.log('hi'+result[i].Name);
               this.contactname = result[i].Name;
             }
            const payload = { contact: this.contactname};
           publish(this.messageContext, conCreated, payload);
       })
       .catch(error => {
         console.log('error.body.message',error.body.message);
       });
        
        
        if(this.recordid !== null){
            this.dispatchEvent(new ShowToastEvent({
                    title: "SUCCESS!",
                    message: "New record has been created.",
                   variant: "success",
                }),  
           );
           
         }
    }

    refreshcontact(){
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