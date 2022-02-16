import { LightningElement, api, wire } from 'lwc';
import getOpportunityRecord from '@salesforce/apex/QuickCreate.getOpportunityRecord';

export default class Opportunitydetail extends LightningElement {

    @api recordid;
    @api isreset;
    oppName;
    currentStage;

    steps = [
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Needs Analysis', value: 'Needs Analysis' },
        { label: 'Value Proposition', value: 'Value Proposition' },
        { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
        { label: 'Perception Analysis', value: 'Perception Analysis' },
        { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
        { label: 'Negotiation/Review', value: 'Negotiation/Review' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Closed Lost', value: 'Closed Lost' },
    ];


    _wiredMarketData;
    @wire(getOpportunityRecord,{oppId:'$recordid'})
    retrieveOpportunities(wireResult){
        console.log('isrest',this.isreset);
        const { data, error } = wireResult;
        this._wiredMarketData = wireResult;
        if(data){
            console.log("OppData", data);
            this.contact=data;
            for(let i=0; i< data.length; i++){
                this.currentStage = data[i].StageName;
                this.oppName = data[i].Name;
            }
        }
        if(error) {
            console.error(error)
        }
    }
}