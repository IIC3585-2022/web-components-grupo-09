const templateShopItem = document.createElement("template");
templateShopItem.innerHTML = `
<style>
.info {
    width: 300px;
    max-height: 500px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    margin: 0;
    border-radius: 15px;
    font-family: Montserrat,sans-serif,arial,helvetica;
    background-color: white;
    color: black;
}
.data {
    margin: 15px;
}
img {
    max-width: 100%;  
    height: 250px;  
    object-fit: cover;  
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.amount-discount {
    display: flex;
}
.amount-discount > #price {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: auto;
}
.amount-discount > .discount {
    margin-top: 0;
    margin-bottom: 0;
    padding: 5px;
    color: #2f81d2;
    background-color: #f2f7ff;
}
.amount {
    margin-top: 10px;
}
</style>

<div class="info">
    <div class="data">
        <img></img>
        <p class="description"></p>
        <div class="amount-discount">
            <p class="discount"></p>
            <p id="price"></p>
        </div>
        <div class="amount">
            <label>Normal:</label>
            <label class="price"></label>
        </div>
    </div>
</div>
`;

class ShopItem extends HTMLElement {
  constructor() {
    super();
    // when this is open, need to use
    // shadowRoot for disasembling
    this.attachShadow({ mode: "open" });
    this.descriptionValue = false;
    this.priceValue = false;
    this.discountValue = false;
    this.imgSourceValue = false;
  }

  connectedCallback() {
    // It's called when is mounted on html
    this.shadowRoot.appendChild(templateShopItem.content.cloneNode(true));
    // Add shadow root for style only on the component
    this.imgElement = this.shadowRoot.querySelector("img");
    this.infoElement = this.shadowRoot.querySelector(".info");
    this.descriptionElement = this.shadowRoot.querySelector(".description");
    this.priceElement = this.shadowRoot.querySelector("#price");
    this.discountElement = this.shadowRoot.querySelector(".discount");
    this.normalPriceElement = this.shadowRoot.querySelector(".price");
    this._render();
  }

  static get observedAttributes() {
    return ["description"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.descriptionValue = newValue;
  }

  set index(value) {
    this.indexValue = value;
  }

  get index() {
    return this.indexValue;
  }

  set price(value) {
    this.priceValue = parseInt(value);
  }

  get price() {
    return this.priceValue;
  }

  set discount(value) {
    this.discountValue = parseInt(value);
  }

  get discount() {
    return this.discountValue;
  }

  set imgSource(value) {
    this.imgSourceValue = value;
  }

  get imgSource() {
    return this.imgSourceValue;
  }

  _render() {
    if (!this.infoElement) return;
    this.descriptionElement.textContent = this.descriptionValue;
    this.priceElement.textContent = `$${Math.round(
      this.priceValue * (1 - this.discountValue / 100)
    )}`;
    this.discountElement.textContent = `${this.discountValue}%`;
    this.normalPriceElement.textContent = `$${this.priceValue}`;
    this.imgElement.setAttribute("src", this.imgSourceValue);
  }
}

window.customElements.define("shop-item", ShopItem);
