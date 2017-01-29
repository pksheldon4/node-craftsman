console.log('Starting calculation...');

startExpensiveCalculation(5, 4, function(err, result) {
  if (!err) {
    console.log('The result is', result);
  }
});
