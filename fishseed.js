coll = new Meteor.Collection('myCol');


if (Meteor.isClient) {

  Meteor.subscribe('myCol')   // <- this suscirbes to everything in myCol
  
  
  Template.hello.greeting = function () {
    return "Welcome to fishseed.";
  };
  
  Template.fish.seed = function () {
    return coll.find();
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function(){
    // Having the option to delete all documents is nice if I want to change the structure of the collection 
    if ( coll.find().count() > 0 ){
        // Remove all documents in the collection to prevent any duplicates.
        coll.remove({});
        
    };
		for (i=0;i<seedData.length;i++){
			coll.insert(seedData[i]);
		}
  });
    
  /* Insert here */
    Meteor.publish('myCol', function(){
        return coll.find() // <- publishes everything in myCol
    })
  /* end insert */
}