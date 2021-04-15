package model;

import java.util.ArrayList;
import java.util.List;

public class RouteUser {

    private String username;
    private String password;


    /**
     * Construct a User with no information.
     */
    public RouteUser() {
        this.username = null;
        this.password = null;
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
     * @return the user name.
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
     * @return the password.
     */
    public String getPassword() { return this.password; }

   }