import { LightningElement } from 'lwc';

export default class AccountSearch1 extends LightningElement {
    searchText = '';
    
    handleSearchAccountContact(event){
        
        this.searchText = event.detail;
        console.log('passed value to parent ' + this.searchText);
    }
    /*connectedCallback() {
        if (this.searchText && this.searchText.trim() !== '') {
            console.log('Initial search text: ' + this.searchText);
            
        }
        else {
            console.log('No initial search text provided.');
        }
    }*/
}