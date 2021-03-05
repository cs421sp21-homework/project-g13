package yelp.model.parameters;

import yelp.exception.NullParameterException;

import lombok.Data;

import org.apache.commons.lang3.StringUtils;

@Data
public class BusinessSearchParameters {
    private String term;
    private String location;
    private Double latitude;
    private Double longitude;

    public String getParameters() throws NullParameterException {
        StringBuilder builder = new StringBuilder("?");

        if (!StringUtils.isBlank(term)) {
            builder.append("&term=").append(term);
        }

        if (StringUtils.isBlank(location) && latitude == null && longitude == null) {
            throw new NullParameterException("location/coordinates cannot both be null for /businesses/search endpoint.");
        }

        if (!StringUtils.isBlank(location)) {
            builder.append("&location=").append(location);
        } else {
            if (latitude == null) {
                throw new NullParameterException("latitude cannot be null for /businesses/search endpoint.");
            }
            if (longitude == null) {
                throw new NullParameterException("longitude cannot be null for /businesses/search endpoint.");
            }
            builder.append("&latitude=").append(latitude);
            builder.append("&longitude=").append(longitude);
        }

        return builder.toString();
    }
}
