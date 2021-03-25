package util;

import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

public class Database {

    public static void main(String[] args) throws URISyntaxException {

        Sql2o sql20 = getSql2o();
    }

    /**
     * Create and return a Sql2o object connected to the database pointed to by the DATABASE_URL.
     *
     * @return a Sql2o object connected to the database to be used in this application.
     * @throws URISyntaxException Checked exception thrown to indicate the provided database URL cannot be parsed as a
     *     URI reference.
     * @throws Sql2oException an generic exception thrown by Sql2o encapsulating anny issues with the Sql2o ORM.
     */
    public static Sql2o getSql2o() throws URISyntaxException, Sql2oException {

        String DATABASE_URL = "postgres://cyjnmjdqsxpfky:1dc851cad799f5fb5a8cae9f2f9495e061adda1fd24b0c388bf771bb96a12ea1@ec2-52-71-161-140.compute-1.amazonaws.com:5432/d400u7n1i19g77";
        String databaseUrl = DATABASE_URL;
        if (databaseUrl == null) {
            throw new URISyntaxException(databaseUrl, "DATABASE_URL is not set");
        }

        URI dbUri = new URI(databaseUrl);

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
                + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

        return new Sql2o(dbUrl, username, password);

    }

    /* private static Connection getConnection() throws URISyntaxException, SQLException {
        String DATABASE_URL = "postgres://cyjnmjdqsxpfky:1dc851cad799f5fb5a8cae9f2f9495e061adda1fd24b0c388bf771bb96a12ea1@ec2-52-71-161-140.compute-1.amazonaws.com:5432/d400u7n1i19g77";
        String databaseUrl = DATABASE_URL;
        if (databaseUrl == null) {
            throw new URISyntaxException(databaseUrl, "DATABASE_URL is not set");
        }

        URI dbUri = new URI(databaseUrl);

        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
                + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

        return DriverManager.getConnection(dbUrl, username, password);
    } */

}
