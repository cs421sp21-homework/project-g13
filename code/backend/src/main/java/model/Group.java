package model;

import org.eclipse.jetty.websocket.api.Session;

import java.util.ArrayList;
import java.util.List;

public class Group {

    private List<Session> members;

    public Group() {
        members = new ArrayList<>();
    }


    public List<Session> getMembers() {
        return members;
    }

    public void setMembers(List<Session> members) {
        this.members = members;
    }
}
