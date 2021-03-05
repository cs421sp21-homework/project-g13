package yelp.model.request;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Category {
    @JsonProperty
    private String alias;

    @JsonProperty
    private String title;
}
