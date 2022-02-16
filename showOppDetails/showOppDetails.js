import { LightningElement, api, wire } from 'lwc';
import getOpportunityRecords from '@salesforce/apex/QuickCreate.getOpportunityRecords'; 


export default class ShowOppDetails extends LightningElement {

    @api recordId;
    searchKey = '';
    issearch = true;
    @api isreset;
    opprecords;
    @api oppId;
    isSelected;


    handleStringChange(event){
        console.log('event.target.value'+this.recordId);
        this.searchKey = event.target.value;
        console.log('this.searchKey '+this.searchKey );
        getOpportunityRecords({accId:this.recordId , fieldValue:this.searchKey}).then(result => {
            console.log('result'+result);
            this.opprecords = result;
       })
       .catch(error => {
         this.error = error.body.message;
       });
     }

     selectedOpportunity(event){
        this.oppId = event.currentTarget.dataset.id;
        this.isSelected = true;
        this.issearch = false;
        this.isreset = false;
        this.opprecords = '';
    
     }  
    
     handleSearchChange(){
        this.issearch = true;
        this.isreset = true;
        this.opprecords = '';
    }

}