import React from 'react'
import "./Header.css"
import fdb from "./assets/Fauna_Logo_blue.png"
import server from "./assets/server.png"
import crud from "./assets/CRUD.png"

function Header() {
    return (
        <div className="header">
            <img src={server} alt="" style={{ height: "60px", }} />


            <img src={crud} alt="" className="header-img" />
            <h2>With</h2>
            <img src={fdb} alt="FaunaDB Logo" className="header-img" />
        </div>
    )
}

export default Header
