package yelp.model.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BusinessSearch {
    @JsonProperty
    protected String id;

    @JsonProperty
    protected String alias;

    @JsonProperty
    protected String name;

    @JsonProperty("image_url")
    private String image_url;

    @JsonProperty("is_closed")
    private Boolean is_closed;

    @JsonProperty
    private String url;

    @JsonProperty("review_count")
    private Integer review_count;

    @JsonProperty
    private List<Category> categories;

    @JsonProperty
    private Double rating;

    @JsonProperty
    protected Coordinates coordinates;

    @JsonProperty
    private List<Transactions> transactions;

    @JsonProperty
    private String price;

    @JsonProperty
    protected Location location;

    @JsonProperty
    protected String phone;

    @JsonProperty("display_phone")
    protected String display_phone;

    @JsonProperty
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double distance;

}
