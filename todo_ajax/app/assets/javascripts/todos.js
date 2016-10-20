// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function toggleDone() {
  var checkbox = this;
  var tableRow = $(this).parent().parent();

  var todoId = tableRow.data('id');
  var isCompleted = !tableRow.hasClass("success");

  $.ajax({
    type: "PUT",
    url: "/todos/" + todoId + ".json",
    data: JSON.stringify({
      todo: { completed: isCompleted }
    }),
    contentType: "application/json",
    dataType: "json"})

    .done(function(data) {
      console.log(data);

      tableRow.toggleClass("success", data.completed);

      updateCounters();
    });
}

function updateCounters() {
  $("#total-count").html($(".todo").size());
  $("#completed-count").html($(".success").size());
  $("#todo-count").html($(".todo").size() - $(".success").size());
}

function nextTodoId() {
  return $(".todo").size() + 1;
}

function createTodo(title) {
  var checkboxId = "todo-" + nextTodoId();

  var label = $('<label></label>')
    .attr('for', checkboxId)
    .html(title);

  var checkbox = $('<input type="checkbox" value="1" />')
    .attr('id', checkboxId)
    .bind('change', toggleDone);

  var tableRow = $('<tr class="todo"></td>')
    .append($('<td>').append(checkbox))
    .append($('<td>').append(label));

  $("#todoList").append( tableRow );

  updateCounters();
}

function submitTodo(event) {
  event.preventDefault();
  createTodo($("#todo_title").val());
  $("#todo_title").val(null);
  updateCounters();
}

function cleanUpDoneTodos(event) {
  event.preventDefault();
  $.when($(".success").remove())
    .then(updateCounters);
}

$(document).ready(function() {
  $("input[type=checkbox]").bind('change', toggleDone);
  $("form").bind('submit', submitTodo);
  $("#clean-up").bind('click', cleanUpDoneTodos);
  updateCounters();
});
