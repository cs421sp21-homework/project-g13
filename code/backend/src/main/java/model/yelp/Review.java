package model.yelp;

public class Review {
    private String text;

    private Integer rating;

    public Review(String text, int rating) {
        this.text = text;
        this.rating = rating;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
