(function($) {
  Drupal.behaviors.BMICalculator = {
    attach: function(context, settings) {
      var calculator = this;
      $('#bmijs-calculator-form', context).keyup(function(event) {

          // Parse input data.
          var height = parseFloat($(this).find('#edit-height').val().replace(/\,/, '.')),
              weight = parseFloat($(this).find('#edit-weight').val().replace(/\,/, '.')),
              $display = $(this).find('#edit-results');

          // If everything is fine, calculate and display BMI.
          if (height && weight) {
              var bmi = (weight/(height*height)).toFixed(1);
              $display.text(Drupal.t('Your BMI index is @bmi.', {'@bmi': bmi}));
              if (bmi <= 18.5) {
                  $display.append(' ' + Drupal.t('You are below your ideal weight.'));
              } else if (bmi < 25) {
                  $display.append(' ' + Drupal.t('You are currently in your normal weight.'));
              } else if (bmi < 30) {
                  $display.append(' ' + Drupal.t('You are above your ideal weight.'));
              } else {
                  $display.append(' ' + Drupal.t('You are obese.'));
              }

          // If user is inputting garbage, warn him.
          // @TODO: highlight the faulting input.
          } else if (isNaN(height) || isNaN(weight)) {
              $display.text(
                  Drupal.t('Please enter your data to calculate your BMI.') + ' ' +
                  Drupal.t('Please enter numeric values for weight and height fields.')
              );

          // User is probably cleaning up the form or just filling it.
          } else {
              $display.text(Drupal.t('Please enter your data to calculate your BMI.'));
          }
      });
    }
  };
}(jQuery));
