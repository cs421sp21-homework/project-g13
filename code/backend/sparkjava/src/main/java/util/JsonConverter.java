package util;

import com.google.gson.Gson;
import exceptions.JsonConvertException;

public class JsonConverter {

    private Gson gson;

    public JsonConverter() {
        gson = new Gson();
    }

    public String toJson(Object source) {
        if (source == null) throw new JsonConvertException("Cannot convert from null object.", null);
        String result = gson.toJson(source);
        if (result == null) throw new JsonConvertException("JSON conversion result is null.", null);
        return result;
    }

    public <T> T fromJson(String json, Class<T> classOf) {
        return gson.fromJson(json, classOf);
    }
}
