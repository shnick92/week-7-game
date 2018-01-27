console.log("linked");
var config = {
    apiKey: "AIzaSyAGh-Lw13mCwHQndIZA_8-ijQxqAFhinGs",
    authDomain: "week-7-train-1fd68.firebaseapp.com",
    databaseURL: "https://week-7-train-1fd68.firebaseio.com",
    projectId: "week-7-train-1fd68",
    storageBucket: "week-7-train-1fd68.appspot.com",
    messagingSenderId: "511052906884"
  };
  firebase.initializeApp(config);

var database = firebase.database();

  $("#submit").on("click", function(event) {
    event.preventDefault();

    var name = $("#tnameInput").val().trim();
    var destination = $("#tdestInput").val().trim();
    var time = $("#inputInput").val().trim();
    var frequency = $("#freqInput").val().trim();

    database.ref().push({
      train: name,
      destination: destination,
      time: time,
      frequency: frequency
    });
    console.log(name);
  });

database.ref().on("child_added", function(childSnapshot) {
    var freq = childSnapshot.val().freq;
    var time = moment(childSnapshot.val().time, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(time), "minutes");
    var minAway = frequency - (diffTime % frequency);
    var nextTrain = moment().add(minAway, "minutes");

    $("#tnameTable").text(childSnapshot.val().train);
    $("#tdestTable").text(childSnapshot.val().destination); 
    $("#inputTable").text(time);
    $("#freqTable").text(frequency);
    $("#minTable").text(moment(nextTrain).format("hh:mm"+minAway+"</td></tr>"));
  });