if(Meteor.isClient) {
    // set root for styling with Bootstrap (ccoking-recipes.html)
    BlazeLayout.setRoot('#main-container');
}

FlowRouter.route('/', {
    action: function (params, queryParams) {
        console.log('you are in the home page');
        console.log(queryParams);
        BlazeLayout.render('listing');
    }
});

FlowRouter.route('/newRecipe', {
    action: function (params, queryParams) {
        console.log('you are in the new recipe page');
        BlazeLayout.render('recipeForm');
    }
});

FlowRouter.route('/recipe/:id?', {
    action: function (params, queryParams) {
        if (!params.id) {
            FlowRouter.go('/');
        }
        console.log('you are in the view recipe page for recipe: ' + params.id);
        BlazeLayout.render('recipe');
    }
});

FlowRouter.route('/editRecipe/:id?', {
    action: function(params, queryParams){
        if (!params.id) {
            FlowRouter.go('/');
        }
        BlazeLayout.render('recipeForm');
    }
});
