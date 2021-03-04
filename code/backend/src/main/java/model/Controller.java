package model;

import java.util.ArrayList;

import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;

public class Controller {

    private User user;
    private ArrayList<Restaurant> restaurants;
    private int position;

    /**
     * Construct a Controller.
     *
     * @param user The user associated with this controller.
     */
    public Controller(User user) {
        this.user = user;
        this.restaurants = new ArrayList<Restaurant>();
        this.position = 0;
    }

    /**
     * Set the location of the controller's user.
     *
     * @param location the user's location.
     */
    public void setUserLocation(String location) {
        this.user.setLocation(location);
    }

    /**
     * Loads restaurants from Yelp API and the user's location into restaurants.
     */
    public void loadRestaurants() {
        //To implement in this iteration!
        //Loads restaurants from Yelp API and the user's location
        //into the restaurants arraylist.
        JSONObject response = Unirest.get(query).asJson().getBody();
        JSONArray businesses = response.getJSONArray("businesses");
        for (int i = 0; i < businesses.length(); i++) {
            JSONObject restaurant = businesses.getJSONObject(i);
            String name = restaurant.getString("name");
            String location = restaurant.getString("location"); // one line address or fancy display address
            String priceRange = restaurant.getString("price"); // "$", change to int?
            JSONArray categories = restaurant.getJSONArray("categories"); // need to further parse
            int rating = restaurant.getInt("rating"); // add as a pair of rating,number of rating?
            String image = restaurant.getString("image_url");
        }

    }

    /**
     * Handles the user swiping left.
     */
    public void dislikeRestaurant() {
        this.position++;
        //this will do more in future iterations
    }

    /**.
     * Handles the user swiping right.
     */
    public void likeRestaurant() {
        //To implement in this iteration!
        //Render "Match found" page
    }

    /**
     * Get the next restaurant the user will see in the swiping event.
     *
     * @return The next restaurant.
     */
    public Restaurant getCurrentRestaurant() {
        return this.restaurants.get(this.position);
    }

}