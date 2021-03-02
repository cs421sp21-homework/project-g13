package model;

public class Restaurant {

    private String name;
    private String location;
    private String priceRange;
    private String cuisine;
    private String operatingHours;


    /**
     * Construct a Restaurant.
     *
     * @param name The restaurant's name.
     * @param location The restaurant's location.
     * @param priceRange The restaurant's price range.
     * @param cuisine The type of food the restaurant serves.
     * @param operatingHours Times when the restaurant is open.
     */
    public Restaurant(String name, String location, String priceRange,
                      String cuisine, String operatingHours) {
        this.name = name;
        this.location = location;
        this.priceRange = priceRange;
        this.cuisine = cuisine;
        this.operatingHours = operatingHours;
    }


    /**
     * Get restaurant's location.
     *
     * @return the restaurant's location.
     */
    public String getName() { return this.name; }

    /**
     * Get restaurant's location.
     *
     * @return the restaurant's location.
     */
    public String getLocation() { return this.location; }

    /**
     * Get restaurant's price range.
     *
     * @return the restaurant's price range.
     */
    public String getPriceRange() { return this.priceRange; }

    /**
     * Get the restaurant's operating hours.
     *
     * @return the restaurant's operating hours.
     */
    public String getOperatingHours() { return this.operatingHours; }


    /**
     * Check if the restaurant will be open at a certain date/time.
     *
     * @param dateAndTime A date/time to check.
     * @return true if it will be open, false if it will be closed.
     */
    public boolean isOpenAt(String dateAndTime) {
        //to implement in a future iteration!
        return true;
    }

    /**
     * Check if the restaurant meets pre-determined constraints.
     *
     * @param locationConstraint A constraint for the restaurant's location.
     * @param priceConstraint A constraint for the restaurant's price range.
     * @param cuisineConstraint A constraint for the type of food the restaurant serves.
     * @return true if it meets all set constraints, false if it does not meet at least one.
     */
    public boolean meetsConstraints(String locationConstraint, String priceConstraint,
                                    String cuisineConstraint) {
        //to implement in a future iteration!
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Restaurant other = (Restaurant) o;
        return this.name.equals(other.name) && this.location.equals(other.location);
    }

}