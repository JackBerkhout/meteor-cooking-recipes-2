Template.recipeForm.helpers({
  showTitle: function() {
    var title = 'New Recipe';

    //get the id from the url
    var recipeId = FlowRouter.getParam('id');
    var recipe = Recipes.findOne(recipeId);

    if(recipe) {
      title = recipe.title;
    }
    return title;
  },
  recipe: function(){
    //get the id from the url
    var recipeId = FlowRouter.getParam('id');
    var recipe = Recipes.findOne(recipeId) || {};
    return recipe;
  },
  canShow: function() {
    var result = true;

    if(!Meteor.userId()) {
      result = false;
    }

    else {
      var recipeId = FlowRouter.getParam('id');
      var recipe = Recipes.findOne(recipeId);

      if(recipe) {
        result = recipe.owner == Meteor.userId();
      }
    }

    if(result) {
      return true;
    }
    else {
      FlowRouter.redirect('/');
    }
  },
  isPrivate: function(){
    var recipeId = FlowRouter.getParam('id');
    var recipe = Recipes.findOne(recipeId);

    if(!recipe) {
      return false;
    }
    else {
      return recipe.private ? 'checked' : false;
    }
  }
});

Template.recipeForm.events({
  'submit #recipeForm': function(event){
    // Prevent page refresh upon form submission
    event.preventDefault();

    //grab the form data
    var data = {
      title: event.target.querySelector('#title').value,
      ingredients: event.target.querySelector('#ingredients').value,
      instructions: event.target.querySelector('#instructions').value,
      owner: Meteor.userId(),
      private: event.target.querySelector('#private').checked,
      created: new Date(),
      updated: new Date()
    };

    var recipeId = FlowRouter.getParam('id');

    //if an id is provided, update
    if(recipeId) {
      Meteor.call('updateRecipe',recipeId, data, function(err, result){
        if(err) {
          sAlert.error(err.reason || 'There was an error.', {effect: 'jelly'});
        }
        else {
          sAlert.success('Recipe saved.', {effect: 'jelly'});
        }
      });
    }
    else {
      //insert into the db
      Meteor.call('insertRecipe', data, function(err, result){
        if(err) {
          sAlert.error(err.reason || 'There was an error.', {effect: 'jelly'});
        }
        else {
          sAlert.success('New recipe created.', {effect: 'jelly'});
        }
      });
    }

    //redirect to listing page
    FlowRouter.go('/');
  }
});
