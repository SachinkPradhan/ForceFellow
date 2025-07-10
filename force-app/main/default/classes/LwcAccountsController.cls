public with sharing class LwcAccountsController {
   @AuraEnabled(cacheable=true)
   public static List<Account> getAccounts(String searchText){
    try {
        
        if(String.IsEmpty(searchText)){
            return [SELECT Id,Name FROM  Account];
        }
        else {
            searchText='%'+searchText+'%';
            return [SELECT Id,Name FROM  Account WHERE Name LIKE :searchText];
        }
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled(cacheable=true)
   public static List<Account> showListOfAccounts(){
    try {
        return [SELECT Id,Name,Phone,Fax,Website FROM Account WHERE Fax != Null Limit 5];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled
   public static List<Contact> getAccountContacts(String accountId){
    try {
        return [SELECT Id,Name,Phone,Email FROM Contact WHERE accountId=:accountId];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled
   public static List<Account> getAccountRecs(){
    try {
        return [SELECT Id,Name,Phone,Type,Industry FROM Account Limit 10];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}