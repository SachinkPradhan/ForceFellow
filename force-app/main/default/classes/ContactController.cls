public with sharing class ContactController {
    public ContactController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accId){
        try {
            return [
                SELECT AccountId, Id, FirstName, LastName, Title, Phone, Email
                FROM Contact
                WHERE AccountId = :accId
                WITH SECURITY_ENFORCED
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactBasedOnAccount(String accountId){
        try {

                return [
                    SELECT AccountId, Id, FirstName, LastName,
                    Title, Phone, Email,Account.Name, LeadSource,
                    Picture__c, Rank__c
                    FROM Contact
                    WHERE AccountId = :accountId
                    WITH USER_MODE
                    LIMIT 10
                ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactListForDataTable(){
        try {
            List<Contact> conList =[SELECT Id, Name, Title, Email, Phone, Picture__c,
             Rank__c, AccountId, Account.Name FROM Contact 
             where AccountId != null WITH USER_MODE Limit 10];

             return conList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        try {
            List<Contact> conList = [
                SELECT Id, Name, Title, Email, Phone, LastName, PhotoUrl 
                from Contact 
                where PhotoUrl != null 
                WITH USER_MODE 
                Limit 10
                ];

                return conList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}