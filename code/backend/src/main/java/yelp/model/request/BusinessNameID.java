package yelp.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BusinessNameID {
    @JsonProperty
    protected String id;

    @JsonProperty
    protected String name;
}
