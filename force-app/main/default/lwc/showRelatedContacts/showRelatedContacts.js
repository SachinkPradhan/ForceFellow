import { api, LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'FirstName' },
    { label: 'Email', fieldName: 'Email' },
];

export default class ShowRelatedContacts extends LightningElement {

    columns = columns;
    @api accountId;

    @wire(getContacts,{accId: '$accountId'})
    contacts;

    
}