package yelp.model.response;

import java.util.List;

import yelp.model.request.BusinessSearch;
import yelp.model.request.Region;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BusinessSearchResponse {
    @JsonProperty
    private Integer total;

    @JsonProperty("businesses")
    private List<BusinessSearch> businesses;

    @JsonProperty
    private Region region;
}
