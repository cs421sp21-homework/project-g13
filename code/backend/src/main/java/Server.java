

import yelp.model.response.BusinessSearchResponse;
import yelp.services.impl.YelpService;
import yelp.model.parameters.BusinessSearchParameters;

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

        BusinessSearchParameters search = new BusinessSearchParameters();
        search.setTerm("food");
        search.setLocation("NYC");

        YelpService query = new YelpService(
                "JFIfCtXa51vEZE94eMQNCCwcZOOTbalEY7ZTP-KD_crZlGXR3Antcdqr9Vdr7xpMLtL5isLGRccvkbhYgQ1rIlHuvGPEtlHPdVedJX6kSXP0W3wK1TTOkXWGjR9BYHYx");
        try{
            BusinessSearchResponse response = query.searchBusiness(search);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
