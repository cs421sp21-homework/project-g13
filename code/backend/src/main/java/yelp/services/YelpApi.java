package yelp.services;

import yelp.model.parameters.BusinessSearchParameters;
import yelp.model.response.BusinessSearchResponse;

public interface YelpApi {
    String API_HOST = "https://api.yelp.com";
    String BUSINESSES_SEARCH_ENDPOINT = "/v3/businesses/search";

    String AUTHORIZATION = "Authorization";
    String BEARER = "Bearer";

    BusinessSearchResponse searchBusiness(BusinessSearchParameters parameters) throws Exception;
}