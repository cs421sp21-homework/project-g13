package exceptions;


/**
 * An exception for errors that occur during conversion between JSON and POJOs
 */
public class JsonConvertException extends RuntimeException {

    /**
     * Constructs a new exceptions.JsonConvertException.
     *
     * @param message the detail message (which is saved for later retrieval by the getMessage() method).
     * @param cause the cause (which is saved for later retrieval by the getCause() method).
     */
    public JsonConvertException(String message, Throwable cause) { super(message, cause); }
}
