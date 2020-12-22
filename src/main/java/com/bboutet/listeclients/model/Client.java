package com.bboutet.listeclients.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "clients")
public class Client {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;

	@Column
	private String lastName;

	@Column
	private String firstName;

	@Column
	private Integer phone;

	@Override
	public String toString() {
		return "Client [ID=	" + id + ", NOM=" + lastName + ", PRENOM=" + firstName + ", TELEPHONE=" + phone +
				 "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getFirstName() {
		return firstName;
	}

	public void getFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Integer getPhone() {
		return phone;
	}

	public void setPhone(Integer phone) {
		this.phone = phone;
	}
}
