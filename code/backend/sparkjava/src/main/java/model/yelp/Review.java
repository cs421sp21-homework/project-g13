package model.yelp;

public class Review {
    private String text;

    private Integer rating;

    private String url;

    public Review(String text, int rating, String url) {
        this.text = text;
        this.rating = rating;
        this.url = url;

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

    public String getRatingUrl() { return url;}

    public void setRatingUrl(String url) { this.url = url; }
}
