import React, {Component} from "react";
import {NavLink} from "react-router-dom";

// import Helpers from "../../service/Helpers";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.id
    };
  }

  render() {
    return (
      <div className="ban-top">
        <div className="container">
        <div className="top_nav_left">
          <nav className="navbar navbar-default">


              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav menu__list">
                  <li className="active menu__item menu__item--current">
                    <NavLink className="menu__link" to="/">Home
                      <span className="sr-only">(current)</span></NavLink>
                  </li>

                </ul>
              </div>

          </nav>
        </div>
        <div className="top_nav_right">
          <div className="wthreecartaits wthreecartaits2 cart cart box_1">
              {this.props.cartCount ?
              <span className="numberCircle">{this.props.cartCount}</span> : ""
              }
            <NavLink to="/cart" className="last">
              <input type="hidden" name="cmd" defaultValue="_cart"/>
              <input type="hidden" name="display" defaultValue={1}/>
              {/*<span className="numberCircle">{this.props.cartCount}</span>*/}
              <button className="w3view-cart" type="submit" name="submit" value>
                <i className="fa fa-cart-arrow-down" aria-hidden="true"/></button>
            </NavLink>
          </div>
        </div>
        </div>
        <div className="clearfix"/>
      </div>
    );
  }
}


export default Header;