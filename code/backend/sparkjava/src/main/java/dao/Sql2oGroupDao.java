package dao;

import exceptions.DaoException;

import model.User;
import model.Group;

import java.sql.Array;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.postgresql.jdbc.PgArray;
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
                + "INSERT INTO group_info(name, memberIDs)"
                + " VALUES(:gName, ARRAY [0]) RETURNING *"
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
                + "INSERT INTO group_info(name, memberIDs)"
                + " VALUES('default', ARRAY [0]) RETURNING *"
                + ") SELECT group_id FROM inserted;";
        try (Connection conn = sql2o.open()) {              // opening connection to database
            // attempt at returning group ID from database
            Integer gid = conn.createQuery(sql)             // making proper SQL statement for execution
                            .executeScalar(Integer.class);  // executing SQL + getting Integer object

            // temp workaround to return group
            Group group = new Group();
            int groupID = gid.intValue();
            group.setGroup_id(groupID);
            List<User> members = readMembers(conn, groupID);
            group.setMembers(members); // should be empty
            return group;
        } catch (Sql2oException ex) {
            throw new DaoException(ex.getMessage(), ex);
        }
    }

    @Override
    public List<User> readMembers(int id) throws DaoException {
        String sql = "SELECT ARRAY_TO_STRING(memberIDs, ',') FROM group_info WHERE group_id = :group_id;";
        try (Connection conn = sql2o.open()) {            // opening connection to database
            //List<PgArray> theUsers
                   List<String> theUsers = conn.createQuery(sql) // making proper SQL statement for execution
                    .addParameter("group_id", id)   // allowing for varying group ID
                    .executeAndFetch(String.class);      // executing SQL + getting list of user IDs

            // ^ returns a list but we only want the exact match (only returns one row anyway)
            String[] userIDString = theUsers.get(0).split(",");
            int[] userIDInt = new int[userIDString.length];
            for (int i = 0; i < userIDString.length; i++) { // getting the ints from the comma separated string
                userIDInt[i] = Integer.parseInt(userIDString[i]);
            }

            List<User> users = new ArrayList<>();
            User currUser;
            //Array userIDsHolder = (Array) theUsers.get(0).getArray();
            //List userIDs = (List) userIDsHolder.getArray();

            int numUserIDs = userIDInt.length;
            if (numUserIDs == 1 && userIDInt[0] == 0) {
                // do nothing because group was just created and no members have been added
                // avoiding a NullPointerException
            } else {
                for (int index = 0; index < numUserIDs; index++) {
                    sql = "SELECT user_id, username, pword, loc, ARRAY_TO_STRING(preferences, ','), group_id " +
                            "FROM user_info WHERE user_id = :uid;";
                    currUser = conn.createQuery(sql) // making proper SQL statement for execution
                            .addParameter("uid", userIDInt[index])   // allowing for varying group ID
                            .addColumnMapping("ARRAY_TO_STRING", "preferences")
                            .executeAndFetchFirst(User.class);      // executing SQL + getting users one at a time

                    // finessing array from database into list in POJO
                    String[] userPrefs = currUser.getPreferences().split(",");
                    currUser.setPreferencesList(Arrays.asList(userPrefs));

                    users.add(currUser);
                }
            }

            return users;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read a group with group ID: " + id, ex);
        }
    }

    // helper method to be used when resetting users' group IDs when deleting group
    //@Override
    private List<User> readMembers(Connection conn, int id) throws DaoException {
        String sql = "SELECT user_id, username, pword, loc, ARRAY_TO_STRING(preferences, ','), group_id " +
                     "FROM user_info WHERE group_id = :gid;";
        try {
            List<User> users = conn.createQuery(sql)
                    .addParameter("gid", id)
                    .addColumnMapping("ARRAY_TO_STRING", "preferences")
                    .executeAndFetch(User.class);

            for (User user : users) {
                // finessing array from database into list in POJO
                String[] userPrefs = user.getPreferences().split(",");
                user.setPreferencesList(Arrays.asList(userPrefs));
            }

            return users;

        } catch (Sql2oException ex) {
            throw new DaoException("unable to read group members", ex);
        }

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

        groupSize++; // for new member and because Postgres arrays begin index at 1

        String sql = "UPDATE group_info SET memberIDs = " +
                "ARRAY_APPEND(memberIDs, CAST(:user_id AS BIGINT))" +
                " WHERE group_id = :group_id;";
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

            // removing 0 that was initially used to create array
            sql = "UPDATE group_info SET memberIDs" +
                    " = ARRAY_REMOVE(memberIDs, CAST(0 AS BIGINT)) WHERE group_id = :gid;";
            conn.createQuery(sql)                                   // making proper SQL statement for execution
                    .addParameter("gid", group.getGroup_id()) // allowing for varying group ID
                    .executeUpdate();                               // executing SQL

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
        memberNum++; // since arrays begin at Zero and postgres array begin at 1

        /* if (memberNum == -1) {
            throw new DaoException("Unable to delete user: not found");
        } */

        String sql = "UPDATE group_info SET memberIDs" +
                " = ARRAY_REMOVE(memberIDs, CAST(:uid AS BIGINT)) WHERE group_id = :gid;";
        try (Connection conn = sql2o.open()) {                    // opening connection to database
            //String userID =
            conn.createQuery(sql)                                 // making proper SQL statement for execution
                    .addParameter("uid", user.getUser_ID()) // allowing for varying user ID
                    .addParameter("gid", group.getGroup_id()) // allowing for varying user ID
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

    //private readUserIDs(Connection conn, )

    @Override
    public List<Group> readAllGroups() throws DaoException {
        String sql = "SELECT group_id, ARRAY_TO_STRING(memberIDs, ',') FROM group_info;";
        try (Connection conn = sql2o.open()) {                     // opening connection to database
            List<Group> groups = conn.createQuery(sql)             // making proper SQL statement for execution
                                 .addColumnMapping("ARRAY_TO_STRING", "memberIDs")
                                 .executeAndFetch(Group.class); // executing SQL + filling Group via object mapper

            List<User> currUser = new ArrayList<>();

            for (Group group : groups) {
                String[] userIDString = groups.get(0).getMemberIDs().split(",");
                //List<Integer> userIDs = group.getMemberIDs();
                for (int index = 0; index < userIDString.length; index++) {
                    sql = "SELECT user_id, username, pword, loc, ARRAY_TO_STRING(preferences, ','), group_id " +
                          "FROM user_info WHERE user_id = :uid;";
                    currUser = conn.createQuery(sql) // making proper SQL statement for execution
                            .addParameter("uid", Integer.parseInt(userIDString[index]))   // allowing for varying group ID
                            .addColumnMapping("ARRAY_TO_STRING", "preferences")
                            .executeAndFetch(User.class);      // executing SQL + getting users one at a time

                    // finessing array from database into list in POJO
                    String[] userPrefs = currUser.get(0).getPreferences().split(",");
                    currUser.get(0).setPreferencesList(Arrays.asList(userPrefs));

                    group.getMembers().add(currUser.get(0));
                }
            }

            // fancy line for filling each group with members from database (might change to get from group table instead of user table)
            //for (Group group : groups) {
            //groups.forEach((group) -> group.setMembers(readMembers(conn, group.getGroup_id())));
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
