'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
	var ref = new Firebase('https://mycontacts-angular-udemy.firebaseio.com/'); //endpoint

	$scope.msg = "Contact to add";
	$scope.contacts = $firebaseArray(ref); // get data
	
	//When clicking in new contact button:
	$scope.showAddForm = function (b) {
		$scope.isAddFormShowing = b;
	}

	//
	$scope.editContact = function (b) {
		$scope.isEditContactShowing = b;
	}

	//
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

		//Build object:
		$scope.contacts.$add({
			name: name, 
			email:email,
			company : company,
			phones: {
				mobile : mobile_phone,
				home : home_phone,
				work : work_phone
			},
			address : {
				street_address : street_address,
				city : city,
				state : state,
				zipcode : zipcode
			}
		}).then(function(ref) {
			var id = ref.key();
			console.log('Adding contact with ID: ', id);
			$scope.clearFields();

			$scope.isAddFormShowing = false;
			$scope.msg = "Contact Added";
		})
	}

	//
	$scope.clearFields = function () {
		$scope.name = ''; 
		$scope.email = ''; 
		$scope.company = ''; 
		$scope.mobile_phone = ''; 
		$scope.home_phone = ''; 
		$scope.work_phone = ''; 
		$scope.street_address = ''; 
		$scope.city = ''; 
		$scope.state = ''; 
		$scope.zipcode = '' 
	}

	//https://mycontacts-angular-udemy.firebaseio.com/
	$scope.showContactInfo = function (contact) {
		$scope.name = contact.name;
		$scope.email = contact.email; 
		$scope.company = contact.company; 
		$scope.mobile_phone = contact.phones.mobile; 
		$scope.home_phone = contact.phones.home; 
		$scope.work_phone = contact.phones.work; 
		$scope.street_address = contact.address.street_address; 
		$scope.city = contact.address.city;
		$scope.state = contact.address.state;
		$scope.zipcode = contact.address.zipcode;

		$scope.isContactInfoShowing = true;

		console.log('Getting contact info', $scope);
	}

	//
	$scope.hideContactInfo = function () {
		$scope.isContactInfoShowing = false;	
	}

	//
	$scope.editFormSubmit = function () {
		var id = $scope.id,
			record = $scope.contacts.$getRecord(id);

		record.name = $scope.name; 
		record.email = $scope.email; 
		record.company = $scope.company; 
		record.phones.mobile = $scope.mobile_phone; 
		record.phones.home = $scope.home_phone; 
		record.phones.work = $scope.work_phone; 
		record.address.street_address = $scope.street_address; 
		record.address.city = $scope.city; 
		record.address.state = $scope.state; 
		record.address.zipcode = $scope.zipcode;

		//Save contact:
		$scope.contacts.$save(record).then(function (ref) {
			console.log(ref.key);
		})

		clearFields();
		$scope.isEditContactShowing = false;
	}
}]);