Template.recipe.helpers({
  recipe: function(){
    var recipeId = FlowRouter.getParam('id');
    var recipe = Recipes.findOne(recipeId);
    return recipe;
  }
});
