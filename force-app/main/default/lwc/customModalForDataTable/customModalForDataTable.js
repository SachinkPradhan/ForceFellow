import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomModalForDataTable extends LightningElement {

    @api isDisplayMode = false;
    @api isEditMode = false;
    @api recordInputId;

    get header(){
        console.log('header called');
        if (this.isDisplayMode) {
            console.log('header isDisplayMode called');
             return "Display Contact Details";
        } else if(this.isEditMode){
            console.log('header isEditMode called');
             return "Edit Contact Details"
        } else return "";
    }
    closeModalHandler(){
        console.log('header closeModalHandler called');
        let myCustomEvent = new CustomEvent("closemodal");
        this.dispatchEvent(myCustomEvent);
    }
    successHandler(){
        console.log('header successHandler called');
        this.showToast();
        this.closeModalHandler();
    }

    showToast() {
        console.log('header showToast called');
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Record saved successfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
    }
}