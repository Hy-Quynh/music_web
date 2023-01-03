import React from "react";

export default function ClientLayout(props) {
  return (
    <>
      <header className="header-area">
        {/* Navbar Area */}
        <div className="oneMusic-main-menu">
          <div className="classy-nav-container breakpoint-off">
            <div className="container">
              {/* Menu */}
              <nav
                className="classy-navbar justify-content-between"
                id="oneMusicNav"
              >
                {/* Nav brand */}
                <a href="index.html" className="nav-brand">
                  <img src="img/core-img/logo.png" alt="" />
                </a>
                {/* Navbar Toggler */}
                <div className="classy-navbar-toggler">
                  <span className="navbarToggler">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
                {/* Menu */}
                <div className="classy-menu">
                  {/* Close Button */}
                  <div className="classycloseIcon">
                    <div className="cross-wrap">
                      <span className="top" />
                      <span className="bottom" />
                    </div>
                  </div>
                  {/* Nav Start */}
                  <div className="classynav">
                    <ul>
                      <li>
                        <a href="index.html">Home</a>
                      </li>
                      <li>
                        <a href="albums-store.html">Albums</a>
                      </li>
                      <li>
                        <a href="#">Pages</a>
                        <ul className="dropdown">
                          <li>
                            <a href="index.html">Home</a>
                          </li>
                          <li>
                            <a href="albums-store.html">Albums</a>
                          </li>
                          <li>
                            <a href="event.html">Events</a>
                          </li>
                          <li>
                            <a href="blog.html">News</a>
                          </li>
                          <li>
                            <a href="contact.html">Contact</a>
                          </li>
                          <li>
                            <a href="elements.html">Elements</a>
                          </li>
                          <li>
                            <a href="/login">Login</a>
                          </li>
                          <li>
                            <a href="#">Dropdown</a>
                            <ul className="dropdown">
                              <li>
                                <a href="#">Even Dropdown</a>
                              </li>
                              <li>
                                <a href="#">Even Dropdown</a>
                              </li>
                              <li>
                                <a href="#">Even Dropdown</a>
                              </li>
                              <li>
                                <a href="#">Even Dropdown</a>
                                <ul className="dropdown">
                                  <li>
                                    <a href="#">Deeply Dropdown</a>
                                  </li>
                                  <li>
                                    <a href="#">Deeply Dropdown</a>
                                  </li>
                                  <li>
                                    <a href="#">Deeply Dropdown</a>
                                  </li>
                                  <li>
                                    <a href="#">Deeply Dropdown</a>
                                  </li>
                                  <li>
                                    <a href="#">Deeply Dropdown</a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a href="#">Even Dropdown</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="event.html">Events</a>
                      </li>
                      <li>
                        <a href="blog.html">News</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact</a>
                      </li>
                    </ul>

                    <div className="login-register-cart-button d-flex align-items-center">
                      <div className="login-register-btn mr-50">
                        <a href="/login" id="loginBtn">
                          Login / Register
                        </a>
                      </div>
                      {/* Cart Button */}
                      <div className="cart-btn">
                        <p>
                          <span className="icon-shopping-cart" />{" "}
                          <span className="quantity">1</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Nav End */}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {props.children}
      <footer className="footer-area">
        <div className="container">
          <div className="row d-flex flex-wrap align-items-center">
            <div className="col-12 col-md-6">
              <a href="#">
                <img src="img/core-img/logo.png" alt="" />
              </a>
              <p className="copywrite-text">
                <a href="#">
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with{" "}
                  <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
                </a>
                <a href="https://colorlib.com" target="_blank">
                  Colorlib
                </a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <div className="footer-nav">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Albums</a>
                  </li>
                  <li>
                    <a href="#">Events</a>
                  </li>
                  <li>
                    <a href="#">News</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
