package yelp.services.impl;

import yelp.model.parameters.BusinessSearchParameters;
import yelp.model.response.BusinessSearchResponse;
import yelp.services.YelpApi;

import lombok.Data;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;


@Data
public class YelpService implements YelpApi {
    private String token;

    public YelpService(String token) {
        this.token = token;
    }

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public BusinessSearchResponse searchBusiness(BusinessSearchParameters parameters) throws Exception {
        String uri = getBusinessesSearchEndpointUriWithParameters(parameters);
        ResponseEntity<BusinessSearchResponse> response = restTemplate.exchange(uri, HttpMethod.GET, getHttpEntity(),
                BusinessSearchResponse.class);
        return response.getBody();
    }

    private HttpEntity<String> getHttpEntity() {
        HttpHeaders headers = new HttpHeaders();
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
