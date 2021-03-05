import spark.ModelAndView;
import spark.template.handlebars.HandlebarsTemplateEngine;

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

        get("/hello-world-onlybackend", (req, res) -> "Hello World!");

        get("/hello-world-frontandbackend", (req, res) -> {
            return new ModelAndView(null, "helloWorld.hbs");
        }, new HandlebarsTemplateEngine());

    }
}