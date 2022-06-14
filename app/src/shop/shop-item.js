import { LitElement, html } from 'lit-element';

class ShopItem extends LitElement{
    static get properties(){
        return{
            img: {type:String},
            description: {type:String},
            stars: {type: Number},
            normalPrice: {type: String},
            discountPrice: {type: String}
        }
    }
    constructor(){
        super();
        this.img = this.getAttribute("img");
        this.description = this.getAttribute("description");
        this.stars = this.getAttribute("stars");
        this.normalPrice = this.getAttribute("normalPrice");
        this.discountPrice = this.getAttribute("discountPrice");
    }
    render(){
        return html`
            <div class=shop-item>
                <img src="${this.img}"/>
                <p class="description">${this.description}</p>
                <p class=discount-price>$${this.discountPrice}</p>
                <p class=normal-price"">$${this.normalPrice}</p>
                <p class="stars">${this.stars}</p>
            </div>
        `;
    }
}

customElements.define('shop-item', ShopItem);