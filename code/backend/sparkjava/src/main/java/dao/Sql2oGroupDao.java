package dao;

import exceptions.DaoException;

import model.User;
import model.Group;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

public class Sql2oGroupDao implements GroupDao {

    private final Sql2o sql2o;

    /**
     * Construct dao.Sql2oGroupDao.
     *
     * @param sql2o A Sql2o object is injected as a dependency;
     *   it is assumed sql2o is connected to a database that  contains a table called
     *   "courses" with eleven columns: "group_id" / "member1" / "member2" / "member3" / "member4" / "member5" / "member6" / "member7" / "member8" / "member9" / "member10".
     */
    public Sql2oGroupDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public Group createGroup(String name) throws DaoException {
        String sql = "WITH inserted AS ("
                + "INSERT INTO group_info(group_name, member1, member2, member3, member4, member5, member6, member7, member8, member9, member10)"
                + " VALUES(:gName, null, null, null, null, null, null, null, null, null, null) RETURNING *"
                + ") SELECT * FROM inserted;";
        try (Connection conn = sql2o.open()) {          // opening connection to database
            return conn.createQuery(sql)                // making proper SQL statement for execution
                    .addParameter("gName", name)  // allowing for varying group names
                    .executeAndFetchFirst(Group.class); // executing SQL + using object mapper to fill fields
        } catch (Sql2oException ex) {
            throw new DaoException(ex.getMessage(), ex);
        }
    }

    @Override
    public Group createGroup() throws DaoException {
        String sql = "WITH inserted AS ("
                + "INSERT INTO group_info(member1, member2, member3, member4, member5, member6, member7, member8, member9, member10)"
                + " VALUES(null, null, null, null, null, null, null, null, null, null) RETURNING *"
                + ") SELECT group_id FROM inserted;";
        try (Connection conn = sql2o.open()) {              // opening connection to database
            // attempt at returning group ID from database
            Integer gid = conn.createQuery(sql)             // making proper SQL statement for execution
                            .executeScalar(Integer.class);  // executing SQL + getting Integer object

            // temp workaround to return group
            Group group = new Group();
            int groupID = gid.intValue();
            group.setGroup_id(groupID);
            group.setMembers(readMembers(conn, groupID)); // should be empty
            return group;
        } catch (Sql2oException ex) {
            throw new DaoException(ex.getMessage(), ex);
        }
    }

    @Override
    public List<User> readMembers(int id) throws DaoException {
        String sql = "SELECT * FROM user_info WHERE group_id = :group_id;";
        try (Connection conn = sql2o.open()) {          // opening connection to database
            List<User> users = conn.createQuery(sql)    // making proper SQL statement for execution
                    .addParameter("group_id", id) // allowing for varying group ID
                    .executeAndFetch(User.class);       // executing SQL + getting list of Users via object mapper
            //users.forEach((user) -> user.setCategories(getCategoriesFor(conn, user.getUserID())));
            return users;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read a group with group ID: " + id, ex);
        }
    }

    // helper method to be used when resetting users' group IDs when deleting group
    //@Override
    private List<User> readMembers(Connection conn, int id) {
        String sql = "SELECT * FROM user_info WHERE group_id = :group_id;";
        return conn.createQuery(sql)
                .addParameter("group_id", id)
                .executeAndFetch(User.class);

    }

    @Override
    public int addMember(Group group, User user) throws DaoException {

        // getting correct number for column to place user
        int groupSize;
        if (group.getMembers().isEmpty()) {
            groupSize = 0;
        } else {
            groupSize = group.getMembers().size();
        }

        groupSize++; // for new member

        String sql = "UPDATE group_info SET member" + String.valueOf(groupSize) +
                " = :user_id WHERE group_id = :group_id;";
        try (Connection conn = sql2o.open()) {                           // opening connection to database
            //String userID =
            conn.createQuery(sql)                                        // making proper SQL statement for execution
                    .addParameter("group_id", group.getGroup_id()) // allowing for varying group ID
                    .addParameter("user_id", user.getUser_ID())    // allowing for varying user ID
                    .executeUpdate();                                    // executing SQL

            sql = "UPDATE user_info SET group_id = :gid WHERE user_id = :uid;";
            conn.createQuery(sql)                                        // making proper SQL statement for execution
                    .addParameter("gid", group.getGroup_id())      // allowing for varying group ID
                    .addParameter("uid", user.getUser_ID())        // allowing for varying user ID
                    .executeUpdate();                                    // executing SQL
            //groups.forEach((group) -> group.setMembers(readMembers(conn, group.getID())));

            // might change to get userID from group table and look for that user in user table
            user.setGroup_ID(group.getGroup_id());
            group.getMembers().add(user);
            return user.getUser_ID();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to add member to group", ex);
        }

    }

    @Override
    public int removeMember(Group group, User user) throws DaoException {

        // knowing which column to target
        List<User> groupMembers = group.getMembers();
        int memberNum = groupMembers.indexOf(user);
        memberNum++; // since arrays begin at Zero

        /* if (memberNum == -1) {
            throw new DaoException("Unable to delete user: not found");
        } */

        String sql = "UPDATE group_info SET member" + String.valueOf(memberNum) +
                " = NULL WHERE member" + String.valueOf(memberNum) + " = :uid;";
        try (Connection conn = sql2o.open()) {                    // opening connection to database
            //String userID =
            conn.createQuery(sql)                                 // making proper SQL statement for execution
                    .addParameter("uid", user.getUser_ID()) // allowing for varying user ID
                    .executeUpdate();                             // executing SQL

            sql = "UPDATE user_info SET group_id = :gid WHERE username = :uName;";
            conn.createQuery(sql)                                    // making proper SQL statement for execution
                    .addParameter("gid", 1)              // allowing for varying group ID
                    .addParameter("uName", user.getUserName()) // allowing for varying user ID
                    .executeUpdate();                                // executing SQL

            user.setGroup_ID(1); // no longer in group
            group.getMembers().remove(user);

            return user.getUser_ID();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to remove member from group", ex);
        }

    }

    @Override
    public List<Group> readAllGroups() throws DaoException {
        String sql = "SELECT * FROM group_info;";
        try (Connection conn = sql2o.open()) {                     // opening connection to database
            List<Group> groups = conn.createQuery(sql)             // making proper SQL statement for execution
                                    .executeAndFetch(Group.class); // executing SQL + filling Group via object mapper

            // fancy line for filling each group with members from database (might change to get from group table instead of user table)
            groups.forEach((group) -> group.setMembers(readMembers(conn, group.getGroup_id())));
            return groups;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read groups from the database", ex);
        }
    }

    @Override
    public Group updateGroupName(int id, String name) throws DaoException {
        String sql = "WITH updated AS ("
                + "UPDATE group_info SET name = :name WHERE id = :id RETURNING *"
                + ") SELECT * FROM updated;";
        try (Connection conn = sql2o.open()) {          // opening connection to database
            Group group = conn.createQuery(sql)         // making proper SQL statement for execution
                    .addParameter("name", name)   // allowing for varying group names
                    .addParameter("id", id)       // allowing for varying group ID
                    .executeAndFetchFirst(Group.class); // executing SQL + filling Group via object mapper

            // properly filling group (members filled not mapped to the columns of group table)
            group.setMembers(readMembers(conn, id));
            return group;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to update the group name", ex);
        }
    }

    @Override
    public Group deleteGroup(Group group) throws DaoException {

        try (Connection conn = sql2o.open()) {

            // handling deletion in user table
            List<User> members = group.getMembers();
            UserDao userDao = new Sql2oUserDao(sql2o);

            for (User member : members) {
                member.setGroup_ID(1); // in POJO
                userDao.updateGroupID(member, 1); // in database
            }

            String sql = "DELETE FROM group_info WHERE group_id = :gid;";

            // actually removing from group table
            conn.createQuery(sql)
                    .addParameter("gid", group.getGroup_id())
                    .executeUpdate();

            // emptying the object (propagating the delete through database and POJO)
            group.getMembers().clear();

            // temporary until groups can be neatly return from database
            // also might be difficult since it was just deleted (cannot be accessed in database)
            return group;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to delete group", ex);
        }
    }


}
