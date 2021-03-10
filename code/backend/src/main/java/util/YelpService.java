package util;

import com.google.gson.Gson;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import model.yelp.Restaurant;
import model.yelp.RestaurantSearchResponse;

import java.util.ArrayList;
import java.util.List;

public class YelpService {

    private static String KEY;

    private static final String BASE_ENDPOINT = "https://api.yelp.com/v3/businesses";

    private static String AUTHORIZATION = "Authorization";
    private static String BEARER = "Bearer";


    /**
     * Get restaurants by location
     * @param location to get restaurants from
     * @return RestaurantSearchResponse which contains the restaurants and the numbeer of results
     */
    public static RestaurantSearchResponse getRestaurantsByLocation(String location) {
        HttpResponse<JsonNode> response = Unirest.get(BASE_ENDPOINT+"/search")
                .header(AUTHORIZATION, BEARER + " " + KEY)
                .queryString("location", location)
                .asJson();
        Gson gson = new Gson();
        return  gson.fromJson(response.getBody().toString(),
                RestaurantSearchResponse.class);
    }

    /**
     * Get upto a specified number of restaurants by location in a certain radius.
     * @param location to get restaurants from
     * @param limit of the number of restaurants to get
     * @param radius meters around location to get restaurants from
     * @return RestaurantSearchResponse which contains the restaurants and the numbeer of results
     */
    public static RestaurantSearchResponse getRestaurantsByLocation(String location, int limit, int radius) {
        HttpResponse<JsonNode> response = Unirest.get(BASE_ENDPOINT+"/search")
                .header(AUTHORIZATION, BEARER + " " + KEY)
                .queryString("location", location)
                .queryString("limit", limit)
                .queryString("radius", radius)
                .asJson();
        Gson gson = new Gson();
        return  gson.fromJson(response.getBody().toString(),
                RestaurantSearchResponse.class);
    }

    /**
     * Get a restaurant with full details
     * @param id of the restuarant
     * @return Restaurant the restaurant info
     */
    public static Restaurant getRestaurantWithDetail(String id) {
        HttpResponse<JsonNode> response = Unirest.get(BASE_ENDPOINT+"/{id}")
                .header(AUTHORIZATION, BEARER + " " + KEY)
                .routeParam("id", id)
                .asJson();
        Gson gson = new Gson();
        return  gson.fromJson(response.getBody().toString(),
                Restaurant.class);
    }

    /**
     * Get restaurants with full details in/around a location
     * @param location to get restaurants from
     * @return List<Restaurant> the restaurants with their info
     */
    public static List<Restaurant> getRestaurantByLocationWithDetail(String location) {
        RestaurantSearchResponse response = getRestaurantsByLocation(location);
        if (response == null) return null;
        List<Restaurant> restaurantsWithDetail = new ArrayList<>();
        for (Restaurant rest: response.getBusinesses()) {
            restaurantsWithDetail.add(getRestaurantWithDetail(rest.getId()));
        }
        return restaurantsWithDetail;
    }

    /**
     * Get upto a specified number of restaurants with full details in a specified radius of a location
     * @param location to get restaurants from
     * @param limit maximum number of restuarants to get
     * @param radius meters around location to get restaurants from
     * @return
     */
    public static List<Restaurant> getRestaurantByLocationWithDetail(String location, int limit, int radius) {
        RestaurantSearchResponse response = getRestaurantsByLocation(location, limit, radius);
        if (response == null) return null;
        List<Restaurant> restaurantsWithDetail = new ArrayList<>();
        for (Restaurant rest: response.getBusinesses()) {
            restaurantsWithDetail.add(getRestaurantWithDetail(rest.getId()));
        }
        return restaurantsWithDetail;
    }


    /**
     * Set the Yelp API key
     * @param key Yelp API key
     */
    public static void setKey(String key) {
        KEY = key;
    }


}
