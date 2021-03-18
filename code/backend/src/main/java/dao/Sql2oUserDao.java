package dao;

import model.User;

import java.util.List;

import exceptions.DaoException;

import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

public class Sql2oUserDao implements UserDao {

    private final Sql2o sql2o;

    /**
     * Construct dao.Sql2oUserDao.
     *
     * @param sql2o A Sql2o object is injected as a dependency;
     *   it is assumed sql2o is connected to a database that contains a table called
     *   "user_info" with five columns: "user_id" / "username" / "pword" / "location" / "group_id".
     */
    public Sql2oUserDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public User create(String uName, String pWord, String location, int gid) throws DaoException {
        String sql = "WITH inserted AS ("
                + "INSERT INTO user_info(username, pWord, group_id, loc) VALUES(:userName, :pword, :groupNumber, :loc) RETURNING *"
                + ") SELECT * FROM inserted;";
        try (Connection conn = sql2o.open()) {              // opening connection to database
            return conn.createQuery(sql)                    // making proper SQL statement for execution
                    .addParameter("userName", uName)  // allowing for varying username
                    .addParameter("pword", pWord)     // allowing for varying password
                    .addParameter("groupNumber", gid) // allowing for varying group ID
                    .addParameter("loc", location)    // allowing for varying location
                    .executeAndFetchFirst(User.class);      // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException(ex.getMessage(), ex);
        }
    }

    @Override
    public User create(String uName, String pWord, String location) throws DaoException {
        String sql = "WITH inserted AS ("
                + "INSERT INTO user_info(username, pWord, group_id, loc) VALUES(:userName, :pword, NULL, :loc) RETURNING *"
                + ") SELECT * FROM inserted;";
        try (Connection conn = sql2o.open()) {             // opening connection to database
            return conn.createQuery(sql)                   // making proper SQL statement for execution
                    .addParameter("userName", uName) // allowing for varying username
                    .addParameter("pword", pWord)    // allowing for varying password
                    .addParameter("loc", location)   // allowing for varying location
                    .executeAndFetchFirst(User.class);     // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException(ex.getMessage(), ex);
        }
    }

    @Override
    public User read(String uName) throws DaoException {
        String sql = "SELECT * FROM user_info WHERE username = :uName;";
        try (Connection conn = sql2o.open()) {          // opening connection to database
            return conn.createQuery(sql)                // making proper SQL statement for execution
                    .addParameter("uName", uName) // allowing for varying username
                    .executeAndFetchFirst(User.class);  // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read a user with username " + uName, ex);
        }
    }


    @Override
    public List<User> readAll() throws DaoException {
        String sql = "SELECT * FROM user_info;";
        try (Connection conn = sql2o.open()) {    // opening connection to database
            return conn.createQuery(sql)          // making proper SQL statement for execution
                    .executeAndFetch(User.class); // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read users from the database", ex);
        }
    }

    @Override
    public List<User> readAllInGroup(int gid) throws DaoException {
        String sql = "SELECT * FROM user_info WHERE group_id = :groupID;";
        try (Connection conn = sql2o.open()) {          // opening connection to database
            return conn.createQuery(sql)                // making proper SQL statement for execution
                    .addParameter("groupID", gid) // allowing for varying group ID
                    .executeAndFetch(User.class);       // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read group members from the database", ex);
        }
    }

    @Override
    public User updateGroupID(User user, int gid) throws DaoException {
        String sql = "UPDATE user_info SET group_id = :gid WHERE username = :uName;";
        try (Connection conn = sql2o.open()) {                       // opening connection to database
            conn.createQuery(sql)                                    // making proper SQL statement for execution
                    .addParameter("gid", gid)                  // allowing for varying group ID
                    .addParameter("uName", user.getUserName()) // allowing for varying username
                    .executeUpdate();                                // executing SQL

            return user;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to update the group ID", ex);
        }
    }

    @Override
    public User delete(String uName) throws DaoException {
        String sql = "WITH deleted AS ("
                + "DELETE FROM user_info WHERE username = :uName RETURNING *"
                + ") SELECT * FROM deleted;";
        try (Connection conn = sql2o.open()) {          // opening connection to databases
            return conn.createQuery(sql)                // making proper SQL statement for execution
                    .addParameter("uName", uName) // allowing for varying username
                    .executeAndFetchFirst(User.class);  // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to delete the user", ex);
        }
    }

}

