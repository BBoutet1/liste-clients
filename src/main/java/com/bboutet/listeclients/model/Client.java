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
	private String lastname;

	@Column
	private String firstname;

	@Column
	private Double phone;

	@Override
	public String toString() {
		return "Client [ID=	" + id + ", NOM=" + lastname + ", PRENOM=" + firstname + ", TELEPHONE=" + phone +
				 "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

    public String getLastname() {
        return lastname;
    }
    
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    
    public String getFirstname() {
		return firstname;
	}

	public void getFirstname(String firstname) {
		this.firstname = firstname;
	}

	public Double getPhone() {
		return phone;
	}

	public void setPhone(Double phone) {
		this.phone = phone;
	}
}
