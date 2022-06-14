const templateShopContainer = document.createElement('template');
templateShopContainer.innerHTML = `
<style>
.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    justify-items: center;
}
shop-item {
    width: max-content;
    justify-content: center;
    display: flex;
}
</style>
<div class="container">
</div>
`;

class ShopContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ 'mode': 'open' });
        this.listItems = shopItemsData;
    };

    connectedCallback() {
        this.shadowRoot.appendChild(
            templateShopContainer.content.cloneNode(true)
        );
        this.initialize();
        this._render();
    };

    initialize() {
        this.containerElement = this.shadowRoot.querySelector('.container');
    };

    _render() {
        if (!this.containerElement) return;

        this.containerElement.innerHTML = '';
        this.listItems.forEach((item, idx) => {
            let itemElement = document.createElement('shop-item');
            itemElement.setAttribute('description', item.description);
            itemElement.imgSource = item.imgSource;
            itemElement.price = item.price;
            itemElement.discount = item.discount;
            this.containerElement.appendChild(itemElement);
        });
    };
};

window.customElements.define('shop-container', ShopContainer);
