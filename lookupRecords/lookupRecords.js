import { LightningElement, wire ,track} from 'lwc';
import getAccountRecords from '@salesforce/apex/lookupRecords.getAccountRecords';
import returnAccountRecords from '@salesforce/apex/lookupRecords.returnAccountRecords';

const columns = [
    { label: 'Name', fieldName: 'Name' }
];

export default class LookupRecords extends LightningElement {

    columns = columns;

    accRecord = true;
    conRecord;
    searchKey = '';
    accountId = '';
    accountName;
    @track accountRecords;
    @track contactRecords;

    handleStringChange(event){
       this.accRecord = true;
       this.conRecord = false;
       console.log('event.target.value'+event.target.value);
       this.searchKey = event.target.value;
       getAccountRecords({'fieldValue':this.searchKey}).then(result => {
           console.log('result'+result);
           this.accountRecords = result;
      })
      .catch(error => {
        this.error = error.body.message;
      });
    }

    selectedAccount(event){
        this.accRecord = false;
        this.conRecord = true;
        this.accountId = event.currentTarget.dataset.id;
        this.accountName = event.target.outerText;
        console.log('account name'+this.accountName);
        returnAccountRecords({'accId':this.accountId}).then(result => {
            console.log('result'+result);
            this.conRecord = true;
            this.contactRecords = result;
         })
       .catch(error => {
         this.error = error.body.message;
       });
    }   

    handleSearchChange(){
        this.accRecord = true;
        this.conRecord = false; 
        this.accountRecords = '';
        this.contactRecords = '';
    }
  
}
