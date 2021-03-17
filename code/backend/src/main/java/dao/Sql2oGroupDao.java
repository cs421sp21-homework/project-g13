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
     *   "courses" with two columns: "offeringName" and "title".
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
        try (Connection conn = sql2o.open()) {
            return conn.createQuery(sql)
                    .addParameter("gName", name)
                    .executeAndFetchFirst(Group.class);
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
        try (Connection conn = sql2o.open()) {
            Integer gid = conn.createQuery(sql)
                            .executeScalar(Integer.class);
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
    public List<User> readMembers(String id) throws DaoException {
        try (Connection conn = sql2o.open()) {
            List<User> users = conn.createQuery("SELECT * FROM user_info WHERE group_id = :group_id;")
                    .addParameter("group_id", id)
                    .executeAndFetch(User.class);
            //users.forEach((user) -> user.setCategories(getCategoriesFor(conn, user.getUserID())));
            return users;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read a group with group ID: " + id, ex);
        }
    }

    //@Override
    private List<User> readMembers(Connection conn, int id) {
        return conn.createQuery("SELECT * FROM user_info WHERE group_id = :group_id;")
                .addParameter("group_id", id)
                .executeAndFetch(User.class);

    }

    @Override
    public int addMember(Group group, User user) throws DaoException {

        int groupSize;
        if (group.getMembers().isEmpty()) {
            groupSize = 0;
        } else {
            groupSize = group.getMembers().size();
        }

        groupSize++; // for new member

        String sql = ""
                + "UPDATE group_info SET member" + String.valueOf(groupSize) + " = :user_id WHERE group_id = :group_id"
                + ";";
        try (Connection conn = sql2o.open()) {
            //String userID =
            conn.createQuery(sql).addParameter("group_id", group.getGroup_id()).addParameter("user_id", user.getUser_ID()).executeUpdate();

            conn.createQuery("" +
                    "UPDATE user_info SET group_id = :gid WHERE user_id = :uid;").addParameter("gid", group.getGroup_id()).addParameter("uid", user.getUser_ID()).executeUpdate();
            //groups.forEach((group) -> group.setMembers(readMembers(conn, group.getID())));
            user.setGroup_ID(group.getGroup_id());
            group.getMembers().add(user);
            return user.getUser_ID();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to add member to group", ex);
        }

    }

    @Override
    public int removeMember(Group group, User user) throws DaoException {


        List<User> groupMembers = group.getMembers();
        int memberNum = groupMembers.indexOf(user);
        memberNum++; // since arrays begin at Zero

        /* if (memberNum == -1) {
            throw new DaoException("Unable to delete user: not found");
        } */

        String sql = ""
                + "UPDATE group_info SET member" + String.valueOf(memberNum) + " = NULL "
                + "WHERE member" + String.valueOf(memberNum) + " = :uid;";
        try (Connection conn = sql2o.open()) {
            //String userID =
            conn.createQuery(sql).addParameter("uid", user.getUser_ID()).executeUpdate();

            sql = ""
                    + "UPDATE user_info SET group_id = :gid WHERE username = :uName"
                    + ";";
            conn.createQuery(sql).addParameter("gid", 1).addParameter("uName", user.getUserName()).executeUpdate();

            user.setGroup_ID(1); // no longer in group
            group.getMembers().remove(user);

            return user.getUser_ID();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to remove member from group", ex);
        }

    }

    @Override
    public List<Group> readAllGroups() throws DaoException {
        try (Connection conn = sql2o.open()) {
            List<Group> groups = conn.createQuery("SELECT * FROM group_info;").executeAndFetch(Group.class);
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
        try (Connection conn = sql2o.open()) {
            Group group = conn.createQuery(sql)
                    .addParameter("name", name)
                    .addParameter("id", id)
                    .executeAndFetchFirst(Group.class);
            group.setMembers(readMembers(conn, id));
            return group;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to update the group name", ex);
        }
    }

    @Override
    public Group deleteGroup(Group group) throws DaoException {

        try (Connection conn = sql2o.open()) {

            List<User> members = group.getMembers();
            UserDao userDao = new Sql2oUserDao(sql2o);

            for (User member : members) {
                member.setGroup_ID(1); // in POJO
                userDao.updateGroupID(member, 1); // in database
            }

            String sql = ""
                    + "DELETE FROM group_info WHERE group_id = :gid"
                    + ";";

            // actually removing group from table
            conn.createQuery(sql)
                    .addParameter("gid", group.getGroup_id())
                    .executeUpdate();

            return group;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to delete group", ex);
        }
    }


}
