

import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;
import spark.ModelAndView;
import spark.template.handlebars.HandlebarsTemplateEngine;
import yelp.model.response.BusinessSearchResponse;
import yelp.services.impl.YelpService;
import yelp.model.parameters.BusinessSearchParameters;

import java.util.ArrayList;
import java.util.List;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

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

    private static BusinessSearchResponse searchYelpV3(BusinessSearchParameters search) {

        try{
            YelpService query = new YelpService(
                    "JFIfCtXa51vEZE94eMQNCCwcZOOTbalEY7ZTP-KD_crZlGXR3Antcdqr9Vdr7xpMLtL5isLGRccvkbhYgQ1rIlHuvGPEtlHPdVedJX6kSXP0W3wK1TTOkXWGjR9BYHYx");

            List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
            MappingJacksonHttpMessageConverter map = new MappingJacksonHttpMessageConverter();
            messageConverters.add(map);
            query.getRestTemplate().setMessageConverters(messageConverters);

            return query.searchBusiness(search);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {

        BusinessSearchParameters search1 = new BusinessSearchParameters();
        search1.setTerm("food");
        search1.setLocation("NYC");

        BusinessSearchResponse apiRes = searchYelpV3(search1);

        port(getHerokuAssignedPort());
        staticFiles.location("/public");

        get("/hello-world-onlybackend", (req, res) -> "Hello World!" + apiRes.getBusinesses());

        get("/hello-world-frontandbackend", (req, res) -> {
            return new ModelAndView(null, "helloWorld.hbs");
        }, new HandlebarsTemplateEngine());
    }
}
