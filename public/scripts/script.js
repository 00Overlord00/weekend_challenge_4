console.log( 'SCRIPT: GO' );

$(document).ready(function(){
  console.log( 'JQUERY: GO' );

$( '#createTask' ).on( 'click', function(){
  var taskToComplete = $( '#inputField' ).val();
  var newTask = {
    'task': taskToComplete,
    'completed': false
  };  //End object.

  $.ajax({
    type: 'POST',
    url: '/postRoute',
    data: newTask
  });  //End ajax (post) call.

  $.ajax({
    type: 'GET',
    url: '/getPath',
    success: function( data) {
      console.log( data );
      displayTasks( data );
    }  //End success function.
  });  //End ajax (get) call.
  console.log( 'Sending the following task to database: ' + taskToComplete );
$( '#inputField' ).val('');
});  //End button click function.

var displayTasks = function( tasks ) {
  $( '#displayField').empty();
  for( i = 0; i < tasks.length; i++ ) {
    if( tasks[i].completed === true ) {  //This particular area is not functioning.
      $( '#displayField' ).append( '<div id = "completeDiv"></div>');
      var notToDo = '<p id = "generic">To Do: ' + tasks[i].to_do + '</p>';
      $( '#completeDiv' ).append( notToDo );
      var deleteButton2 = "<button id = 'delete2'>Blow it off</button>";
      $( '#completeDiv' ).append( deleteButton2 );
    }else{
    $( '#displayField' ).append( '<div id = "newDiv"></div>');
    var toDo = '<p id = "generic">To Do: ' + tasks[i].to_do + '</p>';
      $( '#displayField' ).children().last().append( toDo );
    var completeButton = "<button id = 'complete'>Complete Task</button>";
      $( '#displayField' ).children().last().append( completeButton );
    var deleteButton = "<button id = 'delete'>Blow it off</button>";
      $( '#displayField' ).children().last().append( deleteButton );
    }  //End if loop.
  }  //End for loop.
};  //End function.

$( '#newDiv' ).on( 'click', '#complete', function() {
  var taskId = {
    'id': $( this ).parent().data( 'id' )
  };  //End taskId object.
      console.log( 'Sending ' + taskId + ' to server.');
  $.ajax({
    type: 'POST',
    url: '/completeTask',
    data: taskId
  });  //End post call.

  $.ajax({
    type: 'GET',
    url: '/getPath',
    success: function( data ) {
      console.log( data );
      displayTasks( data );
    }
  });

  });

});
