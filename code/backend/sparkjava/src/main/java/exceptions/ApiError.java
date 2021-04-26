package exceptions;

//import org.apache.http.HttpException;

//import java.io.IOException;

/**
 * A generic error for errors in the API endpoints.
 */
public class ApiError extends IllegalArgumentException {

    //HTTP status code
    private final int status;

    // message passed in
    private String message;

    /**
     * Constructs an ApiError
     * @param message error message
     * @param status HTTP status code to return to the client
     */
    public ApiError(String message, int status) {
        super(message);
        this.message = message;
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return this.message;
    }
}
