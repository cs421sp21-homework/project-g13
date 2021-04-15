package server;

import com.google.gson.JsonObject;
import dao.Sql2oUserDao;
import dao.Sql2oGroupDao;
import exceptions.ApiError;
import model.yelp.Restaurant;
import model.User;
import model.Group;
import dao.GroupDao;
import dao.UserDao;
import org.sql2o.Sql2o;
import util.JsonConverter;
import util.YelpService;
import util.StatusMessage;
import util.RouteUser;
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
        return 4568;
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
            throw new ApiError(e.getMessage(), 500);
        }

        //Get restaurants endpoint
        get("/yelpsearch", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Content-Type", "application/json");

            try {
                String query = req.queryParams("query");
                if (query == null) res.status(400);
                int radius, limit, offset;


                try { limit = Integer.parseInt(req.queryParams("limit")); }
                catch(Exception e) { limit = 20; }
                try { radius = Integer.parseInt(req.queryParams("radius")); }
                catch(Exception e) { radius = 40000; }
                try { offset = Integer.parseInt(req.queryParams("offset")); }
                catch(Exception e) { offset = 0; }

                List<Restaurant> resp = YelpService.getRestaurantByLocationWithDetail(query, limit, radius, offset);
                return gson.toJson(resp);
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
            }
        });

        //Get personalized restaurants endpoint
        get("/yelpsearch_personal", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Content-Type", "application/json");

            try {
                String query = req.queryParams("query");
                int radius, limit, offset;
                String price, categories;

                if (query == null) res.status(400);
                try { limit = Integer.parseInt(req.queryParams("limit")); }
                catch(Exception e) { limit = 20; }                    // default to getting 20 restaurants from Yelp
                try { radius = Integer.parseInt(req.queryParams("radius")); }
                catch(Exception e) { radius = 40000; }                // radius in meters thus 40 km
                try { offset = Integer.parseInt(req.queryParams("offset")); }
                catch(Exception e) { offset = 0; }
                try { price = req.queryParams("price");
                    if (price.equals("")) {                          // if no price is entered
                        price = "1,2,3,4";
                    }
                }
                catch(Exception e) { price = "1,2,3,4"; }                 // default to all prices
                try { categories = req.queryParams("categories"); }       // Order matters!
                catch(Exception e) { categories = ""; }                   // default to specific categories

                List<Restaurant> resp = YelpService.getRestaurantsByFiltersWithDetail(query, limit, offset, radius, price, categories);
                return gson.toJson(resp);
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
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
                throw new ApiError(e.getMessage(), 500);
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
                throw new ApiError(e.getMessage(), 500);
            }

        });

        get("/api/users/:uname", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            //res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");

            try {
                String uname = req.params("uname");
                User user = userDao.read(uname);
                return gson.toJson(user);
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
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
                throw new ApiError(e.getMessage(), 500);
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
                throw new ApiError(e.getMessage(), 500);
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
                throw new ApiError(e.getMessage(), 500);
            }

        });

        post("/signup", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");
            RouteUser fetchedUser = gson.fromJson(req.body(), RouteUser.class);
            //String username = req.params("username");
            //String password = req.params("password");
            // implementation kinda depends on "Guest" not being a username
            User newUser = userDao.create(fetchedUser.getUsername(), fetchedUser.getPassword());

            //System.out.println(username);
            return gson.toJson(newUser);
        });

        post("/login", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");

            try {
                RouteUser userCredentials = gson.fromJson(req.body(), RouteUser.class);
                StatusMessage loginMsg = new StatusMessage();
                //User newUser = userDao.create(fetchedUser.getUsername(), fetchedUser.getPassword());

                loginMsg.setMessage("fail");
                User user = userDao.read(userCredentials.getUsername());
                // handle error if not found
                //if (user.getUserName().equals(fetchedUser.getUsername())) {
                    if (user.getPword().equals(userCredentials.getPassword())) {
                        loginMsg.setMessage(user.getUserName()); // just sending the username for succesful login and userStore
                        userDao.login(userCredentials.getUsername());
                    }
                //}

                //String json = "{ \"loginSucess\": \"" + loginSuccess + "\" }";
                //JsonObject convertedObject = new gson().fromJson(json, JsonObject.class);

                return gson.toJson(loginMsg);
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
            }
        });

        post("/logout", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");

            try {
                RouteUser fetchedUser = gson.fromJson(req.body(), RouteUser.class);
                User user = userDao.read(fetchedUser.getUsername());

                if (user.getIsLoggedIn()) {
                    userDao.logout(fetchedUser.getUsername());
                }

                User checkLoggedOut = userDao.read(fetchedUser.getUsername());
                StatusMessage loginStatus = new StatusMessage();
                if (checkLoggedOut.getIsLoggedIn() == false) {
                    loginStatus.setMessage("success");
                } else {
                    loginStatus.setMessage("fail");
                }

                return gson.toJson(loginStatus);
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
            }
        });

        post("/isLoggedIn", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header("Content-Type", "application/json");
            try {
                RouteUser fetchedUser = gson.fromJson(req.body(), RouteUser.class);
                User user = userDao.read(fetchedUser.getUsername());
                boolean loginStatus = user.getIsLoggedIn();
                StatusMessage message = new StatusMessage();
                if (loginStatus) {
                    message.setMessage("true");
                } else {
                    message.setMessage("false");
                }
                //System.out.println(username);
                return gson.toJson(message);
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
            }
        });

        put("/updatePreference", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT");
            res.header("Content-Type", "application/json");
            try {
                // ensure that JSON body has preferences field set to array of strings!
                RouteUser fetchedUser = gson.fromJson(req.body(), RouteUser.class);
                User user = userDao.read(fetchedUser.getUsername());

                // clean out preferences before adding new ones
                List<String> oldPrefs = user.getPreferencesList();
                for (String pref : oldPrefs) {

                    userDao.removePreference(user, pref);

                }

                // actually adding the new ones
                List<String> newPrefs = fetchedUser.getPreferencesList();
                for (String pref : newPrefs) {

                    userDao.addPreference(user, pref);

                }

                User userNewPrefs = userDao.read(fetchedUser.getUsername());
                return gson.toJson(userNewPrefs); // should have updated preferences
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
            }
        });

        put("/removePreference", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT");
            res.header("Content-Type", "application/json");
            try {
                // ensure that JSON body has preferences field set to array of strings!
                RouteUser fetchedUser = gson.fromJson(req.body(), RouteUser.class);
                User user = userDao.read(fetchedUser.getUsername());

                for (String pref : fetchedUser.getPreferencesList()) {

                    userDao.removePreference(user, pref);

                }

                User userNewPrefs = userDao.read(fetchedUser.getUsername());
                return gson.toJson(userNewPrefs); // should have updated preferences
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
            }
        });

        delete("/api/users/:uname", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "DELETE");
            res.header("Content-Type", "application/json");
            try {
                String uname = req.params("uname");
                User user = userDao.delete(uname);
                return gson.toJson(user);
            } catch (Exception e) {
                throw new ApiError(e.getMessage(), 500);
            }
        });

        options("/*", (req, res)-> {
            System.out.println(req.headers());
            res.header("Access-Control-Allow-Origin", "*");
            return "OK";
        });

        exception(ApiError.class, (exception, request, response) -> {
            printErrorOccurredInPath(request.pathInfo(), exception);
            response.status(exception.getStatus());
        });
    }

    /**
     * Prints an error message for an exception to standard output along with the path name.
     * Useful for logging errors.
     * @param path the endpoint where the exception occurred
     * @param e the exception that occurred
     */
    private static void printErrorOccurredInPath(String path, Exception e) {
        System.out.print("An exception occurred in path: ");
        System.out.println(path);
        System.out.print("Exception message: ");
        System.out.println(e.getMessage());
    }
}
