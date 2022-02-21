import { LightningElement, wire } from 'lwc';


import {
    subscribe,
    unsubscribe,
    MessageContext
  } from "lightning/messageService";
  import conCreated from "@salesforce/messageChannel/messageChanneldemo__c";

export default class Subscribecomponent extends LightningElement {

  @wire(MessageContext)
  messageContext;

  receivedMessage = [];
  subscription = null;

  handleSubscribe() {
    console.log("in handle subscribe");
    if (this.subscription) {
      return;
    }

    this.subscription = subscribe(
      this.messageContext,
      conCreated,
      (message) => {
        this.handleMessage(message);
      }
    );
  }

  handleMessage(message) {
      console.log('message'+message);
    this.receivedMessage = [...this.receivedMessage, message.contact];
  }

  handleUnsubscribe() {
    console.log("in handle unsubscribe");

    unsubscribe(this.subscription);
    this.subscription = null;
  }

  handleClear() {
    this.receivedMessage = null;
  }
}