package yelp.model.response;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import yelp.model.request.BusinessSearch;
import lombok.Data;

@Data
public class BusinessSearchResponse {
    @JsonProperty
    private Integer total;

    @JsonProperty("businesses")
    private List<BusinessSearch> businesses;
}
