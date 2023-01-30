//convert task item from model to dom element
//need myList for registering checkbox callback
function todoDomItem(item, myList) {

  var domItem = document.createElement('li');
  domItem.className = 'list-item';
  item.setDomNode(domItem);

  var checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.addEventListener('click', getCheckboxListener(item));

  var text = document.createElement('span');
  text.innerHTML = item.content;

  domItem.appendChild(checkbox);
  domItem.appendChild(text);

  var timeStamp = document.createElement('span');
  timeStamp.className = 'time-stamp';
  timeStamp.innerHTML = "Created at " + item.birth;
  domItem.appendChild(timeStamp);

  var delButton = document.createElement('button');
  delButton.type = "button";
  delButton.className = 'btn-del';
  delButton.innerHTML = "X";

  delButton.addEventListener('click', getDeleteBtnListner(item, myList));

  domItem.appendChild(delButton);

  return domItem;
}

function finishedDomItem(item) {
  var domItem = document.createElement('li');
  domItem.className = 'list-item';
  item.setDomNode(domItem);

  var text = document.createElement('span');
  text.innerHTML = item.content;

  domItem.appendChild(text);

  var timeStamp = document.createElement('span');
  timeStamp.className='time-stamp';
  timeStamp.innerHTML = "Created at " + item.birth;
  domItem.appendChild(timeStamp);

  var delButton = document.createElement('button');
  delButton.type = "button";
  delButton.className = 'btn-del';
  delButton.innerHTML = "X";

  delButton.addEventListener('click', getDeleteBtnListner(item));

  domItem.appendChild(delButton);

  return domItem;
}

function getCheckboxListener(item) {
  return function(){
    setTimeout(function(){
      item.finish();
      //remove from todo list in dom
      item.domNode.parentNode.removeChild(item.domNode);
      //add to finished list in dom
      var domItem = finishedDomItem(item);
      document.getElementById("finished-list-content").appendChild(domItem);
      
    }, 500);
  }
}

function getDeleteBtnListner(item, myList) {
  return function(){
    //Forget to delete item from list, when the list is rendered next time, items will be rendered again from the list
   // console.log(item)
    console.log(myList)
    myList.removeTask(item);
    item.remove();
    //remove from finished list
    item.domNode.parentNode.removeChild(item.domNode);
  }
}
