
/**
 * Module dependencies.
 */

var $ = require('jquery')
  , Menu = require('menu');

/**
 * Expose `ListboxMenu`.
 */

module.exports = ListboxMenu;

/**
 * Initialize a new `ListboxMenu`.
 *
 * Emits:
 *
 *   - "show" when shown
 *   - "hide" when hidden
 *   - "remove" with the item name when an item is removed
 *   - "select" (item) when an item is selected
 *   - * menu item events are emitted when clicked
 *
 * @api public
 */

function ListboxMenu() {
  Menu.call(this);
  this.el.addClass('listbox-menu');
  this.el.hover(this.deselect.bind(this));
  this.el.unbind('hover');
  $('html').unbind('click');
  this.off('show');
  this.off('hide');

};

/**
 * Inherit from `Menu.prototype`.
 */

ListboxMenu.prototype = new Menu();

/**
 * Add menu item with the given `text` and optional callback `fn`.
 *
 * When the item is clicked `fn()`. When clicked
 * an event of the name `text` is emitted regardless of
 * the callback function being present.
 * 
 * Differs from Menu in that menu is not closed after
 * click and makes clicked item 'selected'
 *
 * @param {String} text
 * @param {Function} fn
 * @return {Menu}
 * @api public
 */

ListboxMenu.prototype.add = function(text, fn){
  var slug;

  // slug, text, [fn]
  if ('string' == typeof fn) {
    slug = text;
    text = fn;
    fn = arguments[2];
  } else {
    slug = createSlug(text);
  }

  var self = this
    , el = $('<li><a href="#">' + text + '</a></li>')
    .addClass(slug)
    .appendTo(this.el)
    .click(function(e){
      e.preventDefault();
      e.stopPropagation();
      if (self.selectChecker && !self.selectChecker(slug)) {
        return;
      }
      self.deselect();
      el.addClass('selected');
      self.emit('select', slug);
      self.emit(slug);
      fn && fn();
    });

  this.items[slug] = el;
  return this;
};

ListboxMenu.prototype.setSelectChecker = function(checker) {
  if (!typeof checker === 'function') {
    return;
  }
  this.selectChecker = checker;
};

ListboxMenu.prototype.reset = function() {
  this.el.empty();
  this.items = {};
}

function createSlug(str) {
  return str
    .toLowerCase()
    .replace(/ +/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
