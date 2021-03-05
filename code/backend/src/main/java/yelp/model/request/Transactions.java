package yelp.model.request;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Transactions {
    PICKUP("pickup"),
    DELIVERY("delivery");

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
