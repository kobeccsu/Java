package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the shop database table.
 * 
 */
@Entity
@NamedQuery(name="Shop.findAll", query="SELECT s FROM Shop s")
public class Shop implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="is_closed")
	private byte isClosed;

	private String name;

	private String theme;

	public Shop() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getIsClosed() {
		return this.isClosed;
	}

	public void setIsClosed(byte isClosed) {
		this.isClosed = isClosed;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTheme() {
		return this.theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

}