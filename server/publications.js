Meteor.publish('publicRecipes', function(){
    return Recipes.find({
        $or: [
            { owner: this.userId},
            { private: {$ne: true}}
        ]
    });
});
