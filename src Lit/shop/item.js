import {LitElement, html} from 'lit';

export class LitShopItem extends LitElement {
  static get properties(){
    return {
      descriptionValue: { type: String },
      priceValue: { type: Number },
      discountValue: { type: Number },
      imgSourceValue: { type: String }
    }
  }
  constructor(){
    super();
    this.attachShadow({ 'mode': 'open' });
  }
  connectedCallback(){
    // Add shadow root for style only on the component
    this.imgElement = this.shadowRoot.querySelector('img');
    this.infoElement = this.shadowRoot.querySelector('.info');
    this.descriptionElement = this.shadowRoot.querySelector('#description');
    this.priceElement = this.shadowRoot.querySelector('#price');
    this.discountElement = this.shadowRoot.querySelector('.discount');
    this.normalPriceElement = this.shadowRoot.querySelector('.price');
  }
  /**
   * Called when an update was triggered, before rendering. Receives a Map of changed
   * properties, and their previous values. This can be used for modifying or setting
   * new properties before a render occurs.
   */
  update(changed) {
    super.update(changed);
  }

  /**
   * Called when an update was triggered, after rendering. Receives a Map of changed
   * properties, and their previous values. This can be used for observing and acting
   * on property changes.
   */
  updated(changed) {
    super.updated(changed);
  }

  /**
   * Called when your element has rendered for the first time. Called once in the
   * lifetime of an element. Useful for one-time setup work that requires access to
   * the DOM.
   */
  firstUpdated() {
    super.firstUpdated();
  }

  render() {
    if (!this.infoElement) return;
        this.descriptionElement.textContent = this.descriptionValue;
        this.priceElement.textContent = Math.round(
            this.priceValue * (1 - this.discountValue / 100)
        );
        this.discountElement.textContent = `${this.discountValue}%`;
        this.normalPriceElement.textContent = this.priceValue;
        this.imgElement.setAttribute('src', this.imgSourceValue)
        return html`<style>
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
        </div>`;
        }
}

window.customElements.define('lit-shop-item', LitShopItem);