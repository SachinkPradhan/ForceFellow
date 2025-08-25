public with sharing class LwcAccountsController1 {
    public LwcAccountsController1() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchText){
        try {
           if (String.isNotBlank(searchText)) {
                String key = '%'+ searchText + '%';
                return [SELECT Id, Name FROM Account WHERE Name LIKE :key LIMIT 20];
           } 
           // Return empty list if searchText is blank
           return new List<Account>();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getParentAccounts() {
        try {
            return [SELECT Id, Name, Industry FROM Account WHERE AnnualRevenue != null WITH USER_MODE];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}