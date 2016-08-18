Meteor.startup(function(){
  //count recipes entries
  var num = Recipes.find().count();

  if(num === 0) {
    var fixtures = [
      {
        title: 'Pizza Margherita',
        ingredients: '1 pizza base, 1 kg cheese, 1 kg tomatoes',
        instructions: 'Put everything in the oven and cook for 1 hour.'
      },
      {
        title: 'Chilean empanadas',
        ingredients: '1 kg flour, garlic, onion, spices, egg, meat, olives',
        instructions: 'Prepare the dough, fry onions and other items, cook in the oven and eat.'
      },
      {
        title: 'Pasta',
        ingredients: '250g of pasta, 1 lt water',
        instructions: 'Heat water and add pasta. Stir frequently.'
      },
      {
        title: 'Cheese sandwich',
        ingredients: '2 slices of bread, 1 slice of cheese',
        instructions: 'Please the slice of cheese in between the two slices of bread.'
       }
    ];

    fixtures.forEach(function(element){
      Recipes.insert(element);
    });

  }
});
