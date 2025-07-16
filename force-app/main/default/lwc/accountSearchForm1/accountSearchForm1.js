import { LightningElement } from 'lwc';

export default class AccountSearchForm1 extends LightningElement {
    searchText = '';
    accountNameChangeHandler(event){
        this.searchText = event.target.value;
    }
    handleClick(){
        //console.log('Search for ' + this.searchText);
    }   
}