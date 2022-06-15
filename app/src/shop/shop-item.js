import { LitElement, html } from "lit-element";

class ShopItem extends LitElement {
  static get properties() {
    return {
      img: { type: String },
      description: { type: String },
      stars: { type: Number },
      normalPrice: { type: String },
      discountPrice: { type: String },
    };
  }
  constructor() {
    super();
    this.img = this.getAttribute("img");
    this.description = this.getAttribute("description");
    this.stars = this.getAttribute("stars");
    this.normalPrice = this.getAttribute("normalPrice");
    this.discountPrice = this.getAttribute("discountPrice");
  }
  render() {
    return html`
            <div class=shop-item>
                <img src="${this.img}"/>
                <p class="description">${this.description}</p>
                <p class=discount-price>$${this.discountPrice}</p>
                <p class=normal-price"">$${this.normalPrice}</p>
                <p class="stars">${this.stars}</p>
            </div>
        <style>
            .shop-item{
                display: flex;
                flex-direction: column;
                border-radius: 15px;
                border: 0.5px solid gray;
                transition: box-shadow 0.3s;
                width: 300px;
                height: 600px;
                padding: 20px;
                background-color: white;
            }
            .shop-item:hover{
                box-shadow: 0 0 15px rgba(33,33,33,.5);
            }
            img{
                display: flex;
                height: 300px;
                width: 300px;
            }
        </style>`;
  }
}

customElements.define("shop-item", ShopItem);
