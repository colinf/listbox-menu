
# Listbox Menu

  A Listbox Menu component with structural styling to give you a clean slate.
  The Listbox Menu component is built on top of [Menu](http://github.com/component/menu).

  ![js listbox menu component](http://colinf.github.com/listbox-menu/images/Listbox-Menu.png)

## Installation

```
to-do
```

## Features

  - events for composition
  - structural CSS letting you decide on style
  - fluent API

## Events

Events are inherited from Menu as listed below.
  - `show` when shown
  - `hide` when hidden
  - `remove` (item) when an item is removed
  - `select` (item) when an item is selected
  - `*` menu item events are emitted when clicked

## Example

```js
var listboxMenu = require('listbox-menu');

var data = [
  {
    league: "Scottish Premier League",
    teams: ["Aberdeen", "Celtic", "Dundee", "Dundee Utd", "Hearts", "Hibs", "Inverness CT", "Kilmarnock", "Motherwell", "Ross County", "St Johnstone", "St Mirren"]
  },
  {
    league: "First Division",
    teams: ["Airdrie", "Cowdenbeath", "Dumbarton", "Dunfermline", "Falkirk", "Hamilton", "Livingston", "Morton", "Partick Thistle", "Raith Rovers"]
  },
  {
    league: "Second Division",
    teams: ["Albion Rovers", "Alloa", "Arbroath", "Ayr Utd", "Brechin", "East Fife", "Forfar", "Queen of the South", "Stenhousemuir", "Stranraer"]
  },
  {
    league: "Third Division",
    teams: ["Annan Athletic", "Berwick Rangers", "Clyde", "East Stirlingshire", "Elgin City", "Montrose", "Peterhead", "Queens Park", "Rangers", "Stirling Albion" ]
  }
];
  
var menu = new listboxMenu();
var submenu = new listboxMenu();
submenu.setSelectChecker(function(item) {
  return confirm("Do you really want to do this?");
});

for (var i = 0; i < data.length; i++) {
  menu.add(i, data[i].league);
};

menu.on('select', function(item){
  var teams;
  submenu.reset();
  teams = data[parseInt(item)].teams;
  for (var i = 0; i < teams.length; i++) {
    submenu.add(teams[i]);
  };
}); 
  
submenu.on('select', function(item){
  console.log('selected "%s"', item);
});

 menu.moveTo(100, 100);
 submenu.moveTo(275,100);
 menu.show();
 submenu.show();
```

## API

As well as the Menu API, Listbox Menu adds the following.
  
### ListboxMenu()

  Create a new `ListboxMenu`:

```js
var ListboxMenu = require('listbox-menu');
var menu = new ListboxMenu();
```

### ListboxMenu#reset()

 Empties all items from the menu.
 
### ListboxMenu#setSelectChecker(fn)

Add a function to the Listbox Menu which will be called when a menu item is clicked. If the function returns false then the select event will be abandoned. This allows functionality such as a confirmation dialog prior to switching to a new menu item.

## Summary of Differences from Menu

* Intended to be used as on-screen navigation menu as opposed to  a contect menu
* Listbox Menu doesn't hide when clicked
* Selected item is not deselected on hover
* Allows validation of selection events (via setSelectChecker)
* Listbox menu currently doesn't support keyboard navigation

## License

  MIT