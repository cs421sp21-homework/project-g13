package dao;

import exceptions.DaoException;
import model.User;

import java.util.List;

/**
 * Data Access Object for model.Course.
 */
public interface UserDao {

    /**
     * Create a user with predetermined group number.
     *
     * @param offeringName The course alphanumeric code.
     * @param title The course Title.
     * @return The course object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User create(String uName, String pWord, String location, int gid) throws DaoException;

    /**
     * Create a user without group number.
     *
     * @param offeringName The course alphanumeric code.
     * @param title The course Title.
     * @return The course object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User create(String uName, String pWord, String location) throws DaoException;

    /**
     * Read a course provided its offeringName.
     *
     * @param offeringName The course alphanumeric code.
     * @return The course object read from the data source.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User read(String uName) throws DaoException;

    /**
     * Read all courses from the database.
     *
     * @return All the courses in the data source.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<User> readAll() throws DaoException;

    /**
     * Read all courses from the database with title containing titleQuery.
     *
     * @param titleQuery A search term.
     * @return All courses retrieved.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<User> readAllInGroup(int gid) throws DaoException;

    /**
     * Update the title of a courses provided its offeringName.
     *
     * @param offeringName The course alphanumeric code.
     * @param title The course Title.
     * @return The updated course object.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User updateGroupID(User user, int gid) throws DaoException;

    /**
     * Delete a courses provided its offeringName.
     *
     * @param offeringName The course alphanumeric code.
     * @return The course object deleted from the data source.
     * @throws DaoException A generic exception for CRUD operations.
     */
    User delete(String uName) throws DaoException;
}
