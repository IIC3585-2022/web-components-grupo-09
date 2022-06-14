import {LitElement, html} from 'lit';
import shopItemsData from '../../src/shop/shop-items-data.js';

class LitShopContainer extends LitElement {
  static get properties() {
    return {
      listItems: {type: Array}
    }
  }
  constructor(){
    super();
    this.listItems = shopItemsData;
  }

  connectedCallback() {
    this.initialize();
  };
  initialize() {
    this.containerElement = this.querySelector('.container');
  };

  render() {
    return html`
    <div class="container">
    </div>
    `;
  };
};

window.customElements.define('lit-shop-container', LitShopContainer);