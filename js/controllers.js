angular.module('starter.controllers', [])
.controller('loginCtrl', function($scope,$timeout,$cordovaNetwork,$cordovaDialogs,$location,$ionicLoading,$ionicPopup,$ionicTabsDelegate,$http,$rootScope) {
	// alert();
	$scope.loginData={username:'',password:''};
	$scope.hidetabb=$rootScope.hidetab;
	//alert($cordovaNetwork.getNetwork());
	if(localStorage.getItem('access_token')==null){
		//$location.path("/login");
	}
	else
	{
		// $http.get('http://app.sterlinghsa.com/api/v1/accounts/portfolio',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':localStorage.getItem('access_token')} })
	                 // .success(function(data){
			            // alert(JSON.stringify(data.account_types));
						
		                  // $rootScope.acctype=data.account_types;
			               // alert(JSON.stringify($rootScope.acctype));
						  // if($scope.acctype.HSA==null)
						  // {
							  // $scope.hidetabb=false;
							  // $location.path('/app/hra');
						  // }
						  // else if($scope.acctype.FSA==null){
							  
							  // $scope.hidetabb=false;
							  // $location.path('/app/hra');
							  
						  // }
						   // else if($scope.acctype.HRA==null){
							 // $scope.hidetabb=true;
							   // $location.path('/app/hsa');
							  
						  // }
		 

		      // }).error(function(err){
					// alert(JSON.stringify(err));
         
   
     // });
		window.location.href = 'index.html#/app/hsa';
	}
 
    $scope.logIn = function (loginData) {
		$ionicLoading.show({
		  template: '<ion-spinner icon="ios"></ion-spinner><br>Loading...'
		});
		
		if($cordovaNetwork.isOffline())
			
    {
		
      $ionicLoading.hide();
       $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
       . then(function() {
                         });
        return false;
    }
		
		//$scope.username=loginData.username;
		//$scope.password=loginData.password;
		//alert(loginData.username+"=="+loginData.password);
		else if($scope.loginData.username==""){
			$ionicLoading.hide()
			
			$cordovaDialogs.alert('Please Enter Username', 'Sorry', 'OK')
			.then(function() {
			});
			return false;
			
		}
		else if($scope.loginData.password=="")
		{
			$ionicLoading.hide()
			$cordovaDialogs.alert('Please Enter Password', 'Sorry', 'ok')
			.then(function() {
			});
			return false;
		}
		else
		{
			$http.post(' http://app.sterlinghsa.com/api/v1/user/login',{username:$scope.loginData.username,password:$scope.loginData.password},{headers: {'Content-Type':'application/json; charset=utf-8'} })     
			.success(function(data) {
				
				//alert("Success-"+JSON.stringify(data));
				 if(data.status == "SUCCESS"){
					 $ionicLoading.hide()
					 
					localStorage.setItem('access_token',data.access_token);
					localStorage.setItem('username',$scope.loginData.username);
					 // alert(JSON.stringify($scope.acctype));
					// alert($scope.access_token);
					
					// alert(localStorage.getItem('access_token')+"--"+localStorage.getItem('username'));
					
					//$location.path("/app/portfolio");
					window.location.href = 'index.html#/app/hsa';				
				}else if(data.status=="FAILED"){
					 $ionicLoading.hide()
					 $cordovaDialogs.alert('Username or password is incorrect ', 'Sorry', 'OK')
					.then(function() {
					});
					return false;
				}
				 
			}).error(function(err){		

				// $cordovaDialogs.alert('Session expired, Please Login Again', 'Sorry', 'OK')
				// .then(function() {
				// });
				// return false;
				//alert("Error :="+JSON.stringify(err));
			    /* if (data.status === 400 && !(loginData.username.$invalid || loginData.password.$invalid)) {
                errorMessage = 'Incorrect Username or Password';
				 alert("FAILED LOGIN" + errorMessage);
            } else if (data.status === 500) {
                errorMessage = 'Could not connect to server';
            }  */
			    
        });
		}
		//window.location.href = 'index.html#/hsa';
    }
})


.controller('HsaCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$ionicHistory,$ionicTabsDelegate) {
	
	$scope.goForward = function () {
		
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }
    
	localStorage.setItem("backCount","2");
	
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	// if($cordovaNetwork.isOffline())
    // {
      // $ionicLoading.hide();
      // $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
     // .then(function() {
      // });
      // return false;
    // }
	// else
	// {
		$http.get('http://app.sterlinghsa.com/api/v1/accounts/portfolio',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	    .success(function(data){
			 // alert(JSON.stringify(data.account_types.HRA));
		    $rootScope.acctype=data.account_types;
		    if(data.account_types.HSA!=undefined){
				localStorage.setItem('account_types',data.account_types.HSA);
				$scope.account_type=data.account_types.HSA;
				$rootScope.hsaaccno=data.account_types.HSA.ACCT_NUM;
				$rootScope.hsaaccId=data.account_types.HSA.ACCT_ID;
			}else if(data.account_types.FSA!=undefined){
				localStorage.setItem('account_types',data.account_types.FSA);
				$scope.account_types=data.account_types.FSA;
				$rootScope.fsaaccno=data.account_types.FSA.ACCT_NUM;
				$rootScope.fsaaccId=data.account_types.FSA.ACCT_ID;
			}else if(data.account_types.HRA!=undefined){
				localStorage.setItem('account_types',data.account_types.HRA);
				$scope.account_types=data.account_types.HRA;
				$rootScope.hraaccno=data.account_types.HRA.ACCT_NUM; 
				$rootScope.hraaccId=data.account_types.HRA.ACCT_ID;
			}
		 
				$http.get(' http://app.sterlinghsa.com/api/v1/accounts/accountinfo',{params:{'type':'hsa','acc_num': data.account_types.HSA.ACCT_NUM},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
				.success(function(data){
					//alert(JSON.stringify(data));
					$scope.contributions=data.total_contributions.CURRENT_YR_CONTRB;
				}).error(function(err){
					//alert(JSON.stringify(err));
				});
		 
		      }).error(function(err){
				   // alert(JSON.stringify(err));
         $ionicLoading.hide();
        $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
        });
          return false;
   
     });
   // }
	
	
})



.controller('FsaCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$ionicTabsDelegate,$ionicSideMenuDelegate) {
	 
	 

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }
	
	localStorage.setItem("backCount","2");
	//REST API
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	// if($cordovaNetwork.isOffline())
    // {
     // $ionicLoading.hide();
     // $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
     // .then(function() {
      // });
      // return false;
    // }
	// else
	// {
	  $http.get('http://app.sterlinghsa.com/api/v1/accounts/portfolio',{headers: {'Content-Type':'application/json;  charset=utf-8','Authorization':$scope.access_token} })
	 .success(function(data){
		//alert("Success-"+JSON.stringify(data));
		localStorage.setItem('account_types',data.account_types.HSA);
		localStorage.setItem('account_types',data.account_types.FSA);
		$rootScope.acctype=data.account_types;
		$scope.account_type=data.account_types.HSA;
		$scope.account_types=data.account_types.FSA;
		$rootScope.hsaaccno=data.account_types.HSA.ACCT_NUM;
		$rootScope.fsaaccno=data.account_types.FSA.ACCT_NUM;
		$rootScope.hsaaccId=data.account_types.HSA.ACCT_ID;
		$rootScope.fsaaccId=data.account_types.FSA.ACCT_ID;
	}).error(function(err){
       $ionicLoading.hide();
     $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
      });
      return false;
   
  });
 // }
 $scope.goforward=function(){
	 
        if($scope.acctype.HRA==null)
		{	   							 
	       $location.path('/app/cobra');				  
		}
		else
		{
	      $location.path('/app/hra');  
		}
						 

		// $location.path("app/hra");
	}
	
})

.controller('heading', function($scope,$location,$rootScope,$stateParams, $cordovaDialogs, Chats) {
	
  var i=0;
  $rootScope.hidecontent=false;
  $scope.selectColor="#496E9B";
  $scope.hsa="#496E9B";
  $scope.deselectColor="#6CA0DA";
  $scope.fsa="#6CA0DA";
  $scope.showingMenu=false;
  
 
$scope.show1 = false;
  // $scope.show2 = false;
  $scope.click1 = function($event) { 
    $event.stopPropagation();
    $scope.show1 = !$scope.show1;
    // $scope.show2 = false;
      // $ionicListDelegate.closeOptionButtons(); 
	}
	
 
  $scope.hideAll = function() { 
    // $scope.show2 = false;
    $scope.show1 = false;
    $ionicListDelegate.closeOptionButtons(); }



 // $scope.openNav=function()
  // {
	  // document.getElementById("mySidenav").style.width = "250px";
	  
  // }
  
   // $scope.closeNav=function() {
		  // document.getElementById("mySidenav").style.width = "0";
	  // }

  $scope.changecolor1=function()
  {
		$scope.hsa=$scope.selectColor;
		$scope.fsa=$scope.deselectColor;
		$location.path("app/hsa");
  }
  $scope.changecolor2=function()
  {
		$scope.hsa=$scope.deselectColor;
		$scope.fsa=$scope.selectColor;
		$location.path("/fsa");
  }
  
  $scope.menushowhide=function()
  {
		if(i==0)
		{
			i=1;
			$scope.showingMenu=true;
		}
		else
		{
			i=0;
			$scope.showingMenu=false;
		}
  }
  
  $scope.contctUs=function()
  {
	  alert("are you want to logout")
  }
  
  // $scope.logOut=function()
  // {
	   // $cordovaDialogs.confirm('Do you want to Logout', 'Are you sure', ['Yes','No'])
		// .then(function(buttonIndex) {
			// if(buttonIndex=="1")
			// {
				// localStorage.clear();
				// window.location='login.html#/login';
			// }
		  
		// });
	  
  // }
  $scope.openMenu=function(){
	  //alert();
	   $ionicSideMenuDelegate.toggleLeft();
  }
  
   // $scope.gesture = {
    // used: ''
  // };  
 
  // $scope.onGesture = function(gesture) {
    // $scope.gesture.used = gesture;
    // console.log(gesture);
  // }
 
  // var element = angular.element(document.querySelector('#content')); 
   
  // $ionicGesture.on('tap', function(e){
    // $scope.$apply(function() {
      // console.log('Tap');
      // $scope.gesture.used = 'Tap';
    // })    
  // }, element);

})
.controller('PortfolioCtrl', function($rootScope,$scope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	localStorage.setItem("backCount","1");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	if($cordovaNetwork.isOffline())
    {
      $ionicLoading.hide();
       $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
       . then(function() {
                         });
        return false;
    }
	else
	{
	  $http.get('http://app.sterlinghsa.com/api/v1/accounts/portfolio',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	  .success(function(data){
		
		localStorage.setItem('account_types',data.account_types.HSA);
		localStorage.setItem('account_types',data.account_types.FSA);
		
		$scope.account_type=data.account_types.HSA;
		$scope.account_types=data.account_types.FSA;
		$rootScope.hsaaccno=data.account_types.HSA.ACCT_NUM;
		$rootScope.fsaaccno=data.account_types.FSA.ACCT_NUM;
		$rootScope.hsaaccId=data.account_types.HSA.ACCT_ID;
		$rootScope.fsaaccId=data.account_types.FSA.ACCT_ID;
		$rootScope.hsaacctype=data.account_types.HSA.ACCOUNT_TYPE;
		
		}).error(function(err){
   // $ionicLoading.hide();
   // $cordovaDialogs.alert('Session expired, Please Login Again', 'Sorry', 'ok')
   // .then(function() {
   // });
   
  });
 }
	
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})

//FSA controller Start
.controller('FlexibleCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$cordovaSQLite,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","2");

	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
	
	
})
.controller('AvailablebalanceCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
    $scope.fsaccno=$rootScope.fsaaccno;
	localStorage.setItem("backCount","3");
	// $scope.username = localStorage.getItem('username');
	 $scope.access_token = localStorage.getItem('access_token');
	 // $scope.fsaaccId=$rootScope.fsaaccId;
	// $http.get(" http://app.sterlinghsa.com/api/v1/accounts/plan-type",{params:{'acct_id':$scope.fsaaccId},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// alert( JSON.stringify(data));
		
		// //$scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   // alert( JSON.stringify(err));
  // });
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
   .then(function() {
   });
   return false;
 }else{
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){
		  //alert( JSON.stringify(data)); 
			$rootScope.available_balances = data.available_balances;
	 }).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	$scope.goback=function()
	{
		 $rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/fsa")
	}
})

.controller('InformationCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	 $scope.acc=$rootScope.fsaaccno;

    if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
   .then(function() {
   });
   return false;
 }else{	 
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/accountinfo",{params:{'type':'fsa','acc_num':$scope.acc},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){ 
				$scope.accnumber=data.account_information;
	 }).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	 
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		 //window.history.back();
		$location.path("app/fsa");
	}

})
.controller('NewCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	// $rootScope.hidecontent=true;
	//alert();
	localStorage.setItem("backCount","2");
		$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	 $scope.fsaaccId=$rootScope.fsaaccId;
	 $scope.fsaccno=$rootScope.fsaaccno;
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){
		  //alert( JSON.stringify(data)); 
			$scope.available_balances = data.available_balances;
	 })
	
		 $http.get(" http://app.sterlinghsa.com/api/v1/accounts/plan-type",{params:{'acct_id':$scope.fsaaccId},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		$scope.plan_types=data.plan_types;
		
	  
	}).error(function(err){
  // alert( JSON.stringify(err));
  });
  $scope.plan_type={};
  
 
  
  
  $scope.redirectTo=function(claim){
 	//alert(JSON.stringify(claim.MEANING));
	  for(var i=0;i<$scope.available_balances.length;i++){
		  
		  if($scope.available_balances[i].PLAN_TYPE==claim.LOOKUP_CODE){
			$rootScope.newclaim_balance =$scope.available_balances[i].BALANCE;
			$rootScope.newclaim_plantype=$scope.available_balances[i].PLAN_DESC;
			//alert(JSON.stringify($rootScope.newclaim_plantype));
		  }
	  }
	if(claim.MEANING === 'Dependent Care FSA'){
		// alert('hello')
		$rootScope.patientname=true;
		$rootScope.dependentName=true;
		$rootScope.taxcontent=true;
		$location.path("/newclaim");
		
	
	}else if(claim.MEANING === 'Transit FSA'){
		$rootScope.patientname=false;
		$rootScope.dependentName=false;
		$rootScope.taxcontent=false;
		$location.path("/newclaim");
		
		
	}else if(claim.MEANING === 'Limited Purpose Healthcare FSA'){
		$rootScope.patientname=true;
		$rootScope.dependentName=false;
		$rootScope.taxcontent=false;
		$location.path("/newclaim");
	}else if(claim.MEANING === 'Parking FSA'){
	    $rootScope.patientname=false;
		$rootScope.dependentName=false;
		$rootScope.taxcontent=false;
		$location.path("/newclaim");
		
	}
	
	// if(claim.MEANING === 'Dependent Care FSA'){
		// // alert('hello')
		
		// $location.path("/newclaim");
		
	
	// }else if(claim.MEANING === 'Transit FSA'){
		
		// $location.path("/transit");
		
		
	// }else if(claim.MEANING === 'Limited Purpose Healthcare FSA'){
		
		// $location.path("/newclaimbicycle");
	// }else if(claim.MEANING === 'Parking FSA'){
	
		// $location.path("/parking");
		
	// }
	
  }

  
  
  // $scope.redirectTo=function(claim){
	  
	// if(claim == 'Dependent Care FSA'){
		// $location.path("/newclaim");
	// }
		
	  
  // }
  
  
		// // if(claim =='Bicycle'){
			
			// $location.path("newclaim");
		// }else if(claim =='Transit'){
			// $location.path("newclaimbicycle");
		// }   
		
		// $scope.someinit=function(){
		// alert();
		// return 'select plan';
	// }
	
	$scope.goback=function()
	{
		// $rootScope.hidecontent=false;
		//window.history.back();
		 $location.path("app/fsa");
		 //$scope.someinit();
	}
})

.controller('fsapayproviderCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	// $rootScope.hidecontent=true;
	//alert();
	localStorage.setItem("backCount","2");
		$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	 $scope.fsaaccId=$rootScope.fsaaccId;
	 $scope.fsaccno=$rootScope.fsaaccno;
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){
		 // alert( JSON.stringify(data)); 
			$scope.available_balances = data.available_balances;
	 })
	
		 $http.get(" http://app.sterlinghsa.com/api/v1/accounts/plan-type",{params:{'acct_id':$scope.fsaaccId},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		$rootScope.plan_types=data.plan_types;
		
	  
	}).error(function(err){
  // alert( JSON.stringify(err));
  });
  
  $scope.redirectTo=function(claim){
 	//alert(JSON.stringify(claim.MEANING));
	  for(var i=0;i<$scope.available_balances.length;i++){
		  
		  if($scope.available_balances[i].PLAN_TYPE==claim.LOOKUP_CODE){
			$rootScope.newclaim_balance =$scope.available_balances[i].BALANCE;
			$rootScope.newclaim_plantype=$scope.available_balances[i].PLAN_DESC;
			//alert(JSON.stringify($rootScope.newclaim_plantype));
		  }
	  }
	if(claim.MEANING === 'Dependent Care FSA'){
		// alert('hello')
		$rootScope.patientname=true;
		$rootScope.dependentName=true;
		$rootScope.taxcontent=true;
		$location.path("/fsadependent");
	
	}else if(claim.MEANING === 'Transit FSA'){
		$rootScope.patientname=false;
		$rootScope.dependentName=false;
		$rootScope.taxcontent=false;
		$location.path("/fsadependent");
		
	}else if(claim.MEANING === 'Limited Purpose Healthcare FSA'){
		$rootScope.patientname=true;
		$rootScope.dependentName=false;
		$rootScope.taxcontent=false;
		$location.path("/fsadependent");
	}else if(claim.MEANING === 'Parking FSA'){
		$rootScope.patientname=false;
		$rootScope.dependentName=false;
		$rootScope.taxcontent=false;
		$location.path("/fsadependent");
	}
  }

  
  
  // $scope.redirectTo=function(claim){
	  
	// if(claim == 'Dependent Care FSA'){
		// $location.path("/newclaim");
	// }
		
	  
  // }
  
  
		// // if(claim =='Bicycle'){
			
			// $location.path("newclaim");
		// }else if(claim =='Transit'){
			// $location.path("newclaimbicycle");
		// }   
	
	$scope.goback=function()
	{
		 $rootScope.hidecontent=false;
		//window.history.back();
		 $location.path("app/fsa");
	}
})




.controller('newclaimCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$ionicScrollDelegate,$rootScope,$cordovaCamera) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.access_token = localStorage.getItem('access_token');
    $scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	$scope.fsaaccno=$rootScope.fsaaccno;
	$scope.fsaaccId=$rootScope.fsaaccId;
	$scope.plan_types=$rootScope.plan_types;
	$scope.newclaim_plantype=$rootScope.newclaim_plantype;
	$scope.newclaim_balance=$rootScope.newclaim_balance;
    $scope.newclaimvalues={taxid:'',amount:'',dependent:'',patient:'',Bankaccount:'',startTransDate:'',endTransDate:''};
	$scope.imgSrc=[];
	 
	 $ionicScrollDelegate.scrollBottom(true);
	
	
	 $scope.goback=function()
	{
		// $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("new");
	}
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					//$scope.imgSrc= imageData;
					 $scope.imgSrc.push(imageData);
				}, function(err) {
				});
			}
		});
		return false;
	}
   $scope.deleteimg=function($index){
		
		$scope.imgSrc.splice($index,1)
	}
   
   $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
   
   $http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		
		$scope.bank_details=data.bank_details;
   
   
  }).error(function(err){
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
   
   // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// //alert( JSON.stringify(data));
		
		// $scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   
  // });
  
   // $http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		 // // alert( JSON.stringify(data)); 
			// $rootScope.available_balances = data.available_balances.BALANCE;
			// //alert(JSON.stringify($rootScope.available_balances));
	 // }).error(function(err){
   
   // //alert( JSON.stringify(err)); 
  // });
  
   $scope.startTransDate="";
   $scope.endTransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
				
					$scope.newclaimvalues.startTransDate=selectedDate;
					
				});
			})
		
	};
	$scope.EndgetTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.newclaimvalues.endTransDate=selectedDate;
				});
			})
		
	};
	$scope.newclaimsubmit=function(){
		
		if($scope.newclaimvalues.amount == 0){
		$cordovaDialogs.alert('Please enter the amount greater than 0','Sorry','OK')
			.then(function() {
			//$scope.newclaimvalues={};		
		});
		
	}else{
		$ionicLoading.show({
		  template: '<ion-spinner icon="ios"></ion-spinner><br>Loading...'
		});
		
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
    'bank_acct_id':$scope.newclaimvalues.Bankaccount.BANK_ACC_ID,
   'amount':$scope.newclaimvalues.amount,
   
   'service_start_date':$scope.newclaimvalues.startTransDate,
   'service_end_date':$scope.newclaimvalues.endTransDate,
   'patient_name':$scope.newclaimvalues.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':'',
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.newclaimvalues.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		
		if(data.status == "SUCCESS"){
			
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				 $scope.newclaimvalues={};
					
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				      $scope.newclaimvalues={};
					
				 
					 
				     
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
	}
		
	}
	
})

.controller('fsadependentCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$ionicScrollDelegate,$rootScope,$cordovaCamera) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.access_token = localStorage.getItem('access_token');
   
	$scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	$scope.fsaaccno=$rootScope.fsaaccno;
	$scope.fsaaccId=$rootScope.fsaaccId;
	$scope.plan_types=$rootScope.plan_types;
	$scope.newclaim_plantype=$rootScope.newclaim_plantype;
	$scope.newclaim_balance=$rootScope.newclaim_balance;
    $scope.newclaimvalues={taxid:'',amount:'',dependent:'',patient:'',Bankaccount:'',startTransDate:'',endTransDate:''};
	$scope.imgSrc=[];
	 
	 $ionicScrollDelegate.scrollBottom(true);
	 $scope.goback=function()
	{
		// $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("fsapayprovider");
	}
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					//$scope.imgSrc= imageData;
					 $scope.imgSrc.push(imageData);
				}, function(err) {
				});
			}
		});
		return false;
	}
	
	$scope.deleteimg=function($index){
		
		$scope.imgSrc.splice($index,1)
	}
   
   $scope.newclaimFsa=function(){
	   
	   if($scope.newclaimvalues.amount == 0){
		$cordovaDialogs.alert('Please enter the amount greater than 0','Sorry','OK')
			.then(function() {
			// $scope.newclaimvalues={};	
		});
		
	}else{
		$ionicLoading.show({
		  template: '<ion-spinner icon="ios"></ion-spinner><br>Loading...'
		});
		
	   $http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
      'bank_acct_id':'',
   'amount':$scope.newclaimvalues.amount,
   
   'service_start_date':$scope.newclaimvalues.startTransDate,
   'service_end_date':$scope.newclaimvalues.endTransDate,
   'patient_name':$scope.newclaimvalues.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':$scope.newclaimvalues.selectpayee.VENDOR_ID,
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.newclaimvalues.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				 $scope.newclaimvalues={};
				
				  // $scope.myForm.$setPristine();		
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				     	
					 		 
                     // $scope.ds=false;						
				   $scope.newclaimvalues={};
				  // $scope.myForm.$setPristine();
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
		//alert( JSON.stringify(err));
	})
   }
   
 
		
   }
    
   
   $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
   
   // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// //alert( JSON.stringify(data));
		
		// $scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   
  // });
  
   // $http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		 // // alert( JSON.stringify(data)); 
			// $rootScope.available_balances = data.available_balances.BALANCE;
			// //alert(JSON.stringify($rootScope.available_balances));
	 // }).error(function(err){
   
   // //alert( JSON.stringify(err)); 
  // });
  
   $scope.startTransDate="";
   $scope.endTransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
				
					$scope.newclaimvalues.startTransDate=selectedDate;
					
				});
			})
		
	};
	$scope.EndgetTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.newclaimvalues.endTransDate=selectedDate;
				});
			})
		
	};
	
		
	
})


.controller('NewclaimbicycleCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$cordovaCamera) {
		$rootScope.hidecontent=true;
	 localStorage.setItem("backCount","3");
	 
	$scope.access_token = localStorage.getItem('access_token');
    $scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	$scope.fsaaccno=$rootScope.fsaaccno;
	$scope.fsaaccId=$rootScope.fsaaccId;
	$scope.plan_types=$rootScope.plan_types;
	$scope.imgSrc=[];
	 $scope.goback=function()
	{
		 $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("new");
	}
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					//$scope.imgSrc= imageData;
					 $scope.imgSrc.push(imageData);
				}, function(err) {
				});
			}
		});
		return false;
	}
   
   
   $scope.newclaimsubmit=function(){
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
    'bank_acct_id':$scope.newclaimvalues.Bankaccount.BANK_ACC_ID,
   'amount':$scope.newclaimvalues.amount,
   
   'service_start_date':$scope.newclaimvalues.startTransDate,
   'service_end_date':$scope.newclaimvalues.endTransDate,
   'patient_name':$scope.newclaimvalues.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':'',
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.newclaimvalues.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				 $scope.paymeValues={};
					
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				      $scope.paymeValues={};
					 	
					 		 
                     // $scope.ds=false;						
				 
				 
					 
				     
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
   }
	
    $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
   
   // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// //alert( JSON.stringify(data));
		
		// $scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   
  // });
  
   // $http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		  // alert( JSON.stringify(data)); 
			// $scope.available_balances = data.available_balances;
	 // }).error(function(err){
   
   
  // });
   
   $scope.TransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.TransDate=selectedDate;
				});
			})
		
	};
	
})
.controller('fsahealthcareCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$cordovaCamera) {
		$rootScope.hidecontent=true;
	 localStorage.setItem("backCount","3");
	 
	 $scope.access_token = localStorage.getItem('access_token');
    $scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	 $scope.fsaaccno=$rootScope.fsaaccno;
	 $scope.fsaaccId=$rootScope.fsaaccId;
	 $scope.plan_types=$rootScope.plan_types;
	
	
	 $scope.goback=function()
	{
		 $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("fsapayprovider");
	}
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}
		});
		return false;
	}
   
   $scope.newclaimsubmit=function(){
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
    'bank_acct_id':$scope.newclaimvalues.Bankaccount.BANK_ACC_ID,
   'amount':$scope.newclaimvalues.amount,
   
   'service_start_date':$scope.newclaimvalues.startTransDate,
   'service_end_date':$scope.newclaimvalues.endTransDate,
   'patient_name':$scope.newclaimvalues.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':'',
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.newclaimvalues.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				 $scope.paymeValues={};
				$scope.paymeValues={};
				  $scope.myForm.$setPristine();
				  $scope.myForm.$error={};
				  $scope.myForm.$setPristine();		
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				      $scope.paymeValues={};
					  $scope.myForm.$setPristine();		
					 		 
                     // $scope.ds=false;						
				  $scope.paymeValues={};
				  $scope.myForm.$setPristine();
				 
					 
				     
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
   }
	
    $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
   
   // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// //alert( JSON.stringify(data));
		
		// $scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   
  // });
  
   // $http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		  // alert( JSON.stringify(data)); 
			// $scope.available_balances = data.available_balances;
	 // }).error(function(err){
   
   
  // });
   
   $scope.TransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.TransDate=selectedDate;
				});
			})
		
	};
	
})

.controller('transitCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$cordovaCamera) {
		$rootScope.hidecontent=true;
	 localStorage.setItem("backCount","3");
	 
	 $scope.access_token = localStorage.getItem('access_token');
    $scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	 $scope.fsaaccno=$rootScope.fsaaccno;
	 $scope.fsaaccId=$rootScope.fsaaccId;
	 $scope.plan_types=$rootScope.plan_types;
	 $scope.transit={Bankaccount:'',amount:'',description:'',startTransDate:'',endTransDate:''};
	
	$scope.newclaim_balance=$rootScope.newclaim_balance;
	 $scope.goback=function()
	{
		 $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("new");
	}
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}
		});
		return false;
	}
   
   $scope.newclaimsubmit=function(){
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
    'bank_acct_id':$scope.transit.Bankaccount.BANK_ACC_ID,
   'amount':$scope.transit.amount,
   
   'service_start_date':$scope.transit.startTransDate,
   'service_end_date':$scope.transit.endTransDate,
   'patient_name':$scope.transit.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':'',
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.transit.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id , 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				 $scope.transit={};
				$scope.transit={};
				  $scope.myForm.$setPristine();
				  $scope.myForm.$error={};
				  $scope.myForm.$setPristine();		
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				      $scope.transit={};
					  $scope.myForm.$setPristine();		
					 		 
                     // $scope.ds=false;						
				  $scope.transit={};
				  $scope.myForm.$setPristine();
				 
					 
				     
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
   }
	
    $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
   
   if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
   .then(function() {
   });
   return false;
 }else{
   $http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		
		$scope.bank_details=data.bank_details;
   
   
  }).error(function(err){
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
   
   // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'fsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// //alert( JSON.stringify(data));
		
		// $scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   
  // });
  
   // $http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		  // alert( JSON.stringify(data)); 
			// $scope.available_balances = data.available_balances;
	 // }).error(function(err){
   
   
  // });
   
   $scope.startTransDate="";
   $scope.endTransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
				
					$scope.transit.startTransDate=selectedDate;
					
				});
			})
		
	};
	$scope.EndgetTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.transit.endTransDate=selectedDate;
				});
			})
		
	};

	
})

.controller('fsatransitCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$cordovaCamera) {
		$rootScope.hidecontent=true;
	 localStorage.setItem("backCount","3");
	 
	 $scope.access_token = localStorage.getItem('access_token');
   $scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	 $scope.fsaaccno=$rootScope.fsaaccno;
	 $scope.fsaaccId=$rootScope.fsaaccId;
	 $scope.plan_types=$rootScope.plan_types;
	$scope.transit={Bankaccount:'',amount:'',description:'',startTransDate:'',endTransDate:''};
	
	$scope.newclaim_balance=$rootScope.newclaim_balance;
	 $scope.goback=function()
	{
		 $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("fsapayprovider");
	}
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}
		});
		return false;
	}
   
   $scope.newclaimsubmit=function(){
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
    'bank_acct_id':'',
   'amount':$scope.transit.amount,
   
   'service_start_date':$scope.transit.startTransDate,
   'service_end_date':$scope.transit.endTransDate,
   'patient_name':$scope.transit.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':$scope.transit.selectpayee.VENDOR_ID,
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.transit.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				 $scope.transit={};
				
				  // $scope.myForm.$setPristine();
				  // $scope.myForm.$error={};
				  // $scope.myForm.$setPristine();		
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				         $scope.transit={};
					 
					 		 
                     // $scope.ds=false;						
				 
				 
				 
					 
				     
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
		
  //alert( JSON.stringify(err));
  });
   }
	
    $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
   
   // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'fsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// //alert( JSON.stringify(data));
		
		// $scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   
  // });
  
   // $http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		  // alert( JSON.stringify(data)); 
			// $scope.available_balances = data.available_balances;
	 // }).error(function(err){
   
   
  // });
   
    $scope.startTransDate="";
   $scope.endTransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
				
					$scope.transit.startTransDate=selectedDate;
					
				});
			})
		
	};
	$scope.EndgetTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.transit.endTransDate=selectedDate;
				});
			})
		
	};

	
})


.controller('parkingCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$cordovaCamera) {
		$rootScope.hidecontent=true;
	 localStorage.setItem("backCount","3");
	 
	 $scope.access_token = localStorage.getItem('access_token');
   $scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	 $scope.fsaaccno=$rootScope.fsaaccno;
	 $scope.fsaaccId=$rootScope.fsaaccId;
	 $scope.plan_types=$rootScope.plan_types;
	$scope.parking={Bankaccount:'',amount:'',description:'',startTransDate:'',endTransDate:''};
	
	$scope.newclaim_balance=$rootScope.newclaim_balance;
	 $scope.goback=function()
	{
		 $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("new");
	}
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}
		});
		return false;
	}
   
   if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
   .then(function() {
   });
   return false;
 }else{
   $http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		
		$scope.bank_details=data.bank_details;
   
   
  }).error(function(err){
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
    $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
   
   $scope.newclaimsubmit=function(){
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
    'bank_acct_id':$scope.parking.Bankaccount.BANK_ACC_ID,
   'amount':$scope.parking.amount,
   
   'service_start_date':$scope.parking.startTransDate,
   'service_end_date':$scope.parking.endTransDate,
   'patient_name':$scope.parking.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':'',
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.parking.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				 $scope.parking={};
				$scope.parking={};
				  $scope.myForm.$setPristine();
				  $scope.myForm.$error={};
				  $scope.myForm.$setPristine();		
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				      $scope.parking={};
					  $scope.myForm.$setPristine();		
					 		 
                     // $scope.ds=false;						
				  $scope.parking={};
				  $scope.myForm.$setPristine();
				 
					 
				     
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
   }
	
   
   // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// //alert( JSON.stringify(data));
		
		// $scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   
  // });
  
   // $http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		  // alert( JSON.stringify(data)); 
			// $rootScope.available_balances = data.available_balances.BALANCE;
	 // }).error(function(err){
   
   
  // });
   
    $scope.startTransDate="";
   $scope.endTransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
				
					$scope.parking.startTransDate=selectedDate;
					
				});
			})
		
	};
	$scope.EndgetTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.parking.endTransDate=selectedDate;
				});
			})
		
	};

	
})
.controller('fsaparkingCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$cordovaCamera) {
		$rootScope.hidecontent=true;
	 localStorage.setItem("backCount","3");
	 
	 $scope.access_token = localStorage.getItem('access_token');
    $scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	 $scope.fsaaccno=$rootScope.fsaaccno;
	 $scope.fsaaccId=$rootScope.fsaaccId;
	 $scope.plan_types=$rootScope.plan_types;
	$scope.parking={selectpayee:'',amount:'',description:'',startTransDate:'',endTransDate:''};
	
	$scope.newclaim_balance=$rootScope.newclaim_balance;
	 $scope.goback=function()
	{
		 $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("fsapayprovider");
	}
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}
		});
		return false;
	}
    $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.fsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
   
   $scope.newclaimsubmit=function(){
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
    'bank_acct_id':'',
   'amount':$scope.parking.amount,
   
   'service_start_date':$scope.parking.startTransDate,
   'service_end_date':$scope.parking.endTransDate,
   'patient_name':$scope.parking.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':$scope.parking.selectpayee.VENDOR_ID,
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.parking.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				  $scope.parking={};
					
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				      $scope.parking={};
					 
					 		 
                     // $scope.ds=false;						
				 
				     
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
   }
   
   // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	// .success(function(data){
		// //alert( JSON.stringify(data));
		
		// $scope.Availablebalance=data.balances.BALANCE;
	// }).error(function(err){
   
  // });
  
   // $http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.fsaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		  // alert( JSON.stringify(data)); 
			// $rootScope.available_balances = data.available_balances.BALANCE;
	 // }).error(function(err){
   
   
  // });
   
   $scope.startTransDate="";
   $scope.endTransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
				
					$scope.parking.startTransDate=selectedDate;
					
				});
			})
		
	};
	$scope.EndgetTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.parking.endTransDate=selectedDate;
				});
			})
		
	};

	
})


.controller('MakeCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	//alert();
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		// window.history.back();
		$location.path("/app/hsa");
	}
	
})

.controller('ActivityCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
 }else{
	 $http.get('  http://app.sterlinghsa.com/api/v1/accounts/categories',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.alert('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function() {
   });
   return false;
   
  });
 }
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		// window.history.back();
		$location.path("app/hsa");
	}
	
})

.controller('activityContributionyCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	
	 
	$scope.goback=function()
	{
		// $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("activity");
	}
	
})
.controller('HealthCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		// window.history.back();
		$location.path("app/hsa");
	}
})


.controller('AccountCtrl', function($rootScope,$scope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$ionicHistory) {
	$scope.Back=function()
	{
		$location.path("app/hsa");
	}
	localStorage.setItem("backCount","3");
	
	// $rootScope.hidecontent=true;
	
	//$ionicHistory.clearHistory();
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.acc_num=$rootScope.hsaaccno;
	// if($cordovaNetwork.isOffline())
 // {
   // $ionicLoading.hide();
   // $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
   // .then(function() {
   // });
   // return false;
 // }else{
   $http.get(' http://app.sterlinghsa.com/api/v1/accounts/accountinfo',{params:{'type':'hsa','acc_num': $scope.acc_num},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
  .success(function(data){
   $ionicLoading.hide();
   // alert(JSON.stringify(data));
   localStorage.setItem('account_information',data.account_information);
   localStorage.setItem('total_contributions',data.total_contributions);
   $scope.account_information=data.account_information;
   //$scope.total_contributions = localStorage.getItem('total_contributions');
   $rootScope.total_contributions = data.total_contributions;
   //alert(JSON.stringify(data.account_information));
   
  }).error(function(err){
	  // alert(JSON.stringify(err));
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 // }

   
	 $scope.goback=function()
	{
		// $rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('FlexibleactivityCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,	$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('RecentdisCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('RecentcontributeCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	
 localStorage.setItem("backCount","4");
 $scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
 // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'plan_type':'fsa','acct_id':'82953','trans_type':'c'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
  // .success(function(data){ 
    // alert("Data: " + JSON.stringify(data.transcation_list.FEE_DATE[0]));
    // $scope.recentcontribute=data.transcation_list;
  // }, function(err){
   // alert("ERROR: " + JSON.stringify(err));
  // })
  
  
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('TaxyearCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,	$rootScope,$sce,$cordovaFileOpener2,$cordovaFileTransfer) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	if($cordovaNetwork.isOffline())
    {
     $ionicLoading.hide();
     $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
     .then(function(buttonIndex)
	 {
	 if(buttonIndex=="1")
	  {
				localStorage.clear();
				window.location='login.html#/login';
	  }
     });
     return false;
    }
	else
	{
      $http.get(" http://app.sterlinghsa.com/api/v1/accounts/taxstatement",{params:{'acct_id':$rootScope.hsaaccId},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.      access_token} } )
      .success(function(data){
     //alert("Data: " + JSON.stringify(data));
	  $ionicLoading.hide();
	 $scope.tax_statement_list = data.tax_statement_list;
   
     }).error(function(err){
      $ionicLoading.hide();
      $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
      .then(function() {
     });
      return false;
   
      });
    }

 $scope.form1099=function($sce){
  // $http.post(' http://app.sterlinghsa.com/api/v1/accounts/taxstatementpdf',{acct_num:$rootScope.hsaaccno,type:'1099',tax_year:$scope.tax_statement_list[0].TAX_YEAR},{headers: {'Content-Type':'application/pdf'}},{responseType : 'arraybuffer'})
  // .success(function(data){
   // alert("Data: " + JSON.stringify(data));
   // var file = new Blob([ data ], {
    // type : 'application/pdf'
   // });
   // //trick to download store a file having its URL
   // var fileURL = URL.createObjectURL(file);
   // var a         = document.createElement('a');
   // a.href        = fileURL; 
   // a.target      = '_blank';
   // a.download    = 'yourfilename.pdf';
   // document.body.appendChild(a);
   // a.click();
  // }).error(function(err){
   // alert("err: " + JSON.stringify(err));
  // });
 
 }
 $scope.form1099=function(){
  // $http.post(' http://app.sterlinghsa.com/api/v1/accounts/taxstatementpdf',{acct_num:$rootScope.hsaaccno,type:'1099',tax_year:$scope.tax_statement_list[0].TAX_YEAR},{headers: {'Content-Type':'application/pdf'}},{responseType : 'arraybuffer'})
  // .success(function(data){
   // alert("Data: " + JSON.stringify(data));
   // var file = new Blob([ data ], {
    // type : 'application/pdf'
   // });
   // //trick to download store a file having its URL
   // var fileURL = URL.createObjectURL(file);
   // var a         = document.createElement('a');
   // a.href        = fileURL; 
   // a.target      = '_blank';
   // a.download    = 'yourfilename.pdf';
   // document.body.appendChild(a);
   // a.click();
  // }).error(function(err){
   // alert("err: " + JSON.stringify(err));
  // });
 
 
  $http({
   url : 'http://app.sterlinghsa.com/api/v1/accounts/taxstatementpdf',
   method : 'POST',
   params : {acct_num:$rootScope.hsaaccno,type:'1099',tax_year:$scope.tax_statement_list[0].TAX_YEAR},
   headers : {
    'Content-type' : 'application/pdf',
	'Content-Disposition': 'attachment',
	'Authorization':$scope.access_token
   },
   responseType : 'arraybuffer'
  }).success(function(data, status, headers, config) {

   // TODO when WS success
   var file = new Blob([ data ], {
    type : 'application/pdf'
   });
  // alert("Data: " + JSON.stringify(file));
   var url = URL.createObjectURL(file);
   
   //prompt("",url);
   window.open(url);
   $scope.content = $sce.trustAsResourceUrl(url);
   //trick to download store a file having its URL
   var url = url;
   var filename = url;
  // alert(filename);
   var targetPath = cordova.file.externalRootDirectory+filename;
   var trustHosts = true;
   var options = {};
    // alert(targetPath);
	  $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {
        // Success!
       // alert('success'+JSON.stringify(result));
      }, function(error) {
        // Error
        //alert('error'+JSON.stringify(error));
      });
 
	 
   // var fileURL = URL.createObjectURL(file);
   // var a         = document.createElement('a');
   // a.href        = fileURL; 
   // a.target      = '_blank';
   // a.download    = 'yourfilename.pdf';
   // document.body.appendChild(a);
   // a.click();
  }).error(function(data, status, headers, config) {
   //TODO when WS error
  // alert(JSON.stringify(data));
  });
  
 }
 // $scope.openPDF = function() {
	 // alert();
    // $cordovaFileOpener2.open(
        // 'url',
        // 'application/pdf'
    // ).then(function() {
		// alet('success');
        // console.log('Success');
    // }, function(err) {
		// alet(JSON.stringify(err));
        // console.log('An error occurred: ' + JSON.stringify(err));
    // });
// };
// $scope.openPDF = function() {
	 // alert();
     // var url = url;
   // var filename ='test.pdf';
   // var targetPath = cordova.file.externalRootDirectory+ filename;
   // var trustHosts = true
   // var options = {};
     // alert(JSON.stringify(url));
// };
  
	$scope.goback=function()
	{
		$rootScope.hidecontent=true;
		 //window.history.back();
		$location.path("app/hsa");
	}
})

.controller('HsastatementCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	
	 $scope.username = localStorage.getItem('username');
	 $scope.access_token = localStorage.getItem('access_token');
	  $scope.date=$scope.activity;
	 
	$scope.summary= $rootScope.summary_list;
	 $scope.activity_list=$rootScope.activity_list;
	 // alert(JSON.stringify( $scope.activity_list));
	
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("/activitystmnt")
	}
	
})
// .controller('HsastateCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	// $rootScope.hidecontent=true;
	// localStorage.setItem("backCount","4");
	
	 // $scope.username = localStorage.getItem('username');
	 // $scope.access_token = localStorage.getItem('access_token');
	  // $scope.date=$scope.activity;
	 
	// $scope.summary= $rootScope.summary_list;
	 // $scope.activity=$rootScope.activity_list;
	 // alert(JSON.stringify( $scope.activity));
	
	
	// $scope.goback=function()
	// {
		// //$rootScope.hidecontent=false;
		// window.history.back();
		// //$location.path("/hsa")
	// }
	
// })
.controller('statementCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	  $scope.date=$scope.activity;
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})


.controller('ActivitystmntCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$filter) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$rootScope.activity={startDate:'',EndtDate:''};
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.date = $filter('date')(new Date(),'MM/dd/yyyy');
	// alert(JSON.stringify($scope.date));
	
	$scope.pick=function(){	
	
		// var data=$scope.activity;
		if($scope.activity.EndtDate=="" || $scope.activity.startDate ==""){
			$cordovaDialogs.confirm('Please select date', 'Sorry', 'ok')
     .then(function(buttonIndex)
	 {
	 if(buttonIndex=="1")
	  {
				localStorage.clear();
				$location.path('activitystmnt');
	  }
     });
			
		}	
		else if($scope.activity.startDate >$scope.date){
			$cordovaDialogs.confirm('Cannot select future date in From date', 'Sorry', 'ok')
     .then(function(buttonIndex)
	 {
	 if(buttonIndex=="1")
	  {
				localStorage.clear();
				$location.path('activitystmnt');
	  }
     });
			
		}
		else{
			$ionicLoading.show({
		  template: '<ion-spinner icon="ios"></ion-spinner><br>Loading...'
		});
			$http.post('http://app.sterlinghsa.com/api/v1/accounts/activitystatement',{fromdate:$rootScope.activity.startDate,todate:$rootScope.activity.EndtDate, 'account':$rootScope.hsaaccno },{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		
		//alert(JSON.stringify(data));
		$rootScope.summary_list=data.summary_list;
		$rootScope.activity_list=data.activity_list;
		//alert(JSON.stringify($rootScope.summary_list));
		//alert(JSON.stringify($rootScope.activity_list));
			$ionicLoading.hide();
			$location.path("hsastatement");
		$scope.activity={};
		
	}).error(function(err){
			alert(JSON.stringify(err));
		});
		}
		
		
	};
	

	$scope.getStartDate=function(){
		var today = new Date();
        var _minDate = new Date();
        _minDate.setMonth(today.getMonth() -1000);

        var mindate = ionic.Platform.isIOS() ? new Date(_minDate.getFullYear(), _minDate.getMonth(), _minDate.getDay()) :
        (new Date(_minDate.getFullYear(), _minDate.getMonth(), _minDate.getDay())).valueOf();
        var maxDate = ionic.Platform.isIOS() ? new Date() : (new Date()).valueOf();

       $cordovaDatePicker.show({date: today,minDate: mindate,maxDate: maxDate}).then
	   (function(date)
	   {
         var date1=date.toString();
		 var dataas=date1.split(" ");
		 var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
		 var mon=""; 
		 if(Month.indexOf(dataas[1]).toString().length==1)
		 {
			mon="0"+Month.indexOf(dataas[1]);

		 }
		 else
	     {
		   mon = Month.indexOf(dataas[1]);
		 }
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
		 var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
		 $scope.activity.startDate=selectedDate;
	
    });
  

		
	};
	$scope.getEndDate=function(){
		var today = new Date();
		 // var _minDate = new Date();
        // _minDate.setMonth(today.getMonth() +10);
        var _maxDate = new Date();
        _maxDate.setMonth(today.getMonth()+900);

        var maxdate = ionic.Platform.isIOS() ? new Date(_maxDate.getFullYear(),_maxDate.getMonth(),_maxDate.getDay()) :
        (new Date(_maxDate.getFullYear(), _maxDate.getMonth(), _maxDate.getDay())).valueOf();
        var minDate = ionic.Platform.isIOS() ? new Date() : (new Date()).valueOf();

       $cordovaDatePicker.show({date: today,minDate: minDate,maxDate: maxdate, mode: 'date'}).then
	   (function(date)
	   {
         var date1=date.toString();
		 var dataas=date1.split(" ");
		 var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
		 var mon=""; 
		 if(Month.indexOf(dataas[1]).toString().length==1)
		 {
			mon="0"+Month.indexOf(dataas[1]);

		 }
		 else
	     {
		   mon = Month.indexOf(dataas[1]);
		 }
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
		 var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
		 $scope.activity.EndtDate=selectedDate;
	
    });
  
		}
		// var today = new Date();
		 // var _minDate = new Date();
        // _minDate.setMonth(today.getMonth() +10);

		// var _maxDate = new Date();
         // _maxDate.setMonth(today.getMonth() +10);
 
 
   
     // var maxdate = ionic.Platform.isIOS() ? new Date(_maxDate.getFullYear(), _maxDate.getMonth(), _maxDate.getDay()) : (new Date(_maxDate.getFullYear(), _maxDate.getMonth(), _maxDate.getDay())).valueOf();
	  // var minDate = ionic.Platform.isIOS() ? new Date() :
      // (new Date()).valueOf();
      
	     // $cordovaDatePicker.show({
      // date: today,maxDate: maxdate,
      // minDate: minDate
	  
    // }).then(function (date) {
       // var date1=date.toString();
					// var dataas=date1.split(" ");
					// var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					
					// var mon=""; 
					// if(Month.indexOf(dataas[1]).toString().length==1)
					// {
						// mon="0"+Month.indexOf(dataas[1]);

					// }
					// else
					// {
						// mon = Month.indexOf(dataas[1]);
					// }
					
				
					// var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					// $scope.activity.EndtDate=selectedDate;
	
    // });
		
	// };
	// $scope.pick=function(){
		// // var data=$scope.activity;
		// if($scope.activity.EndtDate==""|| $scope.activity.startDate==""){
			// alert('Please select date');
		// }else{
			
				// $http.post('  http://app.sterlinghsa.com/api/v1/accounts/activitystatement',{'fromdate':$scope.activity.startDate,'todate':$scope.activity.EndtDate, 'account':$rootScope.hsaaccno },{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
				// .success(function(data){
					
					// //alert(JSON.stringify(data));
					// $scope.activityStatement=data;
					// //$scope.categories=data.categories;
				// }).error(function(err){
			   // //alert(JSON.stringify(err));
			  // });
			  // $location.path("hsastatement");
			
		// }
		
		
	// };

	
	
 
	
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=true;
		//window.history.back();
		$scope.activity={};
		$location.path("app/hsa");
		
	}
})
 
 .controller('ContributionCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
		$rootScope.hidecontent=true;
		$scope.back=function(){
			
			window.history.back();
            window.history.reload();
		}
	localStorage.setItem("backCount","4");
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('statementCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	  $scope.date=$scope.activity;
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('PaymeCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaImagePicker,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaCamera) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	$scope.paymeValues={selectAccount:'',amount:'',TransDate:'',category:'',imgValue:''};
	$scope.access_token = localStorage.getItem('access_token');
    $scope.hsaaccId=$rootScope.hsaaccId;
    $scope.hsaaccno=$rootScope.hsaaccno;
	$scope.msghide=true;
	
	 // $scope.ds=true;
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					maximumImagesCount: 5,
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				
				$cordovaCamera.getPicture(options).then(function(imageData) {
				   $scope.imgSrc= imageData;
				// $scope.imgSrc.push(imageData);
             
				  // alert(JSON.stringify( $scope.imgSrc.push(imageData)));
				}, function(err) {
				});
			}
		});
		return false;
	}
	
	// $scope.deleteimg=function($index){
		
		// $scope.imgSrc.splice($index,1)
	// }
	
	 $scope.TransDate="";
	$scope.getTransDate=function(){
		
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			 $ionicPlatform.ready(function(){
				 $cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.paymeValues.TransDate=selectedDate;
				});
			 })
		
	};
	 	
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
   .then(function() {
   });
   return false;
 }else{
   $http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		
		$scope.bank_details=data.bank_details;
   
   
  }).error(function(err){
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	 // $http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 // .success(function(data){
		// alert( JSON.stringify(data));
		
		 // $scope.bank_details=data.bank_details;
	// }, function(err){
		// // //alert("ERROR: " + JSON.stringify(err));
		
	 // });
	
	$http.get('  http://app.sterlinghsa.com/api/v1/accounts/categories',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		
		$scope.categories=data.categories;
		//alert(JSON.stringify($scope.categories));
	}).error(function(err){
   
  });
 
 
 
	
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		
		$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
   
  });
  
 

 
				 
	$scope.payme=function(myForm){
		//alert();
		
		
	if($scope.paymeValues.amount == 0){
		
		$cordovaDialogs.alert('Please enter the amount greater than 0','Sorry','OK')
			.then(function() {
				// $scope.paymeValues.amount={};
				
				
		});
		
	}
	else {	
	
	   $ionicLoading.show({
		  template: '<ion-spinner icon="ios"></ion-spinner><br>Loading...'
		});
	
	$http.post("http://app.sterlinghsa.com/api/v1/accounts/payme",{'hsa_acct_id': $scope.hsaaccId,'bank_acct_id':$scope.paymeValues.selectAccount.BANK_ACC_ID,'amount':$scope.paymeValues.amount,'category':$scope.paymeValues.category.LOOKUP_CODE,'trans_date':$scope.paymeValues.TransDate,"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		
		if(data.status == "SUCCESS"){
			//$ionicLoading.hide();
			$scope.transactionid = data.transaction_id;
			$cordovaDialogs.alert('Please reference this Disbursement number'+ " " + $scope.transactionid +" "+'for further communication.', 'Disbursement Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				 $scope.paymeValues={};
				
				
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				     	 $scope.paymeValues={};
					 		 
                     // $scope.ds=false;						
				  
				 
					 
				     
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
	}
		   
}
$scope.payme2=function(myForm){
		// alert();
		$ionicLoading.show({
		  template: '<ion-spinner icon="ios"></ion-spinner><br>Loading...'
		});
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/payme",{'hsa_acct_id': $scope.hsaaccId,'bank_acct_id':$scope.paymeValues.selectAccount.BANK_ACC_ID,'amount':$scope.paymeValues.amount,'category':$scope.paymeValues.category.LOOKUP_CODE,'trans_date':$scope.paymeValues.TransDate,"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		$ionicLoading.hide();
		 $scope.paymeValues={};
		// alert( JSON.stringify(data));
		
		
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
		$ionicLoading.hide();
		 $scope.paymeValues={};
  //alert( JSON.stringify(err));
  });
		
		   
	}
	 $scope.$on('$ionicView.beforeEnter', function () {
           $scope.goback();
     });

	$scope.goback=function(input)
	{
		
		// angular.forEach($scope.myForm, function (input) {
        // if (input && input.hasOwnProperty('$viewValue')) 
		// {
         // input.$setPristine();
        // }
        // });
		
        $location.path("app/hsa");
	    $scope.paymeValues={};
        $scope.myForm.$setPristine();
		$state.go('payme',null,{reload:true});
		 //window.history.back();
		
		 
		$location.path("/app/hsa");
	}
	
	
})

.controller('PayproviderCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$cordovaCamera) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	$scope.hsaaccId=$rootScope.hsaaccId;
	$scope.payprovierValues={selectPayee:'',patient_name:'',amount:'',TransDate:'',description:''};
	
	$scope.TransDate="";
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
					 //$scope.imgSrc.push(imageData);
				}, function(err) {
				});
			}
		});
		return false;
	}
	
	// $scope.deleteimg=function($index){
		
		// $scope.imgSrc.splice($index,1)
	// }
	$scope.getTransDate=function(){
		
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.payprovierValues.TransDate=selectedDate;
				});
			})
		
	};
	
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccno=$rootScope.hsaaccno;
	
	if($cordovaNetwork.isOffline())
	{
	   $ionicLoading.hide();
	   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
	   });
	   return false;
	}else{
		$http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
		.success(function(data){
			//alert( JSON.stringify(data));
			
			$scope.bank_details=data.bank_details;
		}).error(function(err){
	   $ionicLoading.hide();
	  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
	   });
	   return false;
	   
	  });
	}
	
	
	$http.get('  http://app.sterlinghsa.com/api/v1/accounts/categories',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		
		$scope.categories=data.categories;
	}).error(function(err){
  
   
  });
 
 $http.get(' http://app.sterlinghsa.com/api/v1/accounts/description',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		
		
		$scope.descriptions=data.description ;
		//alert(JSON.stringify($scope.description));
	}).error(function(err){
  
   
  });
	 $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num':'ICA300298'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
  
   });
	
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		//$ionicLoading.hide();
		$scope.availablebalance=data.balances.BALANCE;
	}).error(function(err){
  
  });
	
	 
	$scope.submitValue=function()
	{
		//$scope.payprovierValues={selectPayee:'',patient_name:'',amount:'',TransDate:'',description:''};
		// alert(JSON.stringify($scope.payprovierValues.selectPayee.VENDOR_ID))
		// alert(JSON.stringify($scope.payprovierValues.patient_name))
		// alert(JSON.stringify($scope.payprovierValues.amount))
		// alert(JSON.stringify($scope.payprovierValues.TransDate))
		
		
		if($scope.payprovierValues.amount == 0){
			
		$cordovaDialogs.alert('Please enter the amount greater than 0','Sorry','OK')
			.then(function() {
			//$scope.payprovierValues.amount={};
		});
		
	}else{
		$ionicLoading.show({
		  template: '<ion-spinner icon="ios"></ion-spinner><br>Loading...'
		});
		
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/payprovider",{'hsa_acct_id':$scope.hsaaccId,'vendor_id':$scope.payprovierValues.selectPayee.VENDOR_ID,'amount':$scope.payprovierValues.amount,'patient_name':$scope.payprovierValues.patient_name,'trans_date':$scope.payprovierValues.TransDate,"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
		.success(function(data){
			//alert(JSON.stringify(data));
			
			if(data.status == "SUCCESS")
			{
				$ionicLoading.hide();
			$scope.transactionid = data.transaction_id;	
			$cordovaDialogs.alert('Your Tansaction ID '+ "--->" + $scope.transactionid , 'Submitted successsfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				$scope.payprovierValues={};
		});
		return false;
		}else if(data.status == "FAILED"){
			$ionicLoading.hide();
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				$scope.payprovierValues={};
		});
		return false;
		}
			//$scope.Availablebalance=data.balances.BALANCE;
		}).error(function(err){
			//alert(JSON.stringify(err));
		});
	}
	
	}
	$scope.goback=function()
	{
		$rootScope.hidecontent=true;
		 //window.history.back();
		$location.path("app/hsa");
	}
	
})



.controller('DisbursementCtrl', function($rootScope,$scope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	//alert("DisbursementCtrl");
	
	
	$scope.goback=function()
	{
		// $rootScope.hidecontent=true;
		 //window.history.back();
		 $location.path("activity");
	}
	
	
})


.controller('ScheduledcontributeCtrl', function($scope,$ionicHistory,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	//alert("scheduledcontribute");
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/schedule",{params:{'acct_id':$scope.hsaaccId,'trans_type':'c'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){ 
	     $ionicLoading.hide();
		//alert("Data: " + JSON.stringify(data));
		if(data.schedule_list!=null){
			$scope.schedule_list=data.schedule_list;
			
		}else{
			 $cordovaDialogs.confirm('No Scheduledcontribution', 'Sorry', 'ok')
			  .then(function(buttonIndex) {
				   if(buttonIndex=="1")
			{
	            
				$location.path("/activityContribution");
			}
			 	
             });
			
		
		}
		
		
		//alert(JSON.stringify($scope.schedule_list));
	}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.alert('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function() {
   });
   return false;
   
  });
 
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("/activityContribution")
	}
})

.controller('ScheduledDisbursementCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	//alert("scheduleddisburse");
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/schedule",{params:{'acct_id':$scope.hsaaccId,'trans_type':'d'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){ 
	      $ionicLoading.hide();
		  if(data.schedule_list==null){
			 $cordovaDialogs.confirm('No ScheduledDisbursement', 'Sorry', 'ok')
               .then(function(buttonIndex) {
	          if(buttonIndex=="1")
			  {
				
				$location.path('/disbursement');
			  }
   }); 
		  }
		  else{
			  $scope.schedule_list=data.schedule_list;
		//alert(JSON.stringify($scope.schedule_list));
		  }
		//alert("Data: " + JSON.stringify(data));
		
	}).error(function(err){
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("/disbursement")
	}
})
	
.controller('RecentCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	//alert("recent");
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
 }else{
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.hsaaccId,'trans_type':'c','plan_type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		 $ionicLoading.hide();
		//alert("Data: " + JSON.stringify(data));
		if(data.transcation_list==null){
			 $cordovaDialogs.confirm('No RecentContribution', 'Sorry', 'ok')
               .then(function(buttonIndex) {
	          if(buttonIndex=="1")
			  {
				
				$location.path('/activityContribution');
			  }
            }); 
		  }
		  else{
			  $scope.transcation_list=data.transcation_list;
		      //alert(JSON.stringify($scope.transcation_list));
		  }
		
	}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("/activityContribution")
	}
	
})

.controller('recentFSACtrl', function($scope,$cordovaNetwork,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
//alert("recentfsa");
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
 }else{
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.hsaaccId,'trans_type':'c','plan_type':'fsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		 $ionicLoading.hide();
		//alert("Data: " + JSON.stringify(data));
		$scope.transcation_list=data.transcation_list;
		//alert(JSON.stringify($scope.transcation_list));
	}).error(function(err){
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/fsa")
	}
	
})

.controller('lastcontributionCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
//alert("recentfsa");
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
 }else{
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.fsaaccId,'trans_type':'c','plan_type':'fsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		 $ionicLoading.hide();
		//alert("Data: " + JSON.stringify(data));
		if(data.transcation_list==null){
			 $cordovaDialogs.confirm('No RecentContribution', 'Sorry', 'ok')
               .then(function(buttonIndex) {
	          if(buttonIndex=="1")
			  {
				
				$location.path('/fsacontribution');
			  }
   }); 
		  }
		  else{
			 $scope.transcation_list=data.transcation_list;
		     //alert(JSON.stringify($scope.transcation_list));
		  }
		
	}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/fsa")
	}
	
})

.controller('fsacontributionCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	
	 
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/fsa")
	}
	
})
.controller('lastdisbursementCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
//alert("recentfsa");
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
 }else{
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.fsaaccId,'trans_type':'d','plan_type':'fsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		$ionicLoading.hide();
		//alert("Data: " + JSON.stringify(data));
		if(data.transcation_list==null){
			 $cordovaDialogs.confirm('No RecentDisbursement', 'Sorry', 'ok')
               .then(function(buttonIndex) {
	          if(buttonIndex=="1")
			  {
				
				$location.path('/fsacontribution');
			  }
   }); 
		  }
		  else{
			 $scope.transcation_list=data.transcation_list;
		     //alert(JSON.stringify($scope.transcation_list));
		  }
		
	}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/fsa")
	}
	
})

.controller('RecentdisburseCtrl', function($scope,$rootScope,$cordovaNetwork,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	//alert("recentdisburse");
	localStorage.setItem("backCount","5");
	//alert('RecentdisburseCtrl');
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
 }else{
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.hsaaccId,'trans_type':'d','plan_type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		$ionicLoading.hide();
		//alert("Data: " + JSON.stringify(data));
		 if(data.transcation_list==null){
			 $cordovaDialogs.confirm('No RecentDisbursement', 'Sorry', 'ok')
               .then(function(buttonIndex) {
	          if(buttonIndex=="1")
			  {
				
				$location.path('/disbursement');
			  }
   }); 
		  }
		  else{
			 $scope.transcation_list=data.transcation_list;
		     //alert(JSON.stringify($scope.transcation_list));
		  }
		
		
	}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("/disbursement")
	}
	
	
})


.controller('makecontributeCtrl', function($scope,$cordovaNetwork,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	$scope.TransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.makecontribute.TransDate=selectedDate;
				});
			})
		
	};
	
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccno=$rootScope.hsaaccno;
	$scope.hsaacctype=$rootScope.hsaacctype;
	if($cordovaNetwork.isOffline())
 {
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
 }else{
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		$ionicLoading.hide();
		//alert( JSON.stringify(data));
		$ionicLoading.hide();
		$scope.bank_details=data.bank_details;
	}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	$scope.username = localStorage.getItem('username');
	$scope.acc_num=$rootScope.hsaaccno;
	
	$scope.makecontribute={selectAccount:'',amount:'',TransDate:'',feeamount:'',selectdescription:''};
	$scope.hsaaccId=$rootScope.hsaaccId;
    
	$http.get(' http://app.sterlinghsa.com/api/v1/accounts/accountinfo',{params:{'type':'hsa','acc_num': $scope.acc_num},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
  .success(function(data){
   $ionicLoading.hide();
   //alert(JSON.stringify(data));
   //localStorage.setItem('account_information',data.account_information);
   //localStorage.setItem('total_contributions',data.total_contributions);
   //$scope.account_information=data.account_information;
   //$scope.total_contributions = localStorage.getItem('total_contributions');
   $scope.total_contribution = data.total_contributions;
   //alert(JSON.stringify(data.account_information));
   
  }).error(function(err){
	  // alert(JSON.stringify(err));
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 
	
	// $http.get('  http://app.sterlinghsa.com/api/v1/accounts/categories',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	// .success(function(data){
		// //alert(JSON.stringify(data));
		// $ionicLoading.hide();
		// $scope.categories=data.categories;
	// }).error(function(err){
  
   
  // });
  
   $http.get(' http://app.sterlinghsa.com/api/v1/accounts/description',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		
		$scope.description=data.description ;
		//alert(JSON.stringify($scope.description));
	}).error(function(err){
  
   
  });
 
	
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hra'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		// alert( JSON.stringify(data));
		$ionicLoading.hide();
		$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
   
  
  });	
  
   $scope.submitvalues=function()
   
	{
		
		if($scope.makecontribute.amount == 0){
		
		$cordovaDialogs.alert('Please enter the amount greater than 0','Sorry','OK')
			.then(function() {
				// $scope.paymeValues.amount={};
				
				
		});
		
	}else{
		$ionicLoading.show({
		  template: '<ion-spinner icon="ios"></ion-spinner><br>Loading...'
		});
		
		$http.post(" http://app.sterlinghsa.com/api/v1/accounts/makecontribution",{'acct_id':$scope.hsaaccId,'acct_type':$scope.hsaacctype,'bank_acct_id':$scope.makecontribute.selectAccount.BANK_ACC_ID,'amount':$scope.makecontribute.amount,'fee_amount':$scope.makecontribute.feeamount,'reason_code':$scope.makecontribute.selectdescription.FEE_CODE,'trans_date':$scope.makecontribute.TransDate},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
		.success(function(data){
			//alert(JSON.stringify(data));
			if(data.status == "SUCCESS")
			{
				$ionicLoading.hide();
			
			$scope.transactionid = data.transaction_id;	
			$cordovaDialogs.alert('Transaction ID is '+ "" + $scope.transactionid , 'Contribution Submitted Successfully', 'OK')
			.then(function() {
				$scope.makecontribute={};
				 $scope.myForm.setPristine();
				
		});
		return false;
		}else if(data.status == "FAILED"){
			$ionicLoading.hide();
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function() {
				$scope.makecontribute={};
				
		});
		return false;
		}
			//$scope.Availablebalance=data.balances.BALANCE;
		}).error(function(err){
			//alert(JSON.stringify(err));
		});
	}
	}
	$scope.goback=function()
	{
		// $rootScope.hidecontent=false;
		//window.history.back();
		$location.path("/app/hsa")
	}
	
	
	
})

.controller('AppCtrl', function($scope,$ionicPopup, $timeout ,$ionicModal,$location,$cordovaDialogs, $rootScope,$http) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	
	$http.get('http://app.sterlinghsa.com/api/v1/accounts/portfolio',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':localStorage.getItem('access_token')} })
	                 .success(function(data){
			               // alert(JSON.stringify(data.account_types));
						
		                  $rootScope.acctype=data.account_types;
			              // alert(JSON.stringify($rootScope.acctype));
						  if($scope.acctype.HSA!=null)
						  {
							 
							 $scope.hidehsa=true; 
							 $scope.showHsamenu=true;
							 $location.path('/app/hra');
						  }
						   if($scope.acctype.FSA!=null){
						    $scope.hidefsa=true;
							$scope.showFsamenu=true;
							
							 $location.path('/app/hra');
							  
						  }
						  if($scope.acctype.COBRA!=null){
							   
							 $scope.hidecobra=true;
                             $scope.showCobramenu=true;							 
							   $location.path('/app/hsa');  
						  }
						  if($scope.acctype.HRA!=null){
							 $scope.hidehra=true;
							 $scope.showHramenu=true;	
							 $location.path('/app/hra');  
						  }
						  
		      }).error(function(err){
					// alert(JSON.stringify(err));
         $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  
   
     });
 
  $scope.hidefsa=false;
  $scope.hidehsa=false;
  $scope.hidecobra=false;
  $scope.hidehra=false;
  $scope.showCobramenu=false;
  $scope.showHramenu=false;
  $scope.showFsamenu=false;
  $scope.showHsamenu=false;
  
 $scope.exiqt = function() {
	 
     var confirmPopup = $ionicPopup.confirm({
       title: 'Do you want to close',
      
       template: 'Are you sure',
        buttons : [{
    text : 'yes',
    type : 'button-positive button-outline',
   }, {
    text : 'No',
    type : 'button-positive button-outline',
    
   }]
     });
       
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
          console.log('You are not sure');
       }
     });
   };
  
$scope.exit=function()
{
	$location.path("/login");	
}
  
$scope.toggleSomething = function(){
	// event.stopPropagation();
  $scope.isVisible = !$scope.isVisible;
  $scope.isVisible1=false;
  $scope.isHra=false;
  $scope.isCobra=false;
  console.log('make sure toggleSomething() is firing*');
}

$scope.toggleSomething1 = function(){
  $scope.isVisible1 = !$scope.isVisible1;
   $scope.isVisible=false;
   $scope.isHra=false;
   $scope.isCobra=false;
  console.log('make sure toggleSomething() is firing*');
}
$scope.toggleHra = function(){
  $scope.isHra = !$scope.isHra;
   $scope.isVisible=false;
   $scope.isVisible1=false;
   $scope.isCobra=false;
  console.log('make sure toggleSomething() is firing*');
}
$scope.toggleCobra = function(){
  $scope.isCobra = !$scope.isCobra;
   $scope.isVisible=false;
   $scope.isVisible1=false;
   $scope.isHra=false;
  console.log('make sure toggleSomething() is firing*');
}

 $scope.logOut=function()
  {
	
	   $cordovaDialogs.confirm('Do you want to Logout', 'Are you sure', ['Yes','No'])
		.then(function(buttonIndex) {
			if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
		  
		});
	  
  }
	
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	 // $scope.openNav=function()
  // {
	  // document.getElementById("mySidenav").style.width = "250px";
  // }
  
  // $scope.closeNav=function(event) {
		// document.getElementById("mySidenav").style.width = "0";
		 // event.stopPropagation(mySidenav);  
	// }
$scope.show1 = false;
  $scope.show2 = false;
  $scope.click1 = function($event) { 
    $event.stopPropagation();
    $scope.show1 = !$scope.show1;
    $scope.show2 = false;
      $ionicListDelegate.closeOptionButtons(); 
	}
	
 
  $scope.hideAll = function() 
  { 
    $scope.show2 = false;
    $scope.show1 = false;
	$scope.isVisible1=false;
	$scope.isVisible=false;
	$scope.isHra=false;
	$scope.isCobra=false;
    $ionicListDelegate.closeOptionButtons(); 
	}

})

.controller('HeaderCtrl', function($scope,$ionicPopup, $timeout ,$ionicModal,$location, $ionicHistory, $cordovaDialogs) {
	$scope.Logout=function()
	{
	   $cordovaDialogs.confirm('Do you want to Logout', 'Are you sure', ['Yes','No'])
		.then(function(buttonIndex) {
			if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}	  
		});
	}
	$scope.goBack = function() {
		//alert(localStorage.getItem("backCount"));
		if (localStorage.getItem("backCount")==1) {
			//code
			//alert('1');
			localStorage.setItem("backCount","0")
			//$location.path("/first");
			$cordovaDialogs.confirm('Are You Sure', 'Do you Want to Close ', ['Yes','No'])
			.then(function(buttonIndex) {
				if (buttonIndex=='1') {
					ionic.Platform.exitApp();
				}
			});
		}else if(localStorage.getItem("backCount")==0){
			$cordovaDialogs.confirm('Are You Sure', 'Do you Want to Close ', ['Yes','No'])
			.then(function(buttonIndex) {
				if (buttonIndex=='1') {
					ionic.Platform.exitApp();
				}
			});
		}
		else if (localStorage.getItem("backCount")>1) 
		{
			//alert('2');
			var backcount=parseInt(localStorage.getItem("backCount"));
			var backcount=backcount-1;
			localStorage.setItem("backCount",backcount);
			
			window.history.back();
		}
	};
})

.controller('FooterCtrl', function($scope,$ionicPopup, $timeout ,$ionicModal,$location, $ionicHistory,$ionicSideMenuDelegate, $cordovaDialogs) {
	$scope.homePage = function() {
		$location.path("/app/portfolio");
	};
})
.controller('FsapaymeCtrl', function($scope,$ionicPopup, $timeout ,$ionicModal,$location, $ionicHistory,$ionicSideMenuDelegate, $cordovaDialogs) {
	$scope.goback=function()
	{
		//window.history.back();
		$location.path("app/fsa")
	}
})

.controller('contactCtrl', function($scope,$location,$rootScope, $stateParams, $http) {
	localStorage.setItem("backCount","2");
	$rootScope.hidecontent=true;
	
	$scope.backcontrol=function()
	{
		$location.path("/app/hsa")
	}
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("/app/hsa")
	}
	
	
})


// HRA contoller
.controller('HraCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$http.get('http://app.sterlinghsa.com/api/v1/accounts/portfolio',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	    .success(function(data){
			  // alert(JSON.stringify(data.account_types.HRA));
		 $rootScope.hraaccno=data.account_types.HRA.ACCT_NUM; 
	     $rootScope.hraaccId=data.account_types.HRA.ACCT_ID;
      }).error(function(err){
				   // alert(JSON.stringify(err));
  
     });
	
	$scope.goBack=function(){
		$location.path("app/fsa");
	}
	$scope.goforward=function(){
		$location.path("app/cobra");
	}
	
	
})
.controller('HraacctCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hraacc= $rootScope.hraaccno;
	 // alert($scope.hraacc);
	

    if($cordovaNetwork.isOffline())
    {
     $ionicLoading.hide();
      $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
      .then(function() {
     });
      return false;
    }
	else
	{	 
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/accountinfo",{params:{'type':'hra','acc_num':$scope.hraacc},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){ 
	 // alert(JSON.stringify(data));
	$scope.accnumber=data.account_information;
	 }).error(function(err){
    $ionicLoading.hide();
    $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/hra")
	}
	
	
})
.controller('HracontributionCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	 $scope.hraid= $rootScope.hraaccId;
	 // alert($scope.hraid);
	if($cordovaNetwork.isOffline())
    {
      $ionicLoading.hide();
         $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
          .then(function(buttonIndex) {
	      if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
    return false;
   }
   else
   {
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id': $scope.hraid,'trans_type':'c','plan_type':'hra'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		 $ionicLoading.hide();
		 // alert("Data: " + JSON.stringify(data));
		if(data.transcation_list==null){
			 $cordovaDialogs.confirm('No RecentContribution', 'Sorry', 'ok')
               .then(function(buttonIndex) {
	          if(buttonIndex=="1")
			  {
				
				$location.path('/fsacontribution');
			  }
   }); 
		  }
		  else{
			 $scope.transcation_list=data.transcation_list;
		     //alert(JSON.stringify($scope.transcation_list));
		  }
		
	}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/hra")
	}
	
	
})
.controller('HradisburseCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	 $scope.hraid= $rootScope.hraaccId;
	 // alert($scope.hraid);
	if($cordovaNetwork.isOffline())
    {
       $ionicLoading.hide();
       $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
        .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
    return false;
   }
   else
   {
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.hraid,'trans_type':'d','plan_type':'hra'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		$ionicLoading.hide();
		// alert("Data: " + JSON.stringify(data));
		if(data.transcation_list==null)
		{
			 $cordovaDialogs.confirm('No RecentDisbursement', 'Sorry', 'ok')
               .then(function(buttonIndex) {
	          if(buttonIndex=="1")
			  {
				
				$location.path('/fsacontribution');
			  }
           }); 
		}
		else
		{
			 $scope.transcation_list=data.transcation_list;
		     //alert(JSON.stringify($scope.transcation_list));
		}
		
	}).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/hra")
	}
	
	
})
.controller('HranewclaimCtrl', function($scope,$location,$rootScope, $stateParams, $http) {
	
	$scope.goback=function()
	{
		
		$location.path("app/hra")
	}
	
	
})
.controller('HrarecentCtrl', function($scope,$location,$rootScope, $stateParams, $http) {
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/hra")
	}
	
	
})
.controller('HrapaymeCtrl', function($scope,$location,$rootScope, $stateParams, $http) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hraid= $rootScope.hraaccId;
	$scope.hraacc= $rootScope.hraaccno;
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.hraacc},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){
		  // alert( JSON.stringify(data)); 
			$scope.available_balances = data.available_balances;
	 })
	 // alert($scope.hraid);
	
	 $http.get(" http://app.sterlinghsa.com/api/v1/accounts/plan-type",{params:{'acct_id':$scope.hraid},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		// alert( JSON.stringify(data));
		$scope.plan_types=data.plan_types;
		
	  
	}).error(function(err){
  // alert( JSON.stringify(err));
  });
  $scope.redirectTo=function(claim){
 	// alert(JSON.stringify(claim.MEANING));
	  for(var i=0;i<$scope.available_balances.length;i++){
		  
		  if($scope.available_balances[i].PLAN_TYPE==claim.LOOKUP_CODE){
			$rootScope.newclaim_balance =$scope.available_balances[i].BALANCE;
			// alert(JSON.stringify($rootScope.newclaim_balance));
		  }
	  }
	if(claim.MEANING === 'ACOINDE'){
		 // alert('hello')
		
		$location.path("/paymeacoinde");
	
	}
  }
	
	$scope.goback=function()
	{
		// $rootScope.hidecontent=false;
		// window.history.back();
		$location.path("/hranewclaim");
	}
	
	
})
.controller('HrapayproviderCtrl', function($scope,$location,$rootScope, $stateParams, $http) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hraid= $rootScope.hraaccId;
	$scope.hraacc= $rootScope.hraaccno;
	
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.hraacc},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){
		// alert( JSON.stringify(data)); 
		$scope.available_balances = data.available_balances;
	 })
	 $http.get(" http://app.sterlinghsa.com/api/v1/accounts/plan-type",{params:{'acct_id':$scope.hraid},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		 // alert( JSON.stringify(data));
		$scope.plan_types=data.plan_types;
		
	  
	}).error(function(err){
  // alert( JSON.stringify(err));
  });
  
  $scope.plan_type="";
  $scope.redirectTo=function(claim){
 	 // alert(JSON.stringify(claim.MEANING));
	  for(var i=0;i<$scope.available_balances.length;i++){
		  
		  if($scope.available_balances[i].PLAN_TYPE==claim.LOOKUP_CODE){
			$rootScope.newclaim_balance =$scope.available_balances[i].BALANCE;
			 // alert(JSON.stringify($rootScope.newclaim_balance));
		  }
	  }
	if(claim.MEANING === 'ACOINDE'){
		   
		
		$location.path("/payprovideracoinde");
	
	}
  }
	
	
	$scope.goback=function()
	{
		
		$location.path("/hranewclaim");
		
	}
	
	
})
.controller('HrabalCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hraacc= $rootScope.hraaccno;
	// alert($scope.hraacc);
	
	if($cordovaNetwork.isOffline())
   {
   $ionicLoading.hide();
   $cordovaDialogs.alert('Please Connect with internet', 'Sorry', 'ok')
   .then(function() {
   });
   return false;
  }else{
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/availablebalances",{params:{ 'acct_num':$scope.hraacc},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){
		   // alert( JSON.stringify(data)); 
			$rootScope.available_balances = data.available_balances;
			
			
	 }).error(function(err){
   $ionicLoading.hide();
   $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 }
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		//window.history.back();
		$location.path("app/hra")
	}
	
	
})
.controller('PaymeacoindeCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$cordovaCamera) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.newclaim_balance=$rootScope.newclaim_balance;
	$scope.hraacc= $rootScope.hraaccno;
	$scope.hsaaccno=$rootScope.hsaaccno;
	$scope.acoinde = {selectAccount:'',amount:'',description:'',startTransDate:'',endTransDate:''};
	$scope.imgSrc=[];
	
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					//$scope.imgSrc= imageData;
					 $scope.imgSrc.push(imageData);
				}, function(err) {
				});
			}
		});
		return false;
	}
	
	$scope.deleteimg=function($index){
		
		$scope.imgSrc.splice($index,1)
	}
	
   $http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hra', 'acc_num':$scope.hraacc},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		if(data.status=="FAILED"){
			$scope.msg=data.error_message;
			$cordovaDialogs.alert($scope.msg, 'Sorry', 'ok')
		   .then(function() {
			   
		   });
		   return false;
		}
		$scope.bank_details=data.bank_details;
   
   
  }).error(function(err){
   $ionicLoading.hide();
  $cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
   
  });
 
 
  $scope.startTransDate="";
   $scope.endTransDate="";
	
	$scope.getTransDate=function(){
		
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
				
					$scope.acoinde.startTransDate=selectedDate;
					
				});
			})
		
	};
	$scope.EndgetTransDate=function(){
		
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.acoinde.endTransDate=selectedDate;
				});
			})
		
	};
 
   $scope.submitValues=function(){
	   
	   if($scope.acoinde.amount == 0){
		
		$cordovaDialogs.alert('Please enter the amount greater than 0','Sorry','OK')
			.then(function() {
				// $scope.paymeValues={};
				
				
		});
		
	}else{
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num':  $scope.fsaaccno,
		'acct_id':$scope.fsaaccId,
    'bank_acct_id':$scope.acoinde.Bankaccount.BANK_ACC_ID,
   'amount':$scope.acoinde.amount,
   'service_start_date':$scope.acoinde.startTransDate,
   'service_end_date':$scope.acoinde.endTransDate,
   'patient_name':'',
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':'',
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.acoinde.description,
   'note':'Dependent Care Claim from Mobile Website',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				 $scope.acoinde={};
					
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				      $scope.acoinde={};
					 
				
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
   }
   }
	$scope.goback=function()
	{
		
		$location.path("/hrapayme");
	}
	
	
	
})
.controller('PayprovideracoindeCtrl', function($scope,$ionicPlatform,$cordovaNetwork,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope,$cordovaCamera) {
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.newclaim_balance=$rootScope.newclaim_balance;
	$scope.hraacc= $rootScope.hraaccno;
	$scope.provideracoinde={selectpayee:'',amount:'',description:'',startTransDate:'',endTransDate:''};
	$scope.imgSrc=[];
	
	$scope.upload = function(){
		$cordovaDialogs.confirm('Choose your option', 'Upload Receipt', ['Camera','Gallery'])
		.then(function(options) {
			if(options==1){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.imgSrc= imageData;
				}, function(err) {
				});
			}else if(options==2){
				var options = {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					targetWidth: 100,
					targetHeight: 100,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false,
					correctOrientation:true
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					//$scope.imgSrc= imageData;
					 $scope.imgSrc.push(imageData);
				}, function(err) {
				});
			}
		});
		return false;
	}
	
	$scope.deleteimg=function($index){
		
		$scope.imgSrc.splice($index,1)
	}
	
	  $scope.submitValues=function(){
		  
		  if($scope.provideracoinde.amount == 0){
		
		$cordovaDialogs.alert('Please enter the amount greater than 0','Sorry','OK')
			.then(function() {
				// $scope.paymeValues={};
				
				
		});
		
	}else{
		$http.post("http://app.sterlinghsa.com/api/v1/accounts/newclaimrequest",{'acct_num': $scope.hraacc,
		'acct_id':$scope.fsaaccId,
      'bank_acct_id':'',
   'amount':$scope.provideracoinde.amount,
   'service_start_date':$scope.provideracoinde.startTransDate,
   'service_end_date':$scope.provideracoinde.endTransDate,
   'patient_name':$scope.provideracoinde.patient,
   'plan_type':$scope.plan_types,
   'claim_method':'SUBSCRIBER_ONLINE_ACH',
   'vendor_id':$scope.provideracoinde.selectpayee.VENDOR_ID,
   'vendor_acc_num':'',
   'insurance_category':'',
   'description':$scope.provideracoinde.description,
   'note':'Dependent Care Claim from Mobile App',
   'memo':'',
		"receipt":document.getElementsByName('imgValue')[0].value},{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		if(data.status == "SUCCESS"){
			$ionicLoading.hide();
			$scope.claim_id = data.claim_id;
			$cordovaDialogs.alert('Claim number is'+ " " + $scope.claim_id, 'Claim Submitted Successfully', 'OK')
			.then(function() {
				$scope.imgSrc= '';
				var myEl = angular.element( document.querySelector( '#receipt' ) );
				myEl.removeAttr('src');
				
				 $scope.provideracoinde={};
					
		});
		return false;
		}else if(data.status == "FAILED"){
			 $ionicLoading.hide();
			
			$cordovaDialogs.alert(data.error_message, 'Sorry', 'OK')
			.then(function($setUntouched,$setPristine) {
				
				     	// $scope.myForm.$setPristine();
                     // $scope.ds=false;
                     	$scope.imgSrc= '';
						var myEl = angular.element( document.querySelector( '#receipt' ) );
						myEl.removeAttr('src');
				      $scope.provideracoinde={};
					  
				 
					 
				      
					
				    
		});
		return false;
		
		}
		//$scope.Availablebalance=data.balances.BALANCE;
	}).error(function(err){
  //alert( JSON.stringify(err));
  });
   }
	  }
 
	  $http.get('http://app.sterlinghsa.com/api/v1/accounts/payeeslist',{params:{'acc_num': $scope.hraacc},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		//alert("1111");
		$scope.payee=data.payee ;
		//alert(JSON.stringify($scope.payee));
	}).error(function(err){
		$cordovaDialogs.confirm('Session expired, Please Login Again', 'Sorry', 'ok')
   .then(function(buttonIndex) {
	   if(buttonIndex=="1")
			{
				localStorage.clear();
				window.location='login.html#/login';
			}
   });
   return false;
  
   });
  
 
 
  $scope.startTransDate="";
   $scope.endTransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
				
					$scope.provideracoinde.startTransDate=selectedDate;
					
				});
			})
		
	};
	$scope.EndgetTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.provideracoinde.endTransDate=selectedDate;
				});
			})
		
	};

	$scope.goback=function()
	{
		
		$location.path("/hrapayprovider");
	}
	
	
	
})

// Cobra controller
.controller('CobraCtrl', function($scope,$location,$rootScope, $stateParams, $http) {
	
	
	$scope.goBack=function()
	{
		if($scope.acctype.HRA==null)
		{	   							 
	       $location.path('/app/fsa');				  
		}
		else
		{
			$location.path("app/hra");
		}
		
	}
	
	
	
});
