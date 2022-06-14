export const templateShopItem = document.createElement('template');
templateShopItem.innerHTML = `
<style>
#price {
    color: cyan;
}
.info {
    width: 50%;
    border-bottom: 1px solid black;
}
</style>

<div class="info">
    <img></img>
    <p id="description"></p>
    <p id="price"></p>
    <p class="discount"></p>
    <div>
        <label>Normal:</label>
        <label class="price"></label>
    </div>
</div>
`;

class ShopItem extends HTMLElement {
    constructor() {
        super();
        // when this is open, need to use 
        // shadowRoot for disasembling
        this.attachShadow({ 'mode': 'open' });
        this.descriptionValue = false;
        this.priceValue = false;
        this.discountValue = false;
        this.imgSourceValue = false;
    };

    connectedCallback() {
        // It's called when is mounted on html
        this.shadowRoot.appendChild(
            templateShopItem.content.cloneNode(true)
        );
        // Add shadow root for style only on the component
        this.imgElement = this.shadowRoot.querySelector('img');
        this.infoElement = this.shadowRoot.querySelector('.info');
        this.descriptionElement = this.shadowRoot.querySelector('#description');
        this.priceElement = this.shadowRoot.querySelector('#price');
        this.discountElement = this.shadowRoot.querySelector('.discount');
        this.normalPriceElement = this.shadowRoot.querySelector('.price');
        this._render();
    };

    static get observedAttributes() {
        return ['description'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.descriptionValue = newValue;
    }

    set index(value) {
        this.indexValue = value;
    };

    get index() {
        return this.indexValue;
    };

    set price(value) {
        this.priceValue = parseInt(value);
    };

    get price() {
        return this.priceValue;
    };

    set discount(value) {
        this.discountValue = parseInt(value);
    };

    get discount() {
        return this.discountValue;
    };

    set imgSource(value) {
        this.imgSourceValue = value;
    };

    get imgSource() {
        return this.imgSourceValue;
    };

    _render() {
        if (!this.infoElement) return;
        this.descriptionElement.textContent = this.descriptionValue;
        this.priceElement.textContent = Math.round(
            this.priceValue * (1 - this.discountValue / 100)
        );
        this.discountElement.textContent = `${this.discountValue}%`;
        this.normalPriceElement.textContent = this.priceValue;
        this.imgElement.setAttribute('src', this.imgSourceValue)
    };
};

window.customElements.define('shop-item', ShopItem);
