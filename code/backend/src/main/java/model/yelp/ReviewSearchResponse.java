package model.yelp;

import java.util.List;

public class ReviewSearchResponse {
    private int total;

    private List<Review> reviews;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
