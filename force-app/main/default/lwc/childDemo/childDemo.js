import { api, LightningElement } from 'lwc';

export default class ChildDemo extends LightningElement {
    @api contact;

    clickHandler(event){
        event.preventDefault();
        const conSelection = new CustomEvent('selection',{
            detail: this.contact.Id
        });
        this.dispatchEvent(conSelection);
    }
}