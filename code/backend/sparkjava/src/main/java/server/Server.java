package server;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dao.Sql2oUserDao;
import dao.Sql2oGroupDao;
import model.yelp.Restaurant;
import model.User;
import model.Group;
import dao.GroupDao;
import dao.UserDao;
import org.sql2o.Sql2o;
import util.JsonConverter;
import util.YelpService;
import util.Database;

import java.net.URISyntaxException;
import java.util.List;

import static spark.Spark.*;
import static util.Database.getSql2o;

public class Server {

    private static int getHerokuAssignedPort() {
        // Heroku stores port number as an environment variable
        String herokuPort = System.getenv("PORT");
        if (herokuPort != null) {
            return Integer.parseInt(herokuPort);
        }
        //return default port if heroku-port isn't set (i.e. on localhost)
        return 4567;
    }

    private static UserDao getUserDao() throws Exception {
        try {
            Sql2o sql2o = getSql2o();
            return new Sql2oUserDao(sql2o);
        } catch(URISyntaxException e) {
            throw new Exception();
        }
    }

    private static GroupDao getGroupDao() throws Exception {
        try {
            Sql2o sql2o = getSql2o();
            return new Sql2oGroupDao(sql2o);
        } catch(URISyntaxException e) {
            throw new Exception();
        }
    }

    public static void main(String[] args) {

        port(getHerokuAssignedPort());
        staticFiles.location("/public");

        //Set Yelp API key
        YelpService.setKey("JFIfCtXa51vEZE94eMQNCCwcZOOTbalEY7ZTP-KD_crZlGXR3Antcdqr9Vdr7xpMLtL5isLGRccvkbhYgQ1rIlHuvGPEtlHPdVedJX6kSXP0W3wK1TTOkXWGjR9BYHYx");

        JsonConverter gson = new JsonConverter();

        UserDao userDao;
        GroupDao groupDao;

        try {
            userDao = getUserDao();
            groupDao = getGroupDao();
        } catch(Exception e) {
            return;
        }

        //Get restaurants endpoint
        get("/yelpsearch", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Content-Type", "application/json");
            String query = req.queryParams("query");
            int radius, limit;

            if (query == null) res.status(400);
            try { limit = Integer.parseInt(req.queryParams("limit")); }
            catch(Exception e) { limit = 20; }
            try { radius = Integer.parseInt(req.queryParams("radius")); }
            catch(Exception e) { radius = 40000; }

            try {
                List<Restaurant> resp = YelpService.getRestaurantByLocationWithDetail(query, limit, radius);
                return gson.toJson(resp);
            } catch (Exception e) {
                res.status(500);
                return null;
            }

        });

        //Get personalized restaurants endpoint
        get("/yelpsearch_personal", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Content-Type", "application/json");
            String query = req.queryParams("query");
            int radius, limit;
            String price, categories;

            if (query == null) res.status(400);
            try { limit = Integer.parseInt(req.queryParams("limit")); }
            catch(Exception e) { limit = 20; }                    // default to getting 20 restaurants from Yelp
            try { radius = Integer.parseInt(req.queryParams("radius")); }
            catch(Exception e) { radius = 40000; }                // radius in meters thus 40 km
            try { price = req.queryParams("price");
                if (price.equals("")) {                          // if no price is entered
                    price = "1,2,3,4";
                }
            }
            catch(Exception e) { price = "1,2,3,4"; }                 // default to all prices
            try { categories = req.queryParams("categories"); }       // Order matters!
            catch(Exception e) { categories = ""; }                   // default to specific categories

            try {
                List<Restaurant> resp = YelpService.getRestaurantsByFiltersWithDetail(query, limit, radius, price, categories);
                return gson.toJson(resp);
            } catch (Exception e) {
                res.status(500);
                return null;
            }


        });

        get("/api/users", (req, res) -> {
            System.out.println(1);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");

            try {
                List<User> users = userDao.readAll();
                return gson.toJson(users);
            } catch (Exception e) {
                res.status(500);
                return null;
            }

        });

        get("/api/groups", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");

            try {
                List<Group> groups = groupDao.readAllGroups();
                return gson.toJson(groups);
            } catch (Exception e) {
                res.status(500);
            }

        });

        get("/api/users/:uname", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");

            try {
                String uname = req.params("uname");
                User user = userDao.read(uname);
                return gson.toJson(user);
            } catch (Exception e) {

            }
        });


        get("/api/groups/:id", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Content-Type", "application/json");

            try {
                int id = Integer.parseInt(req.params("id"));
                List<User> users = userDao.readAllInGroup(id);
                return gson.toJson(users);
            } catch (Exception e) {

            }
        });

        post("/api/users", (req, res) -> {
            System.out.println(req.headers());
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Content-Type", "application/json");

            try {
                User user = gson.fromJson(req.body(), User.class);
                userDao.create(user.getUserName(), user.getPword(), user.getLoc(), user.getGroup_ID());
                return gson.toJson(user);
            } catch (Exception e) {

            }
        });

        post("/api/groups", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");

            try {
                Group group = groupDao.createGroup();
                return gson.toJson(group);
            } catch (Exception e) {

            }

        });

        post("/login", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");

            try {
                String username = req.params("username");
                String password = req.params("password");
                System.out.println(username);
                return "Need some return statement";
            } catch (Exception e) {

            }
        });

        post("/logout", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");
            String username = req.params("username");
            String password = req.params("password");
            System.out.println(username);
            return "Need some return statement";
        });

        post("/isLoggedIn", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");
            String username = req.params("username");
            String password = req.params("password");
            System.out.println(username);
            return "Need some return statement";
        });

        delete("/api/users/:uname", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "DELETE");
            res.header("Content-Type", "application/json");
            String uname = req.params("uname");
            User user = userDao.delete(uname);
            return gson.toJson(user);
        });

        options("/*", (req, res)-> {
            System.out.println(req.headers());
            res.header("Access-Control-Allow-Origin", "*");
            return "OK";
        });
    }
}
