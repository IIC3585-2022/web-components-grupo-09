const templateTodoList = document.createElement("template");
templateTodoList.innerHTML = `
<style>
.todo {
    font-family: arial;
    margin: 25px;
    background-color: white;
    color: black;
    text-align: center;
    border-radius: 10px;
    border: 0.5px solid gray;
    padding: 1rem;
    transition: box-shadow .3s;
}
.todo:hover {
    box-shadow: 0 0 15px rgba(33,33,33,.5);
}
todo-input {
    width: 100%;
}
ul {
    list-style-type: none;
}  
</style>
<div class="todo">
    <h2>Todo List</h2>
    <todo-input></todo-input>
    <ul id="todo-list"></ul>
</div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.listItems = [
      {
        text: "Recuerda que puedes agregar items escribiendo y con enter",
        checked: false,
      },
      { text: "Aprendiendo web components", checked: true },
    ];
  }

  // on html mount
  connectedCallback() {
    this.shadowRoot.appendChild(templateTodoList.content.cloneNode(true));
    this.initialize();
    this._render();
  }

  initialize() {
    this.inputComponent = this.shadowRoot.querySelector("todo-input");
    this.listComponent = this.shadowRoot.querySelector("#todo-list");
    this.inputComponent.addEventListener("onSubmit", this.addItem.bind(this));
  }

  addItem(e) {
    console.log(e);
    this.listItems = [...this.listItems, { text: e.detail, checked: false }];
    this._render();
  }

  removeHandler(e) {
    this.listItems.splice(e.detail, 1);
    this._render();
  }

  toggleHandler(e) {
    const item = this.listItems[e.detail];
    this.listItems[e.detail] = Object.assign({}, item, {
      checked: !item.checked,
    });
    this._render();
  }

  _render() {
    if (!this.listComponent) return;

    this.listComponent.innerHTML = "";
    this.listItems.forEach((item, idx) => {
      let itemElement = document.createElement("todo-item");
      itemElement.setAttribute("text", item.text);
      itemElement.checked = item.checked;
      itemElement.index = idx;
      itemElement.addEventListener("onRemove", this.removeHandler.bind(this));
      itemElement.addEventListener("onToggle", this.toggleHandler.bind(this));
      this.listComponent.appendChild(itemElement);
    });
  }
}

window.customElements.define("todo-list", TodoList);
