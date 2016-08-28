Recipes = new Mongo.Collection('recipes');

RecipesSchema = new SimpleSchema({
  "title": {
    type: String,
    label: "Recipe Name",
    min: 2,
    max: 32
  },
  "ingredients": {
    type: String,
    label: "Ingredients",
    min: 2,
    max: 50
  },
  "instructions": {
    type: String,
    label: "Instructions",
    max: 1000
  },
  "owner": {
    type: String,
    label: "Owner",
  },
  "private": {
    type: Boolean,
    label: "Private"
  },
  "created": {
    type: Date,
    defaultValue: new Date(),
    label: "Date this item was created",
    denyUpdate: true
  },
  "updated": {
    type: Date,
    defaultValue: new Date(),
    label: "Date this item was updated"
  }

});

Recipes.attachSchema( RecipesSchema );

// Validation errors are available through reactive methods
Meteor.startup(function () {
  Tracker.autorun(function () {
    var context = RecipesSchema.namedContext("myContext");
    if (!context.isValid()) {
      console.log("RecipesSchema invalidKeys: ");
      console.log(context.invalidKeys());
    }
  });
});

Meteor.methods({
  deleteRecipe: function(id){
    console.log('user ' + Meteor.userId());
    // throw new Meteor.Error('not-authorized', 'Test error.');

    //user must be logged in
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You have to be logged in');
    }

    //user must be the owner
    var recipe = Recipes.findOne(id);
    if(Meteor.userId() != recipe.owner) {
      throw new Meteor.Error('not-authorized', 'You don\'t own this recipe');
    }
    console.log('removing recipe');
    Recipes.remove(id);
  },
  insertRecipe: function(data) {
    console.log('user ' + Meteor.userId());
    // throw new Meteor.Error('not-authorized', 'Test error.');
    //user must be logged in
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    //set the owner
    data.owner = Meteor.userId();

    var isValid = RecipesSchema.namedContext("myContext").validate(data);
    console.log("inserting isValid: " + isValid);

    //insert into the db
    console.log('inserting recipe');
    Recipes.insert(data);
  },
  updateRecipe: function(id, data) {
    console.log('user ' + Meteor.userId());
    // throw new Meteor.Error('not-authorized', 'Test error.');
    //user must be logged in
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You have to be logged in');
    }

    //user must be the owner
    var recipe = Recipes.findOne(id);
    if(Meteor.userId() != recipe.owner) {
      throw new Meteor.Error('not-authorized', 'You don\'t own this recipe');
    }

    //make sure it's the right owner
    data.owner = Meteor.userId();
    data.created = new Date();
    data.updated = new Date();

    var isValid = RecipesSchema.namedContext("myContext").validate(data);
    console.log("updating isValid: " + isValid);

    //update the db
    console.log('updating recipe');
    Recipes.update(id, {
      $set: {
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        private: data.private,
        updated: data.updated
      }});
  }
});
