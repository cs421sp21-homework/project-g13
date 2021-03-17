package model;

import java.util.List;
//import model.User;

public class Group {

    private int group_id;
    private String name;
    private List<User> members;

    public Group(int group_id) {
        this.group_id = group_id;
    }

    public Group() {
        this.group_id = 0;
        this.name = null;
        this.members = null;
    }

    /**
     * Set the group's group_id.
     *
     * @param group_id The group's group_id.
     */
    public void setGroup_id(int group_id) {
        this.group_id = group_id;
    }

    /**
     * Get group's group_id.
     *
     * @return the group's group_id.
     */
    public int getGroup_id() { return this.group_id; }

    /**
     * Set the group's name.
     *
     * @param name The group's name.
     */
    public void SetName(String name) {
        this.name = name;
    }

    /**
     * Get group's name.
     *
     * @return the group's name.
     */
    public String getName() { return this.name; }

    /**
     * Set the group's members.
     *
     * @param members The group's memebers.
     */
    public void setMembers(List<User> members) {
        this.members = members;
    }

    /**
     * Get group's group_id.
     *
     * @return the group's group_id.
     */
    public List<User> getMembers() { return this.members; }

}
