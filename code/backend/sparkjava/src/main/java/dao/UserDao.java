package dao;

import exceptions.DaoException;
import model.User;

import java.util.List;

/**
 * Data Access Object for model.Course.
 */
public interface UserDao {

    /**
     * Create a user without group number.
     * Group number defaults to 1 since user is assumed solo.
     *
     * @param uName The user's username.
     * @param pWord The user's password.
     * @param location The user's location.
     * @return The user object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User create(String uName, String pWord, String location) throws DaoException;

    /**
     * Create a user without group number or location.
     * Group number defaults to 1 since user is assumed solo.
     * Location defaults to NULL
     *
     * @param uName The user's username.
     * @param pWord The user's password.
     * @return The user object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User create(String uName, String pWord) throws DaoException;

    /**
     * Get a user provided their username.
     *
     * @param uName The user's username.
     * @return The user.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User read(String uName) throws DaoException;

    /**
     * Read all users from the database.
     *
     * @return List containing all users.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<User> readAll() throws DaoException;

    /**
     * Add to user's long-term preferences.
     *
     * @param user The user with the group name to be changed.
     * @param pref The preference to be added.
     * @return The user's updated preferences.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<String> addPreference(User user, String pref) throws DaoException;

    /**
     * Helper function for recreating "empty" array with "none" if all preferences
     * are removed via removePreference()
     *
     * @param userID User ID of user to have preferences modified
     * @param pref The preference to be added ("none" is this case).
     * @return The user's updated preferences.
     * @throws DaoException A generic exception for CRUD operations.
     */
    void addNonePreference(int userID, String pref) throws DaoException;

    /**
     * Remove a user's long-term preference.
     *
     * @param user The user with the group name to be changed.
     * @param pref The preference to be removed.
     * @return The user's updated preferences.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<String> removePreference(User user, String pref) throws DaoException;

    /**
     * Set user's location.
     *
     * @param uname The user's username.
     * @param location The user's new location.
     * @return The user's updated location.
     * @throws DaoException A generic exception for CRUD operations.
     */
    String setLocation(String uname, String location) throws DaoException;

    /**
     * Get user's location.
     *
     * @param uname The user's username.
     * @return The user's location.
     * @throws DaoException A generic exception for CRUD operations.
     */
    String getLocation(String uname) throws DaoException;

    /**
     * Delete user from database.
     *
     * @param uName The user's username.
     * @return The deleted user.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User delete(String uName) throws DaoException;

    /**
     * Record user's login.
     *
     * @param uName The username of user who logged in.
     * @return The user with updated 'isloggedin' column.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User login(String uName) throws DaoException;

    /**
     * Record user's logout.
     *
     * @param uName The username of user who logged out.
     * @return The user with updated 'isloggedin' column.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User logout(String uName) throws DaoException;

}
