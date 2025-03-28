import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="/assets/Bootstrap_logo.svg.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2"/>
                            Bootstrap
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
