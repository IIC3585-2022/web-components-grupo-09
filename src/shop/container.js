const templateShopContainer = document.createElement('template');
templateShopContainer.innerHTML = `
    <div class="container">
    </div>
`;

class ShopContainer extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ 'mode': 'open' });
        this.listItems = shopItemsData;
    };

    connectedCallback() {
        this.appendChild(
            templateShopContainer.content.cloneNode(true)
        );
        this.initialize();
        this._render();
    };

    initialize() {
        this.containerElement = this.querySelector('.container');
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
