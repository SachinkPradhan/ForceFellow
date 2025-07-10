import { LightningElement } from 'lwc';
import postOnLinkedin from '@salesforce/apex/LinkedinIntegration.postOnLinkedin';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LinkedinIntegration extends LightningElement {
    inputValue = '';
    error;
    successMessage;
    handleChange(event) {  
        let{name, value} = event.target;
        
        if (name === 'input-one') {
            this.inputValue = value;
            
        }
    }
    async handleClick(){
        try {
            this.successMessage = await postOnLinkedin({Message: this.inputValue});
            this.error = undefined;
            this.inputValue = '';
            this.showToast('Success', this.successMessage, 'success');
            console.log('try message: ****',this.successMessage);
        } catch (error) {
            this.error = error;
            console.log('catch message: ****',this.error);
            this.successMessage = undefined;
            this.showToast('Apex Error', 'failed to post on Linkedin', 'error', 'sticky');
        }
    }

    showToast(title, message, variant, mode = 'dismissible') {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant, // Controls the icon and color
            mode: mode        // Controls how the toast behaves
        });
        this.dispatchEvent(event);
    }

}