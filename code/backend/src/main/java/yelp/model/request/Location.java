package yelp.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Location {
    @JsonProperty
    private String address1;

    @JsonProperty
    private String address2;

    @JsonProperty
    private String address3;

    @JsonProperty
    private String city;

    @JsonProperty("zip_code")
    private String zip_code;

    @JsonProperty
    private String country;

    @JsonProperty
    private String state;

    @JsonProperty("display_address")
    private List<String> display_address;

}
