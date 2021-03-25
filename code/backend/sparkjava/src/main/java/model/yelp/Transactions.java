package model.yelp;

public enum Transactions {

    pickup("pickup"),

    delivery("delivery"),

    restaurant_reservation("restaurant_reservation");


    private String value;

    Transactions(String value) {
        this.value = value;
    }


    public static Transactions transactions(String value) {
        if (value == null) {
            throw new IllegalArgumentException();
        }
        for (Transactions transaction: values()) {
            if (value.equals(transaction.getValue())) {
                return transaction;
            }
        }
        throw new IllegalArgumentException();
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
