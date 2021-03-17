package model;

public class User {

    private String loc;
    private String userName;
    private String pword;
    private int user_ID;
    private int group_ID;

    /**
     * Construct a User.
     */
    public User() {
        this.loc = "Not set!";
    }

    /**
     * Construct a User.
     */
    public User(String uName, String pWord, String location, int gid) {
        this.userName = uName;
        this.pword = pWord;
        this.loc = location;
        //this.userID = uid;
        this.group_ID = gid;
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

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof User)) {
            return false;
        }
        User otherUser = (User) other;
        return this.getUser_ID() == otherUser.getUser_ID();
    }

}