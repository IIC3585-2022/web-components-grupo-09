const templateShopInfo = document.createElement('template');
templateShopInfo.innerHTML = `
    <div class="info">
        <description></description>
        <h5></h5>
        <p class="discount"></p>
        <div>
            <label>Normal:</label>
            <label class="price"></label>
        </div>
    </div>
`;

class ShopInfo extends HTMLElement {
    constructor() {
        super();
         // this.attachShadow({ 'mode': 'open' });
        this.descriptionValue = false;
        this.priceValue = false;
        this.discountValue = false;
    };

    connectedCallback() {
        // It's called when is mounted on html
        this.appendChild(
            templateShopInfo.content.cloneNode(true)
        );
        this.infoElement = this.querySelector('#info');
        this.descriptionElement = this.querySelector('description');

        this._render();
    };

    static get observedAttributes() {
        return ['description'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.descriptionValue = newValue;
    }

    _render() {
        if (!this.infoElement) return;
        this.descriptionElement.textContent = this.descriptionValue;
    };
};

window.customElements.define('shop-info', ShopInfo);
