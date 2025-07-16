import { LightningElement } from 'lwc';

export default class AccountSearch1 extends LightningElement {
    searchText = '';
    handleSearchAccountContact(event){
        
        this.searchText = event.detail;
        console.log('passed value to parent ' + this.searchText);
    }
}