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
    }
  });  //End ajax (get) call.
  console.log( 'Sending the following task to database: ' + taskToComplete );
$( '#inputField' ).val('');
});  //End button click function.

var displayTasks = function( tasks ) {
  for( i = 0; i < tasks.length; i++ ) {
    var toDo = '<p>To Do: ' + tasks[i].to_do + '</p>';
      $( '#displayField' ).append( toDo );
    var completeButton = "<button id = 'complete'>Complete Task</button>";
      $( '#displayField' ).append( completeButton );
    var deleteButton = "<button id = 'delete'>Blow it off</button>";
      $( '#displayField' ).append( deleteButton );
  }
};


});
