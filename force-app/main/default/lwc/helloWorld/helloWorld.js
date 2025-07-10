import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';

export default class HelloWorld extends LightningElement {
    /*sampleText = 'Sachin2'
    employee = {
        empName : 'Happy',
        empAge : 32,
        empCity : 'Angul',
        empSalary : 100
    }

    get getEmployeeCode(){
        const band = this.employee.empSalary < 30 ? 'B1': this.employee.empSalary < 70 ? 'B2': 'B3';
        return band;
    }*/

        /*
        textValue;
        clickedButton;

        handleInputChange(event){
            this.textValue = event.detail.value;
            console.log('*******textValue is :'+this.textValue);
        }

        handleClick(event){
            //this.clickedButton = event.target.label;
            //console.log('*******clickedButton is :'+this.clickedButton);
            if (this.textValue) {
                console.log('*******Inside If :');
                this.showToast('Success',this.textValue,'success');
            } else {
                console.log('*******Inside else :');
                this.showToast('ERROR',this.textValue+'please enter something','error');
            }
        }

        showToast(title, message, variant) {
            //console.log('In Showtoast');
            const event = new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
            });
            this.dispatchEvent(event);
        }

    */
        @track accountName;
        @track accountPhone;
        @track accountWebsite;
        @track AccountRevenue;
        //AnnualRevenue

        nameChangeHandler(event){
            this.accountName = event.target.value;
            
        }
        phoneChangeHandler(event){
            this.accountPhone = event.target.value;
            
        }
        websiteChangeHandler(event){
            this.accountWebsite = event.target.value;
            
        }
        revenueChangeHandler(event){
            this.AccountRevenue = event.target.value;
            
        }

        createAccount(){

            const fields = {'Name' : this.accountName, 'Phone' : this.accountPhone, 'AnnualRevenue' : this.AccountRevenue, 'Website' : this.accountWebsite};
            const recordInput = {apiName : 'Account', fields};

            createRecord(recordInput).then(response=> {

                console.log('Account response parse:', JSON.stringify(response));
                console.log('Account response :', response);
                console.log('Account has been created :', response.id);
                this.showToast('success','account created successfully','success');

                this.accountName = '';
                this.accountPhone = '';
                this.accountWebsite = '';
                this.AccountRevenue = '';

            }).catch(error=> {

                console.log('Error in creating Account :', error.body.message);
                this.showToast('Error','Error while creating account','error');
            })

        }

        showToast(title, message, variant) {

            const event = new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
            });
            this.dispatchEvent(event);
        }

    constructor(){
        super();
        //console.log('HW constructor');
    }
    
    connectedCallback(){
        let age = 33;
        let outPut = age < 18 ? "too young" : "old enough";
        //console.log('HW connectedCallback');
        //console.log('outPut is :', outPut);
        //console.log('type of outPut is :', typeof outPut);
    }
    renderedCallback(){
        //console.log('HW renderedCallback');
    }
    disconnectedCallback(){
        //console.log('HW disconnectedcallback');
    }
    errorCallback(){
        //console.log('HW errorCallBack');
    }
}