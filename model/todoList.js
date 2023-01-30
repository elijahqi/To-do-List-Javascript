class TodoList {
  constructor(name) {
    this.name = name;
    this.list = [];
  }

  addTask(item) {
    item.setContainer(this);
    this.list.push(item);
    this.saveToLS();
  }

  removeTask(item) {
    console.log("success")
    item.setContainer(this);
    var index = this.list.indexOf(item);
    console.log(this.list)
    this.list.splice(index, 1);
    this.saveToLS();
    console.log(this.list)
  }

  loadFromLS() {
    //.container property and the functions need to be reset
    var plainList = JSON.parse(localStorage.getItem(this.name) || '[]');
    this.list = [];
    for (var i = 0; i < plainList.length; i++){
      var item = TodoItem.retore(plainList[i], this);
      item.setContainer(this);
      this.list.push(item);
    }

    return this;
  }

  saveToLS() {
    var plainList = [];

    for (var i = 0; i < this.list.length; i++){
      plainList.push({
        "content": this.list[i].content,
        "pending": this.list[i].pending,
        "birth": this.list[i].birth
      });
    }

    localStorage.setItem(this.name, JSON.stringify(plainList));
    return this;
  }
}
