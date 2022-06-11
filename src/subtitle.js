class Subtitle extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<p>Grupo 9</p>`;
  }
}
window.customElements.define("subtitle-comp", Subtitle);
