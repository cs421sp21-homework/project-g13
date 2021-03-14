package server;

import com.google.gson.Gson;
import model.yelp.Restaurant;
import util.YelpService;

import java.util.List;

import static spark.Spark.*;

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

    public static void main(String[] args) {

        port(getHerokuAssignedPort());
        staticFiles.location("/public");

        //Set Yelp API key
        YelpService.setKey("JFIfCtXa51vEZE94eMQNCCwcZOOTbalEY7ZTP-KD_crZlGXR3Antcdqr9Vdr7xpMLtL5isLGRccvkbhYgQ1rIlHuvGPEtlHPdVedJX6kSXP0W3wK1TTOkXWGjR9BYHYx");

        //Get restaurants endpoint
        get("/search", (req, res) -> {
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
            Gson gson = new Gson();
            return gson.toJson(resp);
        });
    }
}
