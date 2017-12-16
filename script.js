$(function() {
  
  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      // CREATING COMPONENTS OF COLUMNS
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('X');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
      let $columnInput = $('<input type="text">');

      // ADDING EVENTS
      $columnDelete.click(function() {
          self.removeColumn();
      });
      
      $columnAddCard.click(function(event) {
          if ($columnInput.val() == '') {
            return;
          } else {
            self.addCard(new Card($columnInput.val()));
            $columnInput.val('');
          }

      });
  
      // CONSTRUCTION COLUMN ELEMENT
      $column.append($columnTitle)
          .append($columnDelete)
          .append($columnCardList)
          .append($columnInput)
          .append($columnAddCard);
  
      // RETURN OF CREATED COLUMN
      return $column;
     
    }
  }  

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };
  
  function Card(description) {
    var self = this;
  
      this.id = randomString();
      this.description = description;
      this.$element = createCard();
  
      function createCard() {
          // CREATING THE BLOCKS
          var $card = $('<li>').addClass('card');
          var $cardDescription = $('<p>').addClass('card-description').text(self.description);
          var $cardDelete = $('<button>').addClass('btn-delete').text('X');

          // BINDING TO CLICK EVENT
          $cardDelete.click(function(){
                    self.removeCard();
          });

          // COMBINING BLOCKS AND RETURNING THE CARD
          $card.append($cardDescription).append($cardDelete);
            return $card;
        }
      }
  

  
  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  }

  // var board = {
  //     name: 'Kanban Board',
  //     addColumn: function(column) {
  //       this.$element.append(column.$element);
  //       initSortable();
  //     },
  //     $element: $('.board .column-container')   // zamiast . # board
  // };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.create-column').click(function(){
    var name = prompt('Enter a column name');
    var column = new Column(name);
        board.addColumn(column);
  });

  //   // CREATING COLUMNS
  // var todoColumn = new Column('To do');
  // var doingColumn = new Column('Doing');
  // var doneColumn = new Column('Done');

  // // ADDING COLUMNS TO THE BOARD
  // board.addColumn(todoColumn);
  // board.addColumn(doingColumn);
  // board.addColumn(doneColumn);

  // // CREATING CARDS
  // var card1 = new Card('New task');
  // var card2 = new Card('Create kanban boards');

  // // ADDING CARDS TO COLUMNS
  // todoColumn.addCard(card1);
  // doingColumn.addCard(card2);

  function randomString() {
      var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
      var str = '';
      for (var i = 0; i < 10; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
  }

  var root = {
    name: 'root',
    addBoard: function(board) {
      this.$element.append(board.$element);
      initSortable();
    },
    $element: $('#root'),
};

  $('#create-board').click(function(){
    var name = prompt('Enter a board name');
    var board = new Board(name);
    root.addBoard(board);
  });


  function Board(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createBoard();
    this.addColumn = function(column) {
      self.$element.children('div').append(column.$element);
    initSortable();
     
    }
    
    function createBoard() {
      // CREATING COMPONENTS OF BOARD
      var $board = $('<div>').addClass('board');
      var $boardTitle = $('<h1>').addClass('board-title').text(self.name);
      var $boardDelete = $('<button>').addClass('btn-delete').text('X');
      var $boardBtn = $('<button>').addClass('create-column').text('Add a column');
      var $BoardContainer = $('<div>').addClass('column-container');
     
     // ADDING EVENTS
      $boardBtn.click(function(event){
        name = prompt();
        column = new Column(name);
        self.addColumn(column);
      }) 

      $boardDelete.click(function() {
        self.$element.remove();
      });

    // CONSTRUCT BOARD ELEMENT
      $board.append($boardTitle);
      $board.append($boardBtn);
      $board.append($boardDelete);
      $board.append($BoardContainer);
      
      return $board;
    }   
  }
})