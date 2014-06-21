'use strict';

app.directive('setFocus', function ($timeout) {
  return {
    link: function (scope, element) {
      element.bind('click', function () {
        $timeout(function () {
          var focusInput = document.getElementsByTagName('input')[0];
          focusInput.focus();
        });
      });
    }
  };
});