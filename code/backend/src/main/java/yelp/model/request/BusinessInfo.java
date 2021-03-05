package yelp.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class BusinessInfo extends BusinessNameID {

    @JsonProperty("display_phone")
    protected String displayPhone;

    @JsonProperty
    protected String alias;

    @JsonProperty
    protected Location location;

}
