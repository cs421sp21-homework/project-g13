package yelp.model.request;
import com.fasterxml.jackson.annotation.JsonCreator;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Transactions {

    pickup("pickup"),

    delivery("delivery"),

    restaurant_reservation("restaurant_reservation");

    @Getter
    private String value;

    @JsonCreator
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

}
