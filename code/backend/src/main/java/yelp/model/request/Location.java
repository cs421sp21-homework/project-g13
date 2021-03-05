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

    @JsonProperty
    private String country;

    @JsonProperty("zip_code")
    private String zipCode;

    @JsonProperty("display_address")
    private List<String> displayAddress;

    @JsonProperty("cross_streets")
    private String crossStreets;
}
