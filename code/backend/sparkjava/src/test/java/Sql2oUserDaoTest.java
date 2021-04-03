import dao.Sql2oUserDao;
import dao.UserDao;
import exceptions.DaoException;

import model.User;

import org.junit.jupiter.api.*;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

class Sql2oUserDaoTest {
    private static Sql2o sql2o;
    private static List<User> samples;
    private UserDao userDao;

    @BeforeAll
    static void connectToDatabase() throws URISyntaxException {

        // using test database in backend app
        //String testDatabaseUrl = System.getenv("TEST_DATABASE_URL");
        URI dbUri = new URI("postgres://gsyqpyihtezhlv:bd02af53d56a03f3776f24d1e445983c396c5168abf5074343f70f0cf51f7bbc@ec2-52-45-73-150.compute-1.amazonaws.com:5432/def52afl6sjeue");

        // for updating the frontend for massive changes
        //URI dbUri = new URI("postgres://cyjnmjdqsxpfky:1dc851cad799f5fb5a8cae9f2f9495e061adda1fd24b0c388bf771bb96a12ea1@ec2-52-71-161-140.compute-1.amazonaws.com:5432/d400u7n1i19g77");


        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
                + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

        sql2o = new Sql2o(dbUrl, username, password);
    }


    @BeforeAll
    static void setSampleUsers() {
        // instantiate "samples" with sample users
        samples = new ArrayList<>();

        samples.add(new User("elewin0", "jykBFpuOiS7q", null, 1));
        samples.add(new User("gdamrel1", "1k852EiMi", null, 1));
        samples.add(new User("kbastock2", "P1hYn4U4yMg", null, 1));
        samples.add(new User("egorusso3", "bOiAGh", "64 Susan Place", 1));
        samples.add(new User("dfulker4", "uPRmvhlHMnJ", "2 Farmco Pass", 1));
        samples.add(new User("mderbyshire5", "4B36ySy1b2p", null, 1));
        samples.add(new User("agobourn6", "RlakQF", "14760 Stephen Circle", 1));
        samples.add(new User("nrickard7", "2XxHy8Y07EW", "84 Meadow Ridge Plaza", 1));
        samples.add(new User("rcornborough8", "AE839b", "48 Di Loreto Circle", 1));
        samples.add(new User("kjozaitis9", "TiE9SD8WA", "77114 Linden Plaza", 1));
        samples.add(new User("tbubeera", "xc4Jdg", null, 1));
        samples.add(new User("msoallb", "8ZNYnsZtL", null, 1));
        samples.add(new User("tboolsc", "WzdZuEht", null, 1));
        samples.add(new User("beastbrookd", "dmoVuxhbI", "584 Banding Court", 1));
        samples.add(new User("tredselle", "vZWf6zM", null, 1));
        samples.add(new User("kfeatherstonef", "d9jBMbk", null, 1));
        samples.add(new User("ppooleyg", "x8BydCrAGY1", null, 1));
        samples.add(new User("amccrostieh", "b8V958", "844 Hazelcrest Drive", 1));
        samples.add(new User("kfyldesi", "fo4cfE", null, 1));
        samples.add(new User("ppallaskej", "wg6NVLHRM", null, 1));
        samples.add(new User("tmivalk", "VUmQzbfIAp", "893 Pepper Wood Junction", 1));

    }

    @BeforeEach
    void injectDependency() {
        // instantiate the userDao object as a dao.Sql2oUserDao
        try (Connection conn = sql2o.open()) {
            conn.createQuery("DROP TABLE IF EXISTS user_info;").executeUpdate();
            conn.createQuery("DROP TABLE IF EXISTS group_info;").executeUpdate();

            String sql = "CREATE TABLE group_info (" +
                    "group_id BIGSERIAL PRIMARY KEY," +
                    "name VARCHAR(50)," +
                    "memberIDs BIGINT []);";
            conn.createQuery(sql).executeUpdate();

            sql = "insert into group_info(memberIDs) " +
                    "values (ARRAY [0]);";
            conn.createQuery(sql).executeUpdate();

            sql = "CREATE TABLE user_info (" +
                    "user_id BIGSERIAL NOT NULL PRIMARY KEY," +
                    "username VARCHAR(50) NOT NULL," +
                    "pword VARCHAR(50) NOT NULL," +
                    "loc VARCHAR(100)," +
                    "preferences VARCHAR(50) []," + // left as empty upon creation
                    "group_id BIGSERIAL REFERENCES group_info(group_id)," +
                    "UNIQUE(username)," +
                    "UNIQUE(pword));";
            conn.createQuery(sql).executeUpdate();

            sql = "INSERT INTO user_info(username, pWord, loc, preferences, group_id) " +
                    "VALUES(:username, :pWord, :loc, ARRAY['none'], :group_id);";
            for (User user : samples) {
                conn.createQuery(sql).addParameter("username", user.getUserName())
                        .addParameter("pWord", user.getPword())
                        .addParameter("loc", user.getLoc())
                        .addParameter("group_id", user.getGroup_ID())
                        .executeUpdate();
            }
        }

        userDao = new Sql2oUserDao(sql2o);
    }

    @Test
    @DisplayName("create works for valid input")
    void createUser() {
        User u1 = new User("kpawnsford16", "w6HXK786uN", "3 Leroy Circle", 1);
        User u2 = userDao.create(u1.getUserName(), u1.getPword(), u1.getLoc(), u1.getGroup_ID());

        assertEquals(u1.getUserName(), u2.getUserName());
        assertEquals(u1.getLoc(), u2.getLoc());
        assertEquals(u1.getPword(), u2.getPword());
        assertEquals(u1.getGroup_ID(), u2.getGroup_ID());
        // not testing same user ID because u1 has a default of zero while u2 has the actual user ID

    }

    @Test
    @DisplayName("create works for username/password ONLY")
    void createUserNamePass() {
        User u1 = new User();
        u1.setUserName("test");
        u1.setPword("test");
        User u2 = userDao.create(u1.getUserName(), u1.getPword());

        assertEquals(u1.getUserName(), u2.getUserName());
        assertEquals(u1.getLoc(), u2.getLoc());
        assertEquals(u1.getPword(), u2.getPword());
        assertEquals(u1.getGroup_ID(), u2.getGroup_ID());
        // not testing same user ID because u1 has a default of zero while u2 has the actual user ID

    }

    @Test
    @DisplayName("remove works for valid input")
    void deleteUser() {

        User u1 = userDao.delete("msoallb");
        List<User> users = userDao.readAll();

        assertEquals(users.indexOf(u1), -1); // should not be found in database
    }

    /*
    @Test
    @DisplayName("group name can be changed")
    void changeGroupNumber() {
        //User u1 = userDao.updateGroupID("msoallb", 5);
    }

     */

    @Test
    @DisplayName("can get list of group members")
    void getListOfUsers() {
        // not really a test, just seeing if it can work with errors
        List<User> users = userDao.readAll();

        assertEquals(users.size(), 21);
    }

    @Test
    @DisplayName("can find specific users based on unique username")
    void getSpecificUser() {
        User u1 = userDao.read("msoallb");

        assertEquals(u1.getUserName(), "msoallb");
        assertEquals(u1.getPword(), "8ZNYnsZtL");
        assertEquals(u1.getUser_ID(), 12);
        assertEquals(u1.getLoc(), null);
        assertEquals(u1.getGroup_ID(), 1); // 1 because not in a group

    }

    @Test
    @DisplayName("can add a preference to specific user")
    void addPreference() {
        User u1 = userDao.read("msoallb");

        // only adding one at a time
        userDao.addPreference(u1, "indpak");

        User u2 = userDao.read("msoallb");
        assertEquals(u2.getPreferencesList().size(), 1);
        assertEquals(u2.getPreferencesList().get(0), "indpak");

    }

    @Test
    @DisplayName("can add multiple preferences to specific user")
    void addPreferences() {
        User u1 = userDao.read("msoallb");

        // only adding one at a time
        userDao.addPreference(u1, "indpak");

        User u2 = userDao.read("msoallb");

        // only adding one at a time
        userDao.addPreference(u1, "vegan");

        User u3 = userDao.read("msoallb");

        assertEquals(u3.getPreferencesList().size(), 2);
        assertEquals(u3.getPreferencesList().get(0), "indpak");
        assertEquals(u3.getPreferencesList().get(1), "vegan");

    }

    @Test
    @DisplayName("can remove a preference from specific user")
    void removePreference() {
        User u1 = userDao.read("msoallb");

        // only adding/removing one at a time
        userDao.addPreference(u1, "indpak");
        userDao.removePreference(u1, "indpak");

        User u2 = userDao.read("msoallb");

        assertEquals(u2.getPreferencesList().size(), 1);
        assertEquals(u2.getPreferencesList().get(0), "none");

    }

    @Test
    @DisplayName("can remove multiple preferences from specific user")
    void removePreferences() {
        User u1 = userDao.read("msoallb");

        // only adding/removing one at a time
        userDao.addPreference(u1, "indpak");
        userDao.addPreference(u1, "kosher");

        userDao.removePreference(u1, "indpak");
        userDao.removePreference(u1, "kosher");

        User u2 = userDao.read("msoallb");

        assertEquals(u2.getPreferencesList().size(), 1);
        assertEquals(u2.getPreferencesList().get(0), "none");

    }

}
