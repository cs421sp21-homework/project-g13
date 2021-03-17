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

        Gson gson = new Gson();

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

            if (query == null) res.status(404);
            try { limit = Integer.parseInt(req.queryParams("limit")); }
            catch(Exception e) { limit = 20; }
            try { radius = Integer.parseInt(req.queryParams("radius")); }
            catch(Exception e) { radius = 40000; }

            List<Restaurant> resp = YelpService.getRestaurantByLocationWithDetail(query, limit, radius);
            if (resp == null) res.status(404);
            return gson.toJson(resp);
        });

        get("/api/users", (req, res) -> {
            List<User> users = userDao.readAll();
            res.header("Content-Type", "application/json");
            return gson.toJson(users);
        });

        get("/api/groups", (req, res) -> {
            List<Group> groups = groupDao.readAllGroups();
            res.header("Content-Type", "application/json");
            return gson.toJson(groups);
        });

        get("/api/users/:uname", (req, res) -> {
            String uname = req.params("uname");
            User user = userDao.read(uname);
            res.header("Content-Type", "application/json");
            return gson.toJson(user);
        });

        get("/api/groups/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            List<User> users = userDao.readAllInGroup(id);
            res.header("Content-Type", "application/json");
            return gson.toJson(users);
        });

        post("/api/users", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);
            userDao.create(user.getUserName(), user.getPword(), user.getLoc(), user.getGroup_ID());
            res.header("Content-Type", "application/json");
            return gson.toJson(user);
        });

        post("/api/groups", (req, res) -> {
            Group group = groupDao.createGroup();
            res.header("Content-Type", "application/json");
            return gson.toJson(group);
        });

        delete("/api/users/:uname", (req, res) -> {
            String uname = req.params("uname");
            User user = userDao.delete(uname);
            res.header("Content-Type", "application/json");
            return gson.toJson(user);
        });

    }
}
