Recipes = new Mongo.Collection('recipes');

Meteor.methods({
  deleteRecipe: function(id){
    console.log('user ' + Meteor.userId());
    // throw new Meteor.Error('not-authorized', 'Test error.');

    //user must be logged in
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'you have to be logged in');
    }

    //user must be the owner
    var recipe = Recipes.findOne(id);
    if(Meteor.userId() != recipe.owner) {
      throw new Meteor.Error('not-authorized', 'you dont own this recipe');
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

    //insert into the db
    console.log('inserting recipe');
    Recipes.insert(data);
  },
  updateRecipe: function(id, data) {
    console.log('user ' + Meteor.userId());
    // throw new Meteor.Error('not-authorized', 'Test error.');
    //user must be logged in
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'you have to be logged in');
    }

    //user must be the owner
    var recipe = Recipes.findOne(id);
    if(Meteor.userId() != recipe.owner) {
      throw new Meteor.Error('not-authorized', 'you dont own this recipe');
    }

    //make sure it's the right owner
    data.owner = Meteor.userId();

    //update the db
    console.log('updating recipe');
    Recipes.update(id, data);
  }
});
