import React from 'react';
import '../Cart/cart.css';
import _ from 'underscore';
import {If, Then, ElseIf} from 'react-if-elseif-else-render';
import plus from '../../assets/images/plus.svg';
import minus from '../../assets/images/minus.svg';
import Helper from "../../service/Helpers";
import shoppinfCart from "../../assets/images/shopping_cart.png";

class cart extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      data: Helper.getLocalStorageData('cartData') ? Helper.getLocalStorageData('cartData') : [],
      sub_total: 0
    };
  }

  addPlus(data) {
    const cartData = this.state.data;
    const findManData = _.findWhere(cartData, {id: data.id});

    if (findManData) {
      for (let i = 0; i < cartData.length; i++) {
        if (data.id === cartData[i].id) {
          cartData[i].qty += 1;
          this.setState({sub_total:(this.state.sub_total + cartData[i].price)})
          break;
        }
      }
      this.setState({data: cartData});
      Helper.setLocalStorageData('cartData', cartData);
    }
  }

  addMinus(data) {
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    const findManData = _.findWhere(cartData, {id: data.id});

    if (findManData) {
      for (let i = 0; i < cartData.length; i++) {
        if (data.id === cartData[i].id) {
          if (cartData[i].qty > 1) {
            cartData[i].qty -= 1;
            this.setState({sub_total:(this.state.sub_total - cartData[i].price)})
            break;
          }
        }
      }
      this.setState({data: cartData});
      Helper.setLocalStorageData('cartData', cartData);
    }
  }

  updateClose(key) {
    let array = this.state.data;
    array.splice(key, 1);
    this.setState({data: array});
    this.props.totalCnt(array.length);
    Helper.setLocalStorageData('cartData', array);
    this.componentDidMount();
  }

  componentDidMount(){
      let subtotal = 0;
      this.state.data.map((value)=>
          subtotal += (value.qty * value.price)
      );
      this.setState({sub_total: subtotal});
  }

  render() {
    return (
      <div className="shopping-cart">
        <div className="title">
          Shopping Cart
        </div>
        <If condition={this.state.data.length}>
          <Then>
            {this.state.data.map((value, key) =>
              <div className="item" key={key}>
                <div className="buttons close-btn" onClick={() => this.updateClose(key)}>
                  <span className="delete-btn"/>
                </div>
                <div className="image item-img">
                  <img src={value.image} alt={value.title} width='50%' height='100%'/>
                </div>
                <div className="description">
                  <span>{value.title}</span>
                </div>
                <div className="quantity">
                  <button className="plus-btn" type="button" name="button" onClick={() => this.addPlus(value)}>
                    <img src={plus} alt="plus"/>
                  </button>
                  <input type="text" name="name" value={value.qty} readOnly/>
                  <button className="minus-btn" type="button" name="button" onClick={() => this.addMinus(value)}>
                    <img src={minus} alt="minus"/>
                  </button>
                </div>
                <div className="total-price">${value.price}</div>
                <div className="total-plus-quantity">${(value.price * value.qty).toFixed(2)}</div>
              </div>
            )}
            <div className="item">
              <div className="sub-total-price"><b>SubTotal({this.state.data.length} items): ${(this.state.sub_total).toFixed(2)}</b></div>
            </div>
          </Then>
          <ElseIf condition={this.state.data.length === 0 || !this.state.data}>
              <div className="empty-cart">
                  <img src={shoppinfCart} width="10%" alt="Shopping Cart"/>
              </div>
            <div className="no-product">No product in cart</div>
          </ElseIf>
        </If>

      </div>
    );
  }
}

export default cart;
