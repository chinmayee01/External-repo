'use strict';
/* App Module */
var cbsExtApp = angular.module('cbsExtApp', [
'ngRoute',
'phonecatControllers'
]);
cbsExtApp.config(['$routeProvider',
function($routeProvider) {
$routeProvider.
when('/login',{
	templateUrl: 'Login.html'
}).
when('/welcome', {
	templateUrl: 'partials/welcome.html',
	controller: 'abtCtrl'
}).
when('/about', {
	templateUrl: 'partials/about.html',
	controller: 'abtCtrl'
}).
when('/dashboard', {
	templateUrl: 'partials/dashboard.html',
	controller: 'abtCtrl'
}).
when('/messageboard', {
	templateUrl: 'partials/messageboard.html',
	controller: 'abtCtrl'
}).
when('/messagereply/:messageInfo', {
	templateUrl: 'partials/messageboardreply.html',
	controller: 'messageCtrl'
	
}).
when('/report', {
	templateUrl: 'partials/report.html',
	controller: 'abtCtrl'
}).
when('/knowledgebase', {
	templateUrl: 'partials/knowledgebase.html',
	controller: 'abtCtrl'
}).
when('/welcomeadmin', {
	templateUrl: 'partials/welcomeadmin.html',
	controller: 'welcomeAdminCtrl'
}).
when('/aboutadmin', {
	templateUrl: 'partials/adminaboutcontent.html',
	controller: 'aboutAdminCtrl'
}).
when('/admingateway', {
	templateUrl: 'partials/admingatewaylink.html',
	controller: 'gatewayAdminCtrl'
}).
when('/adminreport', {
	templateUrl: 'partials/adminreportcontent.html',
	controller: 'reportAdminCtrl'
}).
when('/admindashboard', {
	templateUrl: 'partials/admindashboardcontent.html',
	controller: 'dashboardAdminCtrl'
}).
otherwise({
redirectTo: '/welcome'
});
}]);