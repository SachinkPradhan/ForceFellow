public class RentACarTestFactory {

    public static List<Car_Type__c> createCarTypes(List<String> names){
        List<Car_Type__c> carTypes = new List<Car_Type__c>();
        for(String carTypeName : names){
            carTypes.add(new Car_Type__c(Name=carTypeName));
        }
        insert carTypes;
        return carTypes;
    }
    
    public static List<Contact> createContacts(List<String> names){
        List<Contact> contacts = new List<Contact>();
        for(String contactName : names){
            contacts.add(new Contact(LastName=contactName));
        }
        insert contacts;
        return contacts;
    }
    
    public static List<Car__c> createCars(Integer count, Car_Type__c ct, Contact con){
        List<Car__c> cars = new List<Car__c>();
        for(Integer i=0; i<count; i++){
            cars.add(new Car__c(Contact__c=con.id, Car_Type__c=ct.id, 
                               Per_Day_Rent__c = 100+i,
                               Build_Year__c =2000+i,
                               Name='Car'+i));
        }
        insert cars;
        return cars;
    }
    

@IsTest
    public static void searchCarsTest(){
        Car_Type__c carType1 = new Car_Type__c(Name='Sedan');
        Car_Type__c carType2 = new Car_Type__c(Name='Convertible');
        insert carType1;
        insert carType2;

        Contact contact1 = new Contact(LastName='Contact1');
        Contact contact2 = new Contact(LastName='Contact2');
        insert contact1;
        insert contact2;

        Car__c car1 = new Car__c(Contact__c=contact1.id, Car_Type__c=carType1.id, Per_Day_Rent__c = 100, Build_Year__c =2000, Name='Car1');
        Car__c car2 = new Car__c(Contact__c=contact2.id, Car_Type__c=carType2.id, Per_Day_Rent__c = 200, Build_Year__c =2002, Name='Car2');
        insert car1;
        insert car2;

        CarSearchFormController carSearchFormController = new CarSearchFormController();
        List<Car__c> cars = null;
        cars = carSearchFormController.searchCars('Car1', '2000', carType1.Id, contact1.Id);
        System.assertEquals(1, cars.size());
    }


@IsTest
    public static void getCarTypesTest(){
        Car_Type__c carType1 = new Car_Type__c(Name='Sedan');
        Car_Type__c carType2 = new Car_Type__c(Name='Convertible');
        insert carType1;
        insert carType2;
        CarSearchFormController carSearchFormController = new CarSearchFormController();
        List<Car_Type__c> carTypes = null;
        carTypes = carSearchFormController.getCarTypes();
        System.assertEquals(2, carTypes.size());
    }

}