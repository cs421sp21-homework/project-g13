package exceptions;

/**
 * A generic error for errors in the API endpoints.
 */
public class ApiError extends RuntimeException {

    //HTTP status code
    private int status;

    /**
     * Constructs an ApiError
     * @param message error message
     * @param status HTTP status code to return to the client
     */
    public ApiError(String message, int status) { super(message);}

    public int getStatus() {
        return status;
    }
}
