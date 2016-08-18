Template.listing.helpers({
  entries: function() {
    return Recipes.find({}, {sort: {title: 1}});
  },
  isOwner: function() {
    if(!Meteor.userId()) {
      return false;
    }

    console.log(this.owner);
    console.log(Meteor.userId());

    //check if the user is the owner
    return Meteor.userId() == this.owner;
  }
});

Template.listing.events({
  'click .delete': function(event){
    Meteor.call('deleteRecipe', this._id, function(err, result){
      if(err) {
        sAlert.error(err.reason || 'There was an error.', {effect: 'jelly'});
      }
      else {
        sAlert.success('Recipe deleted.', {effect: 'jelly'});
      }
    });
  }
});
