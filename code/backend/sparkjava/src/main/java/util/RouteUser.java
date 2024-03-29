package util;

import java.util.ArrayList;
import java.util.List;

public class RouteUser {

    private String username;
    private String password;
    private List<String> preferencesList;
    private String location;


    /**
     * Construct a User with no information.
     */
    public RouteUser() {
        this.username = null;
        this.password = null;
        this.preferencesList = null;
        this.location = null;
    }

    /**
     * Set the user name.
     *
     * @param username The user name.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Get user name.
     *
     * @return The user name.
     */
    public String getUsername() { return this.username; }

    /**
     * Set the password.
     *
     * @param pword The password.
     */
    public void setPassword(String pword) {
        this.password = pword;
    }

    /**
     * Get password.
     *
     * @return The password.
     */
    public String getPassword() { return this.password; }

    /**
     * Set the preferences.
     *
     * @param prefs The preferences.
     */
    public void setPreferencesList(List<String> prefs) {
        this.preferencesList = prefs;
    }

    /**
     * Get preferences.
     *
     * @return The preferences.
     */
    public List<String> getPreferencesList() {
        return this.preferencesList;
    }

    /**
     * Set the user location.
     *
     * @param location The user location.
     */
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * Get the user location.
     *
     * @return The user location.
     */
    public String getLocation() {
        return this.location;
    }

   }