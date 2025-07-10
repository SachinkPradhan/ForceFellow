import { LightningElement } from 'lwc';

export default class ToDoApp extends LightningElement {

    taskName = "";
    taskDate = null;

    incompleteTask = [];
    completeTask = [];

    changeHandler(event){
        let{name, value} = event.target;
        //console.log('**Sachin todo',JSON.stringify(event.target));
        if (name === "taskName") {
            this.taskName = value;
            //console.log('**Sachin taskName : ',this.taskName);
        } else if (name === "taskDate") {
            this.taskDate = value;
            //console.log('**Sachin taskdate : ',this.taskDate);
        }
    }

    resetTaskHandler(){
        this.taskName = "";
        this.taskDate = null;
    }
    addTaskHandler(){
        if (!this.taskDate) {
            this.taskDate = new Date().toISOString().slice(0,10);
            //console.log('**Sachin taskdate slice : ',this.taskDate);
        }
        //console.log('**Sachin taskdate slice1 : ',this.taskDate);
        if (this.validateTask()) {
            this.incompleteTask = [
                ...this.incompleteTask,
                {
                    taskName : this.taskName,
                    taskDate : this.taskDate
                }
            ];
            console.log('before sorting incompleteTask : ',this.incompleteTask);
            this.resetTaskHandler();
            let sortedArray = this.sortTask(this.incompleteTask);
            this.incompleteTask = [...sortedArray];
            console.log(' incompleteTask after sorting : ',this.incompleteTask);
        }
        
    }

    validateTask(){
        let isValid = true;
        let element = this.template.querySelector('.taskName');
        //console.log('element : ',element);
        if (!this.taskName) {
            isValid = false;
            //console.log('isvalid is false');
        } else {
            let taskItem = this.incompleteTask.find(
                (currItem) =>
                    currItem.taskName === this.taskName &&
                    currItem.taskDate === this.taskDate
            );
            //console.log('taskItem : ',taskItem);
            if (taskItem) {
                isValid = false;
                element.setCustomValidity('This task is already available (Duplicate Found)');
            }
        }
        if (isValid) {
            //console.log('isvalid is true'); 
            element.setCustomValidity('');
        }
        element.reportValidity();
        return isValid;
    }
    sortTask(taskArray){
        console.log('sorted array is called');
        let sortedArr = taskArray.sort((a,b) => {
            const dateA = new Date(a.taskDate);
            const dateB = new Date(b.taskDate);
            return dateA - dateB;
        });
        console.log('sorted array is : ', sortedArr);
        return sortedArr;
    }
}