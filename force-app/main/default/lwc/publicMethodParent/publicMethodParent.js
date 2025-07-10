import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PublicMethodParent extends LightningElement {
    @track value;
    @track returnMsg;
    @track variant;
    checkboxSelectHandler(){
        const childComponent = this.template.querySelector('c-public-method-child');
        this.returnMsg = childComponent.selectCheckbox(this.value);

        if (this.returnMsg == 'Successfully checked') {
            this.variant = 'Success';
        }else{
            this.variant = 'Error';
        }
            const evt = new ShowToastEvent({
              title: 'Check Box',
              message: this.returnMsg,
              variant: this.variant,
              mode : 'sticky',
            });
            this.dispatchEvent(evt);
        
    }

    onInputChangeHandler(event){
        this.value = event.target.value;
    }
}