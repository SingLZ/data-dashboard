import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => (
    <>
    <div className="sideNav">
    <h1>Brewery List</h1>
    <h2><Link to="/">Dashboard</Link></h2> {/* Link to Home/Dashboard */}
      <h2><Link to="/">Search</Link></h2> {/* Example link to Search */}
      <h2><Link to="/">About</Link></h2> {/* Example link to About */}
  </div>
  </>
);

export default SideNav;
