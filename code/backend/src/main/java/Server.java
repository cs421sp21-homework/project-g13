

import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;
import spark.ModelAndView;
import spark.template.handlebars.HandlebarsTemplateEngine;
import yelp.model.request.BusinessSearch;
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

        port(getHerokuAssignedPort());
        staticFiles.location("/public");

        get("/search", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            String query = req.queryParams("query");
            BusinessSearchParameters search1 = new BusinessSearchParameters();
            search1.setTerm("food");
            search1.setLocation(query);
            List<BusinessSearch> businesses = searchYelpV3(search1)
                    .getBusinesses();
            res.type("application/json");
            String json = "";
            for (BusinessSearch biz : businesses) {
                json += "{" +
                        "\"restaurant_name\":\"" + biz.getName() + "\"," +
                        "\"price_range\":\"" + biz.getPrice() + "\"," +
                        "\"cuisine\":\"" + biz.getCategories().get(0).getTitle() + "\"," +
                        "\"backgroundImage\":\"" + biz.getImage_url() + "\"," +
                        "\"location\":\"" + biz.getLocation().getAddress1() + "\"" +
                        "},";
            }
            json = "{\"restaurants\":[" + json.substring(0, json.length() - 1) + "]}";
            return json;
            });
    }
}
