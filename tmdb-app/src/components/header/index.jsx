import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  return (
    <div className="container">
      <nav>
        <div className="nav-wrapper">
          {/* <a href="#" class="brand-logo">
          TheMovieDB App
        </a> */}
          {userLoggedIn ? (
            <div className="right-align">
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}
                className="waves-effect waves-light btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <ul>
              <li>
                <Link className="text-sm text-blue-600 underline" to={"/login"}>
                  Login
                </Link>
              </li>
              <li>
                <Link className="text-sm text-white-600 underline" to={"/register"}>
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>

    // <nav>
    //   <div className="nav-wrapper">
    //     <a href="" className="brand-logo">
    //       Logo
    //     </a>
    //     <ul id="nav-mobile" className="right hide-on-med-and-down">
    //       <li>
    //         <a href="">sass</a>
    //       </li>
    //       <li>
    //         <a href="">
    //           sass <span className="new badge">4</span>
    //         </a>
    //       </li>
    //       <li>
    //         <a href="">sass</a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>

    // <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>

    //     {
    //         userLoggedIn
    //             ?
    //             <>
    //                 <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
    //             </>
    //             :
    //             <>
    //                 <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
    //                 <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
    //             </>
    //     }

    // </nav>
  );
};

export default Header;
