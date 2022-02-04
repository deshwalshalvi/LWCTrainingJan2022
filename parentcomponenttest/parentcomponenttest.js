import { api, LightningElement } from 'lwc';

export default class Parentcomponenttest extends LightningElement {


    @api isresetone;
    @api isresettwo;
    @api isresetthree;

    isSelectedone;
    isSelectedtwo;
    isSelectedthree;

    isreset;

    @api isvaluetogrand = 0;

    fetchValueone(event){
       if(event.detail === true){
        this.isSelectedone = 'Selected';
        this.isresetone = false;
        this.transfervaluetograndparent();
    }
    else if(event.detail === false){
        this.isSelectedone = 'Deselected';
        this.transferlessvaluetograndparent();
    }
    }

    fetchValuetwo(event){
        if(event.detail === true){
            this.isSelectedtwo = 'Selected';
            this.isresettwo = false;
            this.transfervaluetograndparent();
        }
        else if(event.detail === false){
            this.isSelectedtwo = 'Deselected';
            this.transferlessvaluetograndparent();
        }
        
     }

     fetchValuethree(event){
        if(event.detail === true){
            this.isSelectedthree = 'Selected';
            this.isresetthree = false;
            this.transfervaluetograndparent();
        }
        else if(event.detail === false){
            this.isSelectedthree = 'Deselected';
            this.transferlessvaluetograndparent();
        }
        
     }

     transfervaluetograndparent(){
         this.isvaluetogrand += 1;
         const selectedEvent = new CustomEvent( 'pass', {
            detail: this.isvaluetogrand
        } );
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);

     }

     transferlessvaluetograndparent(){
        this.isvaluetogrand -= 1;

        const selectedEvent = new CustomEvent( 'pass', {
            detail: this.isvaluetogrand
        } );
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    @api get isresetall() {
        return this.isreset;
    }
    set isresetall(value) {
        this.isreset = value;
        this.handleValueChange(value);
    }

    //a method called in setter
    handleValueChange(value) {
        if(this.isreset === true){
            this.isvaluetogrand = 0;
            if(this.isSelectedone === 'Selected'){
               this.isSelectedone = 'Deselected';
               this.isresetone = true;
            }
            if(this.isSelectedtwo === 'Selected'){
                this.isSelectedtwo = 'Deselected';
                this.isresettwo = true;
             }
             if(this.isSelectedthree === 'Selected'){
                this.isSelectedthree= 'Deselected';
                this.isresetthree = true;
             }
       }
    }
}