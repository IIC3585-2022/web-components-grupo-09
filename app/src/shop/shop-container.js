import { LitElement, html } from "lit-element";
import { shopItemsData } from "./shop-data.js";

class ShopContainer extends LitElement {
  static get properties() {
    return {
      listItems: { type: Array },
    };
  }
  constructor() {
    super();
    this.listItems = shopItemsData;
  }

  render() {
    return html` <div class="shop-container">
        ${this.listItems.map(
          (item) => html`
            <shop-item
              img="${item.imgSource}"
              description="${item.description}"
              stars="${item.stars}"
              normalPrice="${item.price}"
              discountPrice="${item.discount}"
            >
            </shop-item>
          `
        )}
      </div>
      <style>
        .shop-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-gap: 20px;
          margin: 20px;
        }
      </style>`;
  }
}

customElements.define("shop-container", ShopContainer);
