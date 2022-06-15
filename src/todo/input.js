const templateTodoInput = document.createElement("template");
templateTodoInput.innerHTML = `
<style>
.todo-form {
    width: 100%;
}
#todo-input {
    min-width: 40%;
    padding: 10px;
    border-radius: 5px;
    
}
</style>
<form id="todo-form">
    <input
        id="todo-input"
        type="text"
        placeholder="Agregar a la lista"
    >
</form>
`;

class TodoInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateTodoInput.content.cloneNode(true));
    this.formElement = this.shadowRoot.querySelector("#todo-form");
    this.inputElement = this.shadowRoot.querySelector("#todo-input");
    this.formElement.addEventListener("submit", this.submitHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.inputElement.value) {
      this.dispatchEvent(
        new CustomEvent("onSubmit", { detail: this.inputElement.value })
      );
      this.inputElement.value = "";
    }
  }
}

window.customElements.define("todo-input", TodoInput);
