// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

/*
List<Contact> conList = [Select id,Rank__c,Picture__c,Title from Contact];
for(Contact con : conList){
    con.Picture__c='https://yt3.googleusercontent.com/k4qc9MqwK_3BHEXmpQXn0EsvUrGQlCdx0sgOgcC32CcMfHb9MraznmGnmQA4QmLH3xJCQZWp=s900-c-k-c0x00ffffff-no-rj';
    if(string.isBlank(con.Title)){
        con.Rank__c = 3;
    }else{
        con.Rank__c = 8;
    }
}

update conList;*/

