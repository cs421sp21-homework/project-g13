package dao;

import model.Group;
import model.User;

import java.util.ArrayList;
import java.util.Arrays;
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
     *   "user_info" with six columns: "user_id" / "username" / "pword" / "location" / "preferences" / "group_id".
     */
    public Sql2oUserDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public User create(String uName, String pWord, String location, int gid) throws DaoException {
        String sql = "WITH inserted AS ("
                + "INSERT INTO user_info(username, pWord, group_id, preferences, loc, isloggedin)"
                + " VALUES(:userName, :pword, :groupNumber, ARRAY['none'], :loc, 'no') RETURNING *"
                + ") SELECT * FROM inserted;";
        try (Connection conn = sql2o.open()) {              // opening connection to database
            return conn.createQuery(sql)                    // making proper SQL statement for execution
                    .addParameter("userName", uName)  // allowing for varying username
                    .addParameter("pword", pWord)     // allowing for varying password
                    .addParameter("groupNumber", gid) // allowing for varying group ID
                    .addParameter("loc", location)    // allowing for varying location
                    .executeAndFetchFirst(User.class);      // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create user", ex);
        }
    }

    @Override
    public User create(String uName, String pWord, String location) throws DaoException {
        String sql = "WITH inserted AS ("
                + "INSERT INTO user_info(username, pWord, group_id, preferences, loc, isloggedin)"
                + " VALUES(:userName, :pword, 1, ARRAY['none'], :loc, 'no') RETURNING *"
                + ") SELECT * FROM inserted;";
        try (Connection conn = sql2o.open()) {             // opening connection to database
            return conn.createQuery(sql)                   // making proper SQL statement for execution
                    .addParameter("userName", uName) // allowing for varying username
                    .addParameter("pword", pWord)    // allowing for varying password
                    .addParameter("loc", location)   // allowing for varying location
                    .executeAndFetchFirst(User.class);     // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create user", ex);
        }
    }

    @Override
    public User create(String uName, String pWord) throws DaoException {
        String sql = "WITH inserted AS ("
                + "INSERT INTO user_info(username, pWord, group_id, preferences, loc, isloggedin) "
                + "VALUES(:userName, :pword, 1, ARRAY['none'], NULL, 'no') RETURNING *"
                + ") SELECT * FROM inserted;";
        try (Connection conn = sql2o.open()) {             // opening connection to database
            return conn.createQuery(sql)                   // making proper SQL statement for execution
                    .addParameter("userName", uName) // allowing for varying username
                    .addParameter("pword", pWord)    // allowing for varying password
                    .executeAndFetchFirst(User.class);     // executing SQL + using the object mapper to fill the fields
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to create user", ex);
        }
    }

    @Override
    public User read(String uName) throws DaoException {
        String sql = "SELECT user_id, username, pword, loc, ARRAY_TO_STRING(preferences, ','), isloggedin, group_id " +
                     "FROM user_info WHERE username = :uName;";
        try (Connection conn = sql2o.open()) {          // opening connection to database
            User currUser = conn.createQuery(sql)                // making proper SQL statement for execution
                             .addParameter("uName", uName) // allowing for varying username
                             .addColumnMapping("ARRAY_TO_STRING", "preferences")
                             .executeAndFetchFirst(User.class);  // executing SQL + using the object mapper to fill the fields

            if (!(currUser.getPreferences().equals(""))) { // would only be "" (no space like in constructor) if all preferences were removed
                String[] userPrefs = currUser.getPreferences().split(",");
                currUser.setPreferencesList(Arrays.asList(userPrefs));
            } else { // just update empty column to have none (more descriptive)
                // null lists are very bad elsewhere :-(
                ArrayList<String> temp = new ArrayList<>();
                temp.add("none");
                currUser.setPreferencesList(temp);
                this.addNonePreference(currUser.getUser_ID(), "none");
            }

            return currUser;

        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read a user with username " + uName, ex);
        }
    }


    @Override
    public List<User> readAll() throws DaoException {
        String sql = "SELECT user_id, username, pword, loc, ARRAY_TO_STRING(preferences, ','), isloggedin, group_id " +
                     "FROM user_info;";
        try (Connection conn = sql2o.open()) {    // opening connection to database
            List<User> users = conn.createQuery(sql)          // making proper SQL statement for execution
                               .addColumnMapping("ARRAY_TO_STRING", "preferences")
                               .executeAndFetch(User.class); // executing SQL + using the object mapper to fill the fields

            for (User user : users) {
                // finessing array from database into list in POJO
                String[] userPrefs = user.getPreferences().split(",");
                user.setPreferencesList(Arrays.asList(userPrefs));
            }

            return users;

        } catch (Sql2oException ex) {
            throw new DaoException("Unable to read users from the database", ex);
        }
    }

    @Override
    public List<User> readAllInGroup(int gid) throws DaoException {
        String sql = "SELECT user_id, username, pword, loc, ARRAY_TO_STRING(preferences, ','), isloggedin, group_id " +
                     "FROM user_info WHERE group_id = :groupID;";
        try (Connection conn = sql2o.open()) {          // opening connection to database
            List<User> users = conn.createQuery(sql)                // making proper SQL statement for execution
                                .addParameter("groupID", gid) // allowing for varying group ID
                                .executeAndFetch(User.class);       // executing SQL + using the object mapper to fill the fields

            for (User user : users) {
                // finessing array from database into list in POJO
                String[] userPrefs = user.getPreferences().split(",");
                user.setPreferencesList(Arrays.asList(userPrefs));
            }

            return users;

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
    public void addNonePreference(int userID, String pref) throws DaoException {

        String sql = "UPDATE user_info SET preferences = " +
                "ARRAY_APPEND(preferences, CAST(:pref AS VARCHAR))" +
                " WHERE user_id = :user_id;";
        try (Connection conn = sql2o.open()) {                  // opening connection to database
            //String userID =
            conn.createQuery(sql)                            // making proper SQL statement for execution
                    .addParameter("pref", pref)        // allowing for varying group ID
                    .addParameter("user_id", userID)   // allowing for varying user ID
                    .executeUpdate();                        // executing SQL
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to set preference to none for: " + userID, ex);
        }

    }

    @Override
    public List<String> addPreference(User user, String pref) throws DaoException {

        String sql = "UPDATE user_info SET preferences = " +
                "ARRAY_APPEND(preferences, CAST(:pref AS VARCHAR))" +
                " WHERE user_id = :user_id;";
        try (Connection conn = sql2o.open()) {                           // opening connection to database
            //String userID =
            conn.createQuery(sql)                                        // making proper SQL statement for execution
                    .addParameter("pref", pref) // allowing for varying group ID
                    .addParameter("user_id", user.getUser_ID())    // allowing for varying user ID
                    .executeUpdate();                                    // executing SQL

            // propagating database change to POJO and avoiding UnsupportedOperationException
            ArrayList<String> temp = new ArrayList<>(user.getPreferencesList());
            temp.add(pref);

            // removing "none" that was initially used to create array
            sql = "UPDATE user_info SET preferences" +
                    " = ARRAY_REMOVE(preferences, CAST('none' AS VARCHAR)) WHERE user_id = :uid;";
            conn.createQuery(sql)                                   // making proper SQL statement for execution
                    .addParameter("uid", user.getUser_ID())  // allowing for varying user ID
                    .executeUpdate();
            temp.remove("none");

            user.setPreferencesList(temp);
            return user.getPreferencesList();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to add preference to: " + user.getUserName(), ex);
        }

    }

    @Override
    public List<String> removePreference(User user, String pref) throws DaoException {

        String sql = "UPDATE user_info SET preferences" +
                " = ARRAY_REMOVE(preferences, CAST(:pref AS VARCHAR)) WHERE user_id = :uid;";
        try (Connection conn = sql2o.open()) {                    // opening connection to database
            //String userID =
            conn.createQuery(sql)                                 // making proper SQL statement for execution
                    .addParameter("uid", user.getUser_ID()) // allowing for varying user ID
                    .addParameter("pref", pref) // allowing for varying user ID
                    .executeUpdate();                             // executing SQL

            // propagating database change to POJO and avoiding UnsupportedOperationException
            ArrayList<String> temp = new ArrayList<>(user.getPreferencesList());
            temp.remove(pref);
            user.setPreferencesList(temp);

            return user.getPreferencesList();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to remove preference to:  " + user.getUserName(), ex);
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

    @Override
    public User login(String uName) throws DaoException {
        String sql = "UPDATE user_info SET isloggedin = :login WHERE username = :uName;";
        try (Connection conn = sql2o.open()) {                       // opening connection to database
            conn.createQuery(sql)                                    // making proper SQL statement for execution
                    .addParameter("uName", uName)              // allowing for varying username
                    .addParameter("login", "yes")
                    .executeUpdate();                                // executing SQL

            User user = read(uName);
            user.setIsLoggedIn(true);                                // updating in POJO
            return user;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to update the group ID", ex);
        }
    }

    @Override
    public User logout(String uName) throws DaoException {
        String sql = "UPDATE user_info SET isloggedin = :login WHERE username = :uName;";
        try (Connection conn = sql2o.open()) {                       // opening connection to database
            conn.createQuery(sql)                                    // making proper SQL statement for execution
                    .addParameter("uName", uName)              // allowing for varying username
                    .addParameter("login", "no")
                    .executeUpdate();                                // executing SQL

            User user = read(uName);
            user.setIsLoggedIn(false);                                // updating in POJO
            return user;
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to update the group ID", ex);
        }
    }

}

