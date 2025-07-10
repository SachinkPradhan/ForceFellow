import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ParentDemo extends LightningElement {
    
    selectedContact;
    @wire(getContactList)
    contacts;

    selectionHandler(event){
        let selectedConId = event.detail;
        
        //console.log('Sachin selectedConId : ', JSON.stringify(selectedConId));
        this.selectedContact = this.contacts.data.find(
            (currItem)=> currItem.Id === selectedConId
        );
        //console.log('Sachin selectedContact : ', JSON.stringify(this.selectedContact));
    }











    /*
    contacts({data,error}){
        if (data) {
            console.log('sachin datas is: ', JSON.stringify(data));
        } else if (error){
            console.log('sachin errors is:',error);
        }
    }*/

    
    connectedCallback() {
        //console.log('contacts : ',this.contacts);
      }
}