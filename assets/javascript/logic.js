
var config = {
    apiKey: "AIzaSyCRNurcheM6Y2BWz4l0Hefvt4nKhmjSrP0",
    authDomain: "bosnia-d102f.firebaseapp.com",
    databaseURL: "https://bosnia-d102f.firebaseio.com",
    projectId: "bosnia-d102f",
    storageBucket: "bosnia-d102f.appspot.com",
    messagingSenderId: "299271121501"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();
    // Initial Values
    var name = "";
    var destination = "";
    var trainTime = "";
    var frequency = "";
    // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();
      
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      trainTime = $("#time-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      // Code for the push
      dataRef.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
});

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().trainTime);
      console.log(childSnapshot.val().frequency);
      

      var trainName = childSnapshot.val().name;
      var trainDest = childSnapshot.val().destination;
      var trainTim = childSnapshot.val().trainTime;
      var trainFreq = childSnapshot.val().frequency;
      
      // full list of items to the well
       

    // Handle the errors
    
   

    var trainFreq = childSnapshot.val().frequency;
    console.log("train frequency: " + trainFreq);
    
    var firstTime = childSnapshot.val().trainTime;
    
    var firstTimeConverted = moment(firstTime, "hh:mm")
    console.log(firstTimeConverted);
   
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var currentTimeConverted = moment().diff(moment(currentTime), "minutes")
    // Difference between the times
    var diffTime = currentTimeConverted - moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)


    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    $("#train-schedule").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
	
  trainFreq + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain);

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


