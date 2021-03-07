package yelp.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Coordinates {
    @JsonProperty
    private Double latitude;

    @JsonProperty
    private Double longitude;
}
