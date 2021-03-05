package yelp.model.parameters;

import yelp.exception.NullParameterException;

import lombok.Data;

import org.apache.commons.lang3.StringUtils;

@Data
public class BusinessSearchParameters {
    private String term;
    private String location;

    public String getParameters() throws NullParameterException {
        StringBuilder builder = new StringBuilder("?");

        if (!StringUtils.isBlank(term)) {
            builder.append("&term=").append(term);
        }

        if (StringUtils.isBlank(location)) {
            throw new NullParameterException("location cannot be null for /businesses/search endpoint.");
        } else {
            builder.append("&location=").append(location);
        }

        return builder.toString();
    }
}
