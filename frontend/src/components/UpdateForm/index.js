import React from "react";

export default function UnpdateForm(props) {

    return (
        <>
            <td>{props.id}</td>
            <td>
               <form className="search input-group mt-1 mr-2 d-inline">
                    <div className="input-group">
                        <input
                            value={props.search}
                            name="search"
                            onChange={props.handleInputChange}
                            id="lastnameU"
                            type="text" className="form-control" defaultValue={props.lastname}
                        />
                    </div>
                </form>
            </td>
            <td>
                <form className="search input-group mt-1 mr-2 d-inline">
                    <div className="input-group">
                        <input
                            value={props.search}
                            name="search"
                            onChange={props.handleInputChange}
                            id="firstnameU"
                            type="text" className="form-control" defaultValue={props.firstname}
                        />
                    </div>
                </form>
            </td>
            <td>
                <form className="search input-group mt-1 mr-2 d-inline">
                    <div className="input-group">
                        <input
                            value={props.search}
                            name="search"
                            onChange={props.handleInputChange}
                            id="phoneU"
                            type="text" className="form-control" defaultValue={props.phone}
                        />
                    </div>
                </form>
            </td>
            <td><i className="fa fa-save"/></td>
            <td><i  className="fa fa-close"/></td>
        </>
    )
}