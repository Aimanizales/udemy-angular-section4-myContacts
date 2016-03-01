'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
	console.log('ContactsCtrl init');
	var ref = new Firebase('https://mycontacts-angular-udemy.firebaseio.com/');

	$scope.contacts = $firebaseArray(ref);
	console.log('ref=', $scope);

	$scope.showAddForm = function (b) {
		$scope.addFormShow = b;
	}

	$scope.addFormSubmit = function () {
		console.log('Adding contact...');
		var name = ($scope.name) ? $scope.name : null,
			email = ($scope.email) ? $scope.email : null,
			company = ($scope.company) ? $scope.company : null,
			mobile_phone = ($scope.mobile_phone) ? $scope.mobile_phone : null,
			home_phone = ($scope.home_phone) ? $scope.home_phone : null,
			work_phone = ($scope.work_phone) ? $scope.work_phone : null,
			street_address = ($scope.street_address) ? $scope.street_address : null,
			city = ($scope.city) ? $scope.city : null,
			state = ($scope.state) ? $scope.state : null,
			zipcode = ($scope.zipcode) ? $scope.zipcode : null;

		//$scope.contacts.$add({name: name, email:email, })
	}
}]);