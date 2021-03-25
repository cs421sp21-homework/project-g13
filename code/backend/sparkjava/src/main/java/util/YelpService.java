package util;

import com.google.gson.Gson;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import model.yelp.Restaurant;
import model.yelp.RestaurantSearchResponse;
import model.yelp.ReviewSearchResponse;

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
                .queryString("term", "food")
                .asJson();
        Gson gson = new Gson();
        return  gson.fromJson(response.getBody().toString(),
                RestaurantSearchResponse.class);
    }

    /**
     * Get up to a specified number of restaurants by location in a certain radius.
     * @param location to get restaurants from
     * @param limit of the number of restaurants to get
     * @param radius meters around location to get restaurants from
     * @return RestaurantSearchResponse which contains the restaurants and the number of results
     */
    public static RestaurantSearchResponse getRestaurantsByLocation(String location, int limit, int radius) {
        HttpResponse<JsonNode> response = Unirest.get(BASE_ENDPOINT+"/search")
                .header(AUTHORIZATION, BEARER + " " + KEY)
                .queryString("location", location)
                .queryString("limit", limit)
                .queryString("radius", radius)
                .queryString("term", "food")
                .asJson();
        Gson gson = new Gson();
        return  gson.fromJson(response.getBody().toString(),
                RestaurantSearchResponse.class);
    }

    /**
     * Get up to a specified number of restaurants based on user's preferences
     * @param location to get restaurants from
     * @param limit of the number of restaurants to get
     * @param radius meters around location to get restaurants from
     * @param price usual money range of dishes as restaurant (EX: "1,2" would be $ or $$)
     * @param types the kind of restaurant it is (EX: "vegan, indpak" would be Vegan or Indian)
     * @return RestaurantSearchResponse which contains the restaurants and the number of results
     *
     * Example tested in Postman: https://api.yelp.com/v3/businesses/search?location=3400 N. Charles Street, Baltimore, MD, 21218&term=food&limit=10&radius=6000&price=1,2&categories=vegan
     *
     */
    public static RestaurantSearchResponse getRestaurantsWithUserInfo(String location, int limit, int radius, String price, String types) {
        HttpResponse<JsonNode> response = Unirest.get(BASE_ENDPOINT+"/search")
                .header(AUTHORIZATION, BEARER + " " + KEY)
                .queryString("location", location)
                .queryString("limit", limit)
                .queryString("radius", radius)
                .queryString("term", "food")
                .queryString("price", price)
                .queryString("categories", types)
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
     * Get reviews of a certain
     * @param id of the restaurant
     * @return ReviewSearchResponse contains the reviews
     */
    public static ReviewSearchResponse getRestaurantReviews(String id) {
        HttpResponse<JsonNode> response = Unirest.get(BASE_ENDPOINT+"/{id}/reviews")
                .header(AUTHORIZATION, BEARER + " " + KEY)
                .routeParam("id", id)
                .asJson();
        Gson gson = new Gson();
        return gson.fromJson(response.getBody().toString(), ReviewSearchResponse.class);
    }

    /**
     * Get restaurants with full details in/around a location
     * @param location to get restaurants from
     * @return List<Restaurant> the restaurants with their info
     */
    public static List<Restaurant> getRestaurantByLocationWithDetail(String location) {
        RestaurantSearchResponse response = getRestaurantsByLocation(location);
        return getRestaurantsWithDetail(response);
    }

    /**
     * Get upto a specified number of restaurants with full details in a specified radius of a location
     * @param location to get restaurants from
     * @param limit maximum number of restuarants to get
     * @param radius meters around location to get restaurants from
     * @return List<Restaurant> containing the restaurants
     */
    public static List<Restaurant> getRestaurantByLocationWithDetail(String location, int limit, int radius) {
        RestaurantSearchResponse response = getRestaurantsByLocation(location, limit, radius);
        return getRestaurantsWithDetail(response);
    }

    /**
     * Takes a RestaurantSearchResponse object and returns a list of those with
     * all their details (photos, reviews, etc.).
     * This is a helper method.
     * @param response object returned when searching for restaurants via other methods
     * @return List<Restaurant> containing the restaurants
     */
    private static List<Restaurant> getRestaurantsWithDetail(RestaurantSearchResponse response) {
        if (response == null || response.getBusinesses() == null) return null;
        List<Restaurant> restaurantsWithDetail = new ArrayList<>();
        for (Restaurant rest: response.getBusinesses()) {
            Restaurant restWithDetail = getRestaurantWithDetail(rest.getId());
            if (restWithDetail != null) {
                restWithDetail.setReviews(getRestaurantReviews(rest.getId()).getReviews());
                restaurantsWithDetail.add(restWithDetail);
            }
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
