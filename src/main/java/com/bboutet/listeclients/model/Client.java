package com.bboutet.listeclients.model;
import javax.persistence.*;

@Entity
@Table(name = "clients")
public class Client {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;

	@Column
	private String lastname;

	@Column
	private String firstname;

	@Column
	private Double phone;

	public Client() {

	}

	public Client(String lastname, String firstname, Double phone) {
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

	public void getFirstname(String firstname) {
		this.firstname = firstname;
	}

	public Double getPhone() {
		return phone;
	}

	public void setPhone(Double phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "Client [ID=	" + id + ", NOM=" + lastname + ", PRENOM=" + firstname + ", TELEPHONE=" + phone +
				 "]";
	}
}
