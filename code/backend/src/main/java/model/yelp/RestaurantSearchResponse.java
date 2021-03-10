package model.yelp;

import java.util.List;

import model.yelp.Restaurant;

public class RestaurantSearchResponse {

    private Integer total;

    private List<Restaurant> businesses;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public List<Restaurant> getBusinesses() {
        return businesses;
    }

    public void setBusinesses(List<Restaurant> businesses) {
        this.businesses = businesses;
    }
}
