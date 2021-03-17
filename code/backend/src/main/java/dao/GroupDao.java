package dao;

import exceptions.DaoException;
import model.Group;
import model.User;
import org.sql2o.Connection;

import java.util.List;

/**
 * Data Access Object for model.Group.
 */
public interface GroupDao {

    /**
     * Create a user with predetermined group number.
     *
     * @param offeringName The course alphanumeric code.
     * @param title        The course Title.
     * @return The course object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    Group createGroup(String name) throws DaoException;

    Group createGroup() throws DaoException;

    /**
     * Read a course provided its offeringName.
     *
     * @param offeringName The course alphanumeric code.
     * @return The course object read from the data source.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<User> readMembers(String id) throws DaoException;

    /**
     * Read all courses from the database.
     *
     * @return All the courses in the data source.
     * @throws DaoException A generic exception for CRUD operations.
     */
    int removeMember(Group group, User user) throws DaoException;

    /**
     * Read all courses from the database with title containing titleQuery.
     *
     * @param titleQuery A search term.
     * @return All courses retrieved.
     * @throws DaoException A generic exception for CRUD operations.
     */
    int addMember(Group group, User user) throws DaoException;

    /**
     * Update the title of a courses provided its offeringName.
     *
     * @param offeringName The course alphanumeric code.
     * @param title        The course Title.
     * @return The updated course object.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<Group> readAllGroups() throws DaoException;

    /**
     * Delete a courses provided its offeringName.
     *
     * @param offeringName The course alphanumeric code.
     * @return The course object deleted from the data source.
     * @throws DaoException A generic exception for CRUD operations.
     */
    Group updateGroupName(int id, String name) throws DaoException;

    Group deleteGroup(Group group) throws DaoException;

}
