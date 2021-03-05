package yelp.model.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class BusinessSearch extends BusinessInfo {
    @JsonProperty
    private Double rating;

    @JsonProperty
    private String price;

    @JsonProperty("is_closed")
    private Boolean isClosed;

    @JsonProperty("review_count")
    private Integer reviewCount;

    @JsonProperty
    private String url;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double distance;

}
