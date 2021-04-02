import dao.Sql2oGroupDao;
import dao.GroupDao;
import dao.Sql2oUserDao;
import dao.UserDao;
import exceptions.DaoException;

import model.User;
import model.Group;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;

public class Sql2oGroupDaoTest {

    private static Sql2o sql2o;
    private static List<User> samples;
    private GroupDao groupDao;
    private UserDao userDao;

    @BeforeAll
    static void connectToDatabase() throws URISyntaxException {
        // using test database (in backend app)
        URI dbUri = new URI("postgres://gsyqpyihtezhlv:bd02af53d56a03f3776f24d1e445983c396c5168abf5074343f70f0cf51f7bbc@ec2-52-45-73-150.compute-1.amazonaws.com:5432/def52afl6sjeue");

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
        // instantiate the groupDao object as a dao.Sql2oGroupDao
        try (Connection conn = sql2o.open()) {
            conn.createQuery("DROP TABLE IF EXISTS user_info;").executeUpdate();
            conn.createQuery("DROP TABLE IF EXISTS group_info;").executeUpdate();

            /* String sql = "CREATE TABLE group_info (" +
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

             */
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

        groupDao = new Sql2oGroupDao(sql2o);
        userDao = new Sql2oUserDao(sql2o);
    }

    @Test
    @DisplayName("create works for valid input")
    void createGroup() {

        Group g1 = groupDao.createGroup();

        assertEquals(g1.getGroup_id(), 2);

        List<User> users = groupDao.readMembers(2);
        assertTrue(g1.getMembers().isEmpty());
    }

    @Test
    @DisplayName("users can be added to group")
    void addUserToGroup() {
        Group g1 = groupDao.createGroup();
        User u1 = userDao.read("kfeatherstonef");
        groupDao.addMember(g1, u1);

        assertEquals(u1.getGroup_ID(), g1.getGroup_id());
        assertEquals(g1.getMembers().size(), 1);

        User addedUser = g1.getMembers().get(0);
        assertEquals(addedUser.getUserName(), "kfeatherstonef");

        List<User> groupMembers = groupDao.readMembers(g1.getGroup_id());

    }

    @Test
    @DisplayName("users can be removed")
    void removeUserFromGroup() {
        Group g1 = groupDao.createGroup();
        User u1 = userDao.read("kfeatherstonef");
        User u2 = userDao.read("beastbrookd");
        groupDao.addMember(g1, u1);
        groupDao.addMember(g1, u2);

        groupDao.removeMember(g1, u2);
        assertEquals(g1.getMembers().size(), 1);
        assertEquals(g1.getMembers().indexOf(u2), -1);

    }

    @Test
    @DisplayName("remove works for valid input")
    void deleteGroup() {
        Group g1 = groupDao.createGroup();
        User u1 = userDao.read("kfeatherstonef");
        User u2 = userDao.read("beastbrookd");
        groupDao.addMember(g1, u1);
        groupDao.addMember(g1, u2);

        groupDao.deleteGroup(g1);

        assertEquals(g1.getMembers().size(), 0);

        // users should have group ID of 1 (solo)
        // not removed from user table so still in database
        assertEquals(u1.getGroup_ID(), 1);
        assertEquals(u2.getGroup_ID(), 1);

    }

    /*
    @Test
    @DisplayName("read all groups from table")
    void readAllGroups() {
        Group g1 = groupDao.createGroup();
        User u1 = userDao.read("kfeatherstonef");
        User u2 = userDao.read("beastbrookd");
        groupDao.addMember(g1, u1);
        groupDao.addMember(g1, u2);

        List<Group> groups = groupDao.readAllGroups();
        assertEquals(groups.size(), 1);

        Group groupOne = groups.get(0);
        List<User> groupOneMembers = groups.get(0).getMembers();
        assertEquals(groupOne.getMembers().size(), 2);

        int userOneIndex = groupOneMembers.indexOf(u1);
        int userTwoIndex = groupOneMembers.indexOf(u2);
        assertEquals(groupOneMembers.get(userOneIndex), u1);
        assertEquals(groupOneMembers.get(userTwoIndex), u2);

    }
    */



}
