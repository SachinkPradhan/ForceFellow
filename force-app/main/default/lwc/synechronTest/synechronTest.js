import { LightningElement } from 'lwc';

export default class SynechronTest extends LightningElement {

    cardNumber = '';
    maskedCreditCard = '';
    
    changeHandler(event){
        this.cardNumber = event.target.value;
        console.log('Sachin card Number : ',this.cardNumber);
        this.maskedCreditCard = this.maskify(this.cardNumber);
        console.log('Sachin maskedCreditCard : ',this.maskedCreditCard);
    }
    maskify(cardNumber) {
        if (cardNumber.length <= 4) {
            return cardNumber;  // If the length is 4 or less, return the card number as is
        }

        // Mask all but the last four digits
        const masked = '#'.repeat(cardNumber.length - 4) + cardNumber.slice(-4);
        return masked;
    }
}