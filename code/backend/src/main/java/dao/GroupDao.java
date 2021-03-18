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
     * Create a group with specific group name.
     *
     * @param name The group's name.
     * @return The group object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    Group createGroup(String name) throws DaoException;

    /**
     * Create a group.
     *
     * @return The group object created.
     * @throws DaoException A generic exception for CRUD operations.
     */
    Group createGroup() throws DaoException;

    /**
     * Get all users in group from database
     *
     * @param id The identifier for the group.
     * @return The list containing the group's members.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<User> readMembers(int id) throws DaoException;

    /**
     * Remove a member from group.
     *
     * @param group The group containing the user.
     * @param user The user to be removed.
     * @return ID of removed user.
     * @throws DaoException A generic exception for CRUD operations.
     */
    int removeMember(Group group, User user) throws DaoException;

    /**
     * Add a member to group.
     *
     * @param group The group to contain the user.
     * @param user The user to be added to the group.
     * @return ID of added user.
     * @throws DaoException A generic exception for CRUD operations.
     */
    int addMember(Group group, User user) throws DaoException;

    /**
     * Get all groups from database.
     *
     * @return The list holding all groups from database.
     * @throws DaoException A generic exception for CRUD operations.
     */
    List<Group> readAllGroups() throws DaoException;

    /**
     * Update a group's name.
     *
     * @param id The id of the course to receive a new name.
     * @param name The new name.
     * @return The group that received a new name.
     * @throws DaoException A generic exception for CRUD operations.
     */
    Group updateGroupName(int id, String name) throws DaoException;

    /**
     * Remove group from database.
     *
     * @param group The group to be removed.
     * @return The group that was removed. (eeh maybe / might make it a boolean for successful deletion)
     * @throws DaoException A generic exception for CRUD operations.
     * */
    Group deleteGroup(Group group) throws DaoException;

}
