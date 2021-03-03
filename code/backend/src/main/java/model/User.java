package model;

public class User {

    private String location;

    /**
     * Construct a User.
     */
    public User() {
        this.location = "Not set!";
    }

    /**
     * Set the user's location.
     *
     * @param location The user's location.
     */
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * Get user's location.
     *
     * @return the user's location.
     */
    public String getLocation() { return this.location; }

}