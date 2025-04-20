import { Link, NavLink } from 'react-router-dom';

   function Navbar() {
     return (
       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
         <div className="container-fluid">
           <Link className="navbar-brand" to="/">nuveyon</Link>
           <button
             className="navbar-toggler"
             type="button"
             data-bs-toggle="collapse"
             data-bs-target="#navbarNav"
             aria-controls="navbarNav"
             aria-expanded="false"
             aria-label="Toggle navigation"
           >
             <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="navbarNav">
             <ul className="navbar-nav ms-auto">
               <li className="nav-item">
                 <NavLink className="nav-link" activeClassName="active" to="/" exact>Home</NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="nav-link" activeClassName="active" to="/profile">Profile</NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="nav-link" activeClassName="active" to="/contracts">Contracts</NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="nav-link" activeClassName="active" to="/notifications">Notifications</NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="nav-link" activeClassName="active" to="/promote">Promote</NavLink>
               </li>
             </ul>
           </div>
         </div>
       </nav>
     );
   }

   export default Navbar;