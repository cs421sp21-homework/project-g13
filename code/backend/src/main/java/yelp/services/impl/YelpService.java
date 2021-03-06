package yelp.services.impl;

import org.springframework.http.*;
import yelp.model.parameters.BusinessSearchParameters;
import yelp.model.response.BusinessSearchResponse;
import yelp.services.YelpApi;

import lombok.Data;

import org.springframework.web.client.RestTemplate;

@Data
public class YelpService implements YelpApi {
    private String token;

    public YelpService(String token) {
        this.token = token;
    }

    RestTemplate restTemplate = new RestTemplate();

    @Override
    public BusinessSearchResponse searchBusiness(BusinessSearchParameters parameters) throws Exception {
        String uri = getBusinessesSearchEndpointUriWithParameters(parameters);
        BusinessSearchResponse result = restTemplate
                .exchange(uri, HttpMethod.GET, getHttpEntity(), BusinessSearchResponse.class)
                .getBody();
        return result;
    }

    private HttpEntity<String> getHttpEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.set(AUTHORIZATION, getBearerToken());
        return new HttpEntity<>(headers);
    }

    private String getBusinessesSearchEndpointUriWithParameters(BusinessSearchParameters parameters) throws Exception {
        return getBusinessesSearchEndpointUri() + parameters.getParameters();
    }

    private String getBusinessesSearchEndpointUri() {
        return getBaseUri() + BUSINESSES_SEARCH_ENDPOINT;
    }

    private String getBaseUri() {
        return API_HOST;
    }

    private String getBearerToken() {
        return BEARER + " " + token;
    }

}
