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
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
//import static util.DataStore.sampleCourses;
import static util.Database.getSql2o;

class Sql2oUserDaoTest {
    private static Sql2o sql2o;
    private static List<User> samples;
    private UserDao userDao;

    @BeforeAll
    static void connectToDatabase() throws URISyntaxException {

        sql2o = getSql2o();
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
                    "member1 BIGINT," +
                    "member2 BIGINT," +
                    "member3 BIGINT," +
                    "member4 BIGINT," +
                    "member5 BIGINT," +
                    "member6 BIGINT," +
                    "member7 BIGINT," +
                    "member8 BIGINT," +
                    "member9 BIGINT," +
                    "member10 BIGINT);";
            conn.createQuery(sql).executeUpdate();

            sql = "insert into group_info(member1, member2, member3, member4, member5, member6, member7, member8, member9, member10) " +
                    "values (null, null, null, null, null, null, null, null, null, null);";
            conn.createQuery(sql).executeUpdate();

            sql = "CREATE TABLE user_info (" +
                    "user_id BIGSERIAL NOT NULL PRIMARY KEY," +
                    "username VARCHAR(50) NOT NULL," +
                    "pword VARCHAR(50) NOT NULL," +
                    "loc VARCHAR(100)," +
                    "group_id BIGSERIAL REFERENCES group_info(group_id)," +
                    "UNIQUE(username)," +
                    "UNIQUE(pword));";
            conn.createQuery(sql).executeUpdate();

            sql = "INSERT INTO user_info(username, pWord, loc, group_id) VALUES(:username, :pWord, :loc, :group_id);";
            for (User user : samples) {
                conn.createQuery(sql).addParameter("username", user.getUserName())
                        .addParameter("pWord", user.getPword())
                        .addParameter("loc", user.getLoc())
                        .addParameter("group_id", user.getGroup_ID()).executeUpdate();
            }
        }

        userDao = new Sql2oUserDao(sql2o);
    }

    @Test
    @DisplayName("create works for valid input")
    void createUser() {
        User u1 = new User("kpawnsford16", "w6HXK786uN", "3 Leroy Circle", 1);
        User u2 = userDao.create(u1.getUserName(), u1.getPword(), u1.getLoc(), u1.getGroup_ID());
        //Assertions.assertEquals(u1, u2);
    }

    @Test
    void deleteUser() {
        User u1 = userDao.delete("msoallb");
    }

    @Test
    void changeGroupNumber() {
        //User u1 = userDao.updateGroupID("msoallb", 5);
    }

    @Test
    void getListOfUsers() {
        List<User> users = userDao.readAll();
    }

    @Test
    void getSpecificUser() {
        User u1 = userDao.read("msoallb");

    }

}
