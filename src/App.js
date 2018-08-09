import React, {Component} from 'react';
import './App.css';
import Header from "./Component/Header/Header";
import Cart from "./pages/Cart/cart";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Helpers from "./service/Helpers";
import asyncComponent from './service/AsyncComponent'

const Home = asyncComponent(() => import('./pages/Home/Home').then(module => module.default));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    }
  }

  componentDidMount() {
    const cartData = Helpers.getLocalStorageData('cartData');
    const cartCount = cartData && cartData.length ? cartData.length : 0;
    this.setState({cartCount: cartCount});
  }

  render() {
    let that = this;
    return (
      <BrowserRouter>
        <div>
          <Header cartCount={that.state.cartCount}/>
          <Switch>
            <Route exact path="/" render={() => <Home totalCnt={(cartCount) => {
              that.setState({cartCount: cartCount})
            }}/>}/>
            <Route path="/cart" render={() => <Cart totalCnt={(cartCount) => {
              that.setState({cartCount: cartCount})
            }}/>}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;