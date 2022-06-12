const templateShopContainer = document.createElement('template');
templateShopContainer.innerHTML = `
    <div class="container">
    </div>
`;

class ShopContainer extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ 'mode': 'open' });
        this.listItems = [
            { description: 'Perfume', price: 5, discount: 10 },
            { description: 'Perfume2', price: 6, discount: 15 },
        ];
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
            let itemElement = document.createElement('shop-info');
            itemElement.setAttribute('description', item.description);

            this.containerElement.appendChild(itemElement);
        });
    };
};

window.customElements.define('shop-container', ShopContainer);
