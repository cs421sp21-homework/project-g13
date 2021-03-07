package yelp.model.request;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Region {
    @JsonProperty
    private Center center;
}
