package dao;

import exceptions.DaoException;
import model.User;

import java.util.List;

/**
 * Data Access Object for model.Course.
 */
public interface UserDao {

    /**
     * Create a user with predetermined username, password, location, and group ID.
     *
     * @param uName The user's username.
     * @param pWord The user's password.
     * @param gid The group containing the user (1 for no group)
     * @param location The user's location.
     * @return The user object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User create(String uName, String pWord, String location, int gid) throws DaoException;

    /**
     * Create a user without group number.
     * Group number defaults to 1 since user is assumed solo.
     *
     *  @param uName The user's username.
     * @param pWord The user's password.
     * @param location The user's location.
     * @return The user object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User create(String uName, String pWord, String location) throws DaoException;

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
     * MIGHT NOT GET USED
     * Get all users in some group.
     * Can get all solos by looking for group id of 1.
     *
     * @param gid The group's id to look for its members.
     * @return List containing all group members
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<User> readAllInGroup(int gid) throws DaoException;

    /**
     * Update user's group ID.
     *
     * @param user The user with the group name to be changed.
     * @param gid The id of the group for update.
     * @return The user with new group ID.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User updateGroupID(User user, int gid) throws DaoException;

    /**
     * Delete user from database.
     *
     * @param uName The user's username.
     * @return The deleted user.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User delete(String uName) throws DaoException;
}