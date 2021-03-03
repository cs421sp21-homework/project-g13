
import static spark.Spark.*;

public class Server {
    public static void main(String[] args) {
        port(getHerokuAssignedPort());

        // root is 'src/main/resources', so put files in 'src/main/resources/public'
        staticFiles.location("/public"); // Static files

        get("/", (req, res) -> {

            res.redirect("index.html");
            return null;
        });
    }

    private static int getHerokuAssignedPort() {
        // Heroku stores port number as an environment variable
        String herokuPort = System.getenv("PORT");
        if (herokuPort != null) {
            return Integer.parseInt(herokuPort);
        }
        //return default port if heroku-port isn't set (i.e. on localhost)
        return 4567;
    }
}
