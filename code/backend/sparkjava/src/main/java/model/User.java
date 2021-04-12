package model;

import java.util.ArrayList;
import java.util.List;

public class User {

    private String loc;
    private String userName;
    private String pword;
    private int user_ID;
    private int group_ID;
    private List<String> preferencesList;
    private String preferences;

    /**
     * Construct a User with no information.
     */
    public User() {
        this.userName = null;
        this.pword = null;
        this.loc = null;
        this.preferences = " ";
        this.preferencesList = new ArrayList<>();
        this.group_ID = 1;
    }

    /**
     * Construct a User with regular information (no preferences).
     */
    public User(String uName, String pWord, String location, int gid) {
        this.userName = uName;
        this.pword = pWord;
        this.loc = location;
        this.group_ID = gid;
        this.preferences = " ";
        this.preferencesList = new ArrayList<>();

    }

    /**
     * Set the user's location.
     *
     * @param location The user's location.
     */
    public void setLoc(String location) {
        this.loc = location;
    }

    /**
     * Get user's location.
     *
     * @return the user's location.
     */
    public String getLoc() { return this.loc; }

    /**
     * Set the user's user name.
     *
     * @param username The user's user name.
     */
    public void setUserName(String username) {
        this.userName = username;
    }

    /**
     * Get user's user name.
     *
     * @return the user's user name.
     */
    public String getUserName() { return this.userName; }

    /**
     * Set the user's password.
     *
     * @param pword The user's password.
     */
    public void setPword(String pword) {
        this.pword = pword;
    }

    /**
     * Get user's password.
     *
     * @return the user's password.
     */
    public String getPword() { return this.pword; }

    /**
     * Set the user's id.
     *
     * @param uid The user's id.
     */
    public void setUser_ID(int uid) {
        this.user_ID = uid;
    }

    /**
     * Get user's id.
     *
     * @return the user's id.
     */
    public int getUser_ID() { return this.user_ID; }

    /**
     * Set the user's group id.
     *
     * @param gid The user's group id.
     */
    public void setGroup_ID(int gid) {
        this.group_ID = gid;
    }

    /**
     * Get user's group id.
     *
     * @return the user's group id.
     */
    public int getGroup_ID() { return this.group_ID; }

    /**
     * Set the user's long-term preferences AS A STRING.
     *
     * @param prefsList The user's preferences.
     */
    public void setPreferencesList(List<String> prefsList) {
        this.preferencesList = prefsList;
    }

    /**
     * Get user's long-term preferences AS A STRING.
     *
     * @return the user's preferences.
     */
    public List<String> getPreferencesList() { return this.preferencesList; }

    /**
     * Set the user's long-term preferences AS A LIST OF STRINGS.
     *
     * @param prefs The user's preferences.
     */
    public void setPreferences(String prefs) {
        this.preferences = prefs;
    }

    /**
     * Get user's long-term preferences AS A LIST OF STRINGS.
     *
     * @return the user's preferences.
     */
    public String getPreferences() { return this.preferences; }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof User)) {
            return false;
        }
        User otherUser = (User) other;
        return this.getUser_ID() == otherUser.getUser_ID();
    }

}