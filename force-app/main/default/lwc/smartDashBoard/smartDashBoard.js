import { LightningElement, track } from 'lwc';
import getEscalationCases from '@salesforce/apex/SmartEscalationController.getEscalationCases';
import { NavigationMixin } from 'lightning/navigation';

export default class SmartDashBoard extends NavigationMixin(LightningElement){
    @track cases;
    connectedCallback() {
        this.fetchCases();
    }
    handleRefresh() {
        this.fetchCases();
    }
    fetchCases() {
        getEscalationCases()
            .then(result => {
                this.cases = result;
            })
            .catch(error => {
                console.error('Error fetching cases:', error);
            });
    }
    handleNavigate(event) {
        event.preventDefault();
        const caseId = event.currentTarget.dataset.id;
        if (caseId) {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: caseId,
                    objectApiName: 'Case',
                    actionName: 'view'
                }
            });
        }
    }
    
}