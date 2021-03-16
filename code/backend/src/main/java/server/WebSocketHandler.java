package server;

import model.Group;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;
import java.util.*;

@WebSocket
public class WebSocketHandler {

    //Stores all sessions
    private List<Session> sessions;

    private HashMap<Integer, Group> groups;

    public WebSocketHandler() {
        sessions = new ArrayList<>();
        groups = new HashMap<>();
        groups.put(1, new Group());
    }


    @OnWebSocketConnect
    public void connected(Session session) {
        sessions.add(session);
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason) {
        sessions.remove(session);
    }

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        String[] pieces = message.split("-");
        if (pieces[0].equals("1")) {
            //join group
            int groupId = Integer.parseInt(pieces[1]);
            joinGroup(session, groupId);
            session.getRemote().sendString("success");
        } else if (pieces[0].equals("2")) {
            //message to group
            int groupId = Integer.parseInt(pieces[1]);
            Group g = groups.get(groupId);
            for (Session member: g.getMembers()) {
                member.getRemote().sendString(pieces[2]);
            }
        }
    }

    private void joinGroup(Session session, int id) {
        Group g = groups.get(id);
        if (g != null) {
            g.getMembers().add(session);
        }
    }
}
