'use strict';
/* Controllers */
var phonecatControllers = angular.module('phonecatControllers', ['ui.rCalendar']);



    phonecatControllers.service('sharedProperties', function () {
     
         var property;
        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });



phonecatControllers.controller('abtCtrl', ['$scope', '$routeParams','$http','$filter','sharedProperties','$location',function($scope, $routeParams,$http,$filter,sharedProperties,$location) {
   
	

	
	
	
	//logout functionality
	
	$scope.check="yaaa"
    
    $scope.logoutclick = function()
    {
    	console.log("I was clicked");
    	window.location.href="logout.html";
    }
		
	
	
	
	
	$scope.mycalarr = [];
	$scope.mydate = new Date;
	$scope.rep={};
	$scope.showMessageBoard = true;
	$scope.showTicketTool = true;
	$scope.showGateway = true;
	$scope.showJeera = true;
	$scope.showProject = true;
	$scope.showPreProd = true;
	$scope.knowbase = [];
	
	
	//links array for Knowledge base
	
	$scope.linkarr = ["link-tab1 active-class active1","link-tab2","link-tab3","link-tab4","link-tab5","link-tab6","link-tab7","link-tab8","link-tab9","link-tab10","link-tab11","link-tab12","link-tab13","link-tab14","link-tab15","link-tab16","link-tab17","link-tab18","link-tab19","link-tab20"];
	
    //hrefs for links 
	
	$scope.hrefs = ["#new","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

     //comment this section while uploading the code to bluemix
	    

	    $scope.call2 = function()
	    {
	    $scope.company = "Jostens";
		$http.get("http://9.182.97.204:3000/api/getExternalProjectByName/"+$scope.company).success(function(data) {
		 	console.log("Checked in");
		 
		 	
			$scope.tabtdata= data;
			$scope.knowbase = data;
			$scope.mycalarr = $scope.tabtdata[0].welcomePageSchema.Upcoming_Events;
			//$scope.userName = "Fabio Schiattarella";
			sharedProperties.setProperty($scope.userName);
		
		    $scope.callmsg($scope.company);
		    $scope.initcalendar();
		   
			});
		};	
	//rest call for getting messages
		
		$scope.callmsg = function(comp)
		{
	
		$http.get("https://9.182.97.204:3000/msg/getMessageBoardPosts").success(function(data) {
		 	
			console.log("Checked in messages");
		 	data.reverse();
			$scope.messages= data;
			$scope.messagelen = $scope.messages.length;
			
			
			$scope.mytestval = $filter('date')(new Date, "dd/MM/yyyy 'at' h:mma");
			
			$scope.setArr($scope.messages);
			//Call the function for setting color
			$scope.setclr($scope.messagelen);

			});
		
		}
		//clor function
		
		$scope.setclr = function(clrval)
		{
			var i=0;
			$scope.colorarr = [];
			while(i < clrval)
				{
				 if(i%2 != 0)
					 {
					  $scope.colorarr[i] = "#f0f0f0"
					 }
				
				
				 i++;
				}
		
		}
		
		//array for holding data for welcome page
		
		$scope.setArr = function(myArr)
		{
			var i = 0;
			$scope.resArr = [];
			while(i < myArr.length)
			{   
		        if(i == 3)
				{
					break;
				}
		        $scope.resArr[i] = myArr[i];
				
				i++;
			}
			
		}
		
		
		
		$scope.arr = [];
		
		
		//function for posting messageboard posts
		
		$scope.postClick = function(){
            $scope.user = sharedProperties.getProperty();
			
	
			$scope.arr.push("")
			$scope.tableData = {
			
			'Post':
				{
				'Reply':$scope.arr,
			    'Login_id': $scope.user,
			    'date': new Date(),
			    'Content': $scope.MessagePostText
				}
			}
			
		   console.log($scope.tableData);

			var request = $http({
				method: "POST",
				url : 'https://9.182.97.204:3000/msg/postMessageBoardPosts',
				data: $.param($scope.tableData),
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}

			});
			request.success(function(data,status,headers){
				$scope.message = data;
				
				window.location.reload();
				
			});
			request.error(function(data, status, headers){
				alert( "failure message: " + JSON.stringify(data));
			});	

			}
		
		//This is the function for sso 
		
   $http.get("http://9.182.97.204:3000/getUser").success(function(data) {
     console.log("started");
  	$scope.abtdata= data;
 	
  	console.log("this is"+$scope.abtdata.User);
  	$scope.commondata = $scope.abtdata;
  	console.log("first call completed");
  	$scope.call2();
	 $scope.userName = $scope.abtdata.user
	 console.log("and user is"+$scope.abtdata.user);
 	sharedProperties.setProperty($scope.userName);
  	$scope.callmsg($scope.commondata.Company);

 	
	 });

 
   // call this function only when you have called sso
		
  
	// $scope.call2 = function(company){
	// console.log("started2");
	// $http.get("https://localhost:6001/api/getExternalProjectByName/"+company).success(function(data) {
	//  	console.log("Checked in"+company);
	// 	$scope.tabtdata= data;
	//     $scope.mycalarr = $scope.tabtdata[0].welcomePageSchema.Upcoming_Events;
	//     $scope.initcalendar();
	//     console.log("damn"+sharedProperties.getProperty());
	// 	});
	// }
		
		
		
	$scope.changeMode = function (mode) {
        $scope.mode = mode;
    };

    $scope.today = function () {
        $scope.currentDate = new Date();
    };

    $scope.isToday = function () {
        var today = new Date(),
            currentCalendarDate = new Date($scope.currentDate);

        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    };



    //Calendar events
    
    
    
   
        
    $scope.initcalendar = function()
    {
    	 $scope.eventSource = [];
    	console.log("meh"+$scope.mycalarr[0].date);
    var calindex = 0;
    while(calindex < $scope.mycalarr.length)
    	{
    	 $scope.eventSource.push(
    			 {
    				 "title":$scope.mycalarr[calindex].Event,
    				 "startTime":$scope.mycalarr[calindex].date.toString(),
    				 "endTime":$scope.mycalarr[calindex].date.toString(),
    				 "allDay":false}
    			 );
    	 calindex++;
    	}

    
    
    }
    
    
    
    
	//for knowledge base
    //pdfs changes
    
    $scope.guideDownload = function(guide,indval)
    {
    	$scope.base = $scope.knowbase[0].knowledgeBasePageSchema;
    	
    	
    	//console.log($scope.base.Download_link+'/'+$scope.base.Project_folder+'/'+$scope.base.Tabs[indval].file_name);
    	//$http.get($scope.base.Download_link+'/'+$scope.base.Project_folder+'/'+$scope.base.Tabs[indval].file_name).success(function(data) {
    	window.location.href = $scope.base.Download_link+'/'+$scope.base.Project_folder+'/'+$scope.base.Tabs[indval].file_name;
    	//});
    	
    }
		 
		 
	

	
	}]);




phonecatControllers.controller('messageCtrl', ['$scope', '$routeParams','$http','sharedProperties',function($scope, $routeParams,$http,sharedProperties) {
	$scope.messageIndex = $routeParams.messageInfo;

	console.log($scope.messageIndex);
	
	
	//comment this section while running locally
	
	 $http.get("https://9.182.97.204:3000/getUser").success(function(data) {
    console.log("started");
 	$scope.userName= data;
 	sharedProperties.setProperty($scope.userName);
 	
	});
	
     //get all the posts in the reply section
	 $http.get("http://9.182.97.204:3000/msg/getMessageBoardPosts").success(function(data) {
	 	data.reverse();
		$scope.repliesMessage = data;
		//comment the userName line below when you are running on bluemix
		//$scope.userName = "John Smith";
		 sharedProperties.setProperty($scope.userName);
		 console
	    $scope.mydata = $scope.repliesMessage[$scope.messageIndex];
	    $scope.test = $scope.mydata;
	  
		});
        
	
	 
	 //posting the reply
	 $scope.postReply = function()
	 {   $scope.reqUser = sharedProperties.getProperty();
	
		 console.log("yaaaaaaaaaaaaaaaa"+$scope.reqUser)
		 
		 $http.get("http://9.182.97.204:3000/msg/getMessageBoardPosts").success(function(data) {
			 	$scope.replyMessage = data;
			 	  $scope.myrep = $scope.repliesMessage[$scope.messageIndex];
			 	  $scope.start($scope.myrep,$scope.reqUser);
			 	  
				});
		 
	 }
		 $scope.start = function(obj,us)
		 {
		 console.log("yeeeeeeeeeeeeee"+obj._id);
		 $scope.arr = obj.Post.Reply;
		 console.log($scope.arr);
		 console.log(us);
		 
			$scope.arr.push(
					{
			               "Login_id": us,
			               "date": new Date,
			               "Content": $scope.replyfield
			              
			        }		
			);
			$scope.tableData = {
			
			'Post':
				{
				'Reply':$scope.arr,
			    'Login_id': obj.Post.Login_id,
			    'date': obj.Post.date,
			    'Content': obj.Post.Content
				}
			}
			
			

			

			console.log($scope.tableData);

			var request = $http({
				method: "PUT",
				url : 'https://9.182.97.204:3000/msg/updateMessageBoardPosts/'+obj._id,
				data: $.param($scope.tableData),
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}

			});
			request.success(function(data,status,headers){
				$scope.message = data;
				
				window.location.reload();
				
			});
			request.error(function(data, status, headers){
				alert( "failure message: " + JSON.stringify(data));
			});	
		 
		 
		 }
		 
		 
		 
	
	
			

	
	}]);



phonecatControllers.controller('logoutCtrl', ['$scope', '$routeParams','$http','$filter','sharedProperties','$location',function($scope, $routeParams,$http,$filter,sharedProperties,$location) {
console.log("hi");
$scope.$on('$locationChangeStart', function(event, next, current){            
    // Here you can take the control and call your own functions:
    alert('Sorry ! Back Button is disabled');
    // Prevent the browser default action (Going back):
    event.preventDefault();            
});
}]);


