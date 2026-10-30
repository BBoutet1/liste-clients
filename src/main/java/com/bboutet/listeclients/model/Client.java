package com.bboutet.listeclients.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "clients")
public class Client {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;

	@Column(nullable = false, length = 30)
	private String lastname;

	@Column(length = 30)
	private String firstname;

	@Column(length = 10)
	private String phone;

	public Client() {

	}

	public Client(String lastname, String firstname, String phone) {
		this.lastname = lastname;
		this.firstname = firstname;
		this.phone = phone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "Client [ID=	" + id + ", NOM=" + lastname + ", PRENOM=" + firstname + ", TELEPHONE=" + phone +
				 "]";
	}
}
