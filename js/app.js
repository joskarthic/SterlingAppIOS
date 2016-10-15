// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova', 'starter.services'])

.run(function($ionicPlatform,$rootScope,$location,$state,$cordovaToast,$timeout,$interval) {
  $ionicPlatform.ready(function() {
	  
	  $ionicPlatform.registerBackButtonAction(function (event) {
		   var promise;
          if($state.current.name=="#/app/hsa"||$state.current.name=="login"){
			  $cordovaToast
             .show('Press again to exit', '250', 'bottom');
			  $ionicPlatform.onHardwareBackButton(function(event) {
				   
                 // navigator.app.exitApp();
				
				    promise =$interval(onHardwareBackButton, 5000);
					$scope.stop();
					
                });
				// $scope.stop=function(){
				   // $interval.cancel(promise);
				 
			 // }
				
				// $timeout(onHardwareBackButton,3000);  
				
             
              
            }
			
			   // $cordovaToast
            // .show('Press again to exit', 'long', 'center')
            // .then(function(success) {
				
               // navigator.app.exitApp();
           // }, function (error) {
     
    // });   
        else if($state.current.name=="account"||$state.current.name=="makecontribution"||$state.current.name=="make"||$state.current.name=="activity"||$state.current.name=="health"||$state.current.name=="information"||$state.current.name=="availablebalance"||$state.current.name=="new"||$state.current.name=="fsacontribution"||$state.current.name=="contact"){
			
		  $rootScope.hidecontent=false;
           // navigator.app.backHistory();
         }
		 else{
			 
			 // navigator.app.backHistory(); 
		 }
        }, 100);
	  
	  // $ionicPlatform.registerBackButtonAction(function(event) 
	// {
		// if (true) {
		// }
	// }, 100);
	
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  
   
  

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
   .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
	controller: 'loginCtrl'
    
  })
  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/home.html',
	controller: 'DashCtrl'
    
  })
   .state('app.portfolio', {
      url: '/portfolio',
      views: {
        'menuContent': {
          templateUrl: 'templates/portfolio.html',
		  controller: 'PortfolioCtrl'
        }
      }
    })
	.state('app.hsa', {
    url: "/hsa",
    views: {
      'tab-hsa': {
        templateUrl: "templates/hsa.html",
		 controller: 'HsaCtrl'
      }
    }
  })
   .state('app.fsa', {
    url: "/fsa",
    views: {
      'tab-fsa': {
        templateUrl: "templates/fsa.html",
		 controller: 'FsaCtrl'
      }
    }
  })
  .state('app.hra', {
    url: "/hra",
    views: {
      'tab-hra': {
        templateUrl: "templates/hra/hra.html",
		 controller: 'HraCtrl'
      }
    }
  })
  
  // .state('hsa', {
    // url: '/hsa',
    // templateUrl: 'templates/hsa.html',
	// controller: 'HsaCtrl'    
  // })
  
  // .state('fsa', {
    // url: '/fsa',
    // templateUrl: 'templates/fsa.html',
	// controller: 'FsaCtrl'    
  // })
  
 .state('accounts', {
    url: '/accounts',
	templateUrl: 'templates/account.html',
	controller: 'AccountCtrl'
  })
  .state('accountDetails', {
    url: '/accountDetails',
    templateUrl: 'templates/page.html',
	controller: 'PageCtrl'    
  })
  
  
  .state('contribution', {
      url: '/contribution',
          templateUrl: 'templates/contribution.html',
          controller: 'ContributionCtrl'
    })
   .state('flexible', {
      url: '/flexible',
          templateUrl: 'templates/flexible.html',
		  controller: 'FlexibleCtrl'
    })
   .state('make', {
      url: '/make',
          templateUrl: 'templates/make.html',
          controller: 'MakeCtrl'  
    })
   .state('disbursement', {
      url: '/disbursement',
          templateUrl: 'templates/disbursement.html',
          controller: 'DisbursementCtrl'
    })
	.state('activity', {
      url: '/activity',
          templateUrl: 'templates/activity.html',
          controller: 'ActivityCtrl'
    })
	.state('activityContribution', {
      url: '/activityContribution',
          templateUrl: 'templates/activityContribution.html',
          controller: 'activityContributionyCtrl'
    })
      .state('health', {
      url: '/health',
          templateUrl: 'templates/health.html',
          controller: 'HealthCtrl'
    })
       
	.state('recent', {
      url: '/recent',
          templateUrl: 'templates/recent.html',
		  controller: 'RecentCtrl'
    })
	.state('recentFSA', {
      url: '/recentFSA',
          templateUrl: 'templates/fsa/recent.html',
		  controller: 'recentFSACtrl'
    })
         .state('recentdisburse', {
      url: '/recentdisburse',
          templateUrl: 'templates/recentdisburse.html',
		  controller: 'RecentdisburseCtrl'
    })
          .state('scheduledcontribute', {
      url: '/scheduledcontribute',
          templateUrl: 'templates/scheduledcontribute.html',
		  controller: 'ScheduledcontributeCtrl'
    })
	.state('makecontribution', {
	  cache: false,
      url: '/makecontribution',
          templateUrl: 'templates/makecontribution.html',
		  controller: 'makecontributeCtrl'
    })
	 .state('scheduleddisbursement', {
      url: '/scheduleddisbursement',
          templateUrl: 'templates/scheduleddisbursement.html',
		  controller: 'ScheduledDisbursementCtrl'
    })
	 .state('lastdisbursement', {
      url: '/lastdisbursement',
          templateUrl: 'templates/lastdisbursement.html',
		  controller: 'lastdisbursementCtrl'
    })
	 .state('lastcontribution', {
      url: '/lastcontribution',
          templateUrl: 'templates/lastcontribution.html',
		  controller: 'lastcontributionCtrl'
    })
	 .state('fsacontribution', {
      url: '/fsacontribution',
          templateUrl: 'templates/fsacontribution.html',
		  controller: 'fsacontributionCtrl'
    })
         
   .state('information', {
    url: '/information',
        templateUrl: 'templates/information.html',
		controller: 'InformationCtrl'
  })
  
  
   .state('activitystmnt', {
	     cache: false,
    url: '/activitystmnt',
        templateUrl: 'templates/activitystmnt.html',
		controller: 'ActivitystmntCtrl'
  })
   
    .state('availablebalance', {
    url: '/availablebalance',
        templateUrl: 'templates/availablebalance.html',
		controller: 'AvailablebalanceCtrl'
  })

	


  .state('payme', {
	  cache: false,
      url: '/payme',
          templateUrl: 'templates/payme.html',
		  controller: 'PaymeCtrl'
    })
  
  
   .state('newclaim', {
      url: '/newclaim',
          templateUrl: 'templates/newclaim.html',
		  controller: 'newclaimCtrl'
    })
    .state('contact', {
      url: '/contact',
          templateUrl: 'templates/contact.html',
		  controller: 'contactCtrl'
    })
 
 
    .state('taxyear', {
      url: '/taxyear',
          templateUrl: 'templates/taxyear.html',
		  controller: 'TaxyearCtrl'
    })
   .state('recentdis', {
      url: '/recentdis',
          templateUrl: 'templates/recentdisburse.html',
		  controller: 'RecentdisCtrl'
    })
   .state('recentcontribute', {
      url: '/recentcontribute',
          templateUrl: 'templates/recentcontribute.html',
		  controller: 'RecentcontributeCtrl'
    })
	
	.state('flexibleactivity', {
      url: '/flexibleactivity',
          templateUrl: 'templates/flexibleactivity.html',
		  controller: 'FlexibleactivityCtrl'
  })
   
 .state('newclaimbicycle', {
      url: '/newclaimbicycle',
          templateUrl: 'templates/newclaimbicycle.html',
		  controller: 'NewclaimbicycleCtrl'
    })
	
	.state('transit', {
      url: '/transit',
          templateUrl: 'templates/fsa/transit.html',
		  controller: 'transitCtrl'
    })
 .state('parking', {
      url: '/parking',
          templateUrl: 'templates/fsa/parking.html',
		  controller: 'parkingCtrl'
    })
 .state('new', {
      url: '/new',
          templateUrl: 'templates/new.html',
		  controller: 'NewCtrl'
    })
	
	 .state('hsastatement', {
       url: '/hsastatement',
      
           templateUrl: 'templates/hsastatement.html',
		   controller: 'HsastatementCtrl'
    })
	
	// .state('hsastate', {
      // url: '/hsastate',
      
          // templateUrl: 'templates/hsastate.html',
		  // controller: 'HsastateCtrl'
    // })
	.state('statement', {
      url: '/statement',
      
          templateUrl: 'templates/statement.html',
		  controller: 'StatementCtrl'
    })
	.state('payprovider', {
      cache: false,
      url: '/payprovider',
          templateUrl: 'templates/payprovider.html',
		  controller: 'PayproviderCtrl'
    })
	.state('fsapayme', {
      url: '/fsapayme',
          templateUrl: 'templates/fsa/fsapayme.html',
		  controller: 'FsapaymeCtrl'
    })
	
	
// HRA PAGES
    .state('hraacct', {
      url: '/hraacct',
          templateUrl: 'templates/hra/hraacct.html',
		  controller: 'HraacctCtrl'
    })
	.state('hracontribution', {
      url: '/hracontribution',
          templateUrl: 'templates/hra/hracontribution.html',
		  controller: 'HracontributionCtrl'
    })
	.state('hradisburse', {
      url: '/hradisburse',
          templateUrl: 'templates/hra/hradisburse.html',
		  controller: 'HradisburseCtrl'
    })
	.state('hranewclaim', {
      url: '/hranewclaim',
          templateUrl: 'templates/hra/hranewclaim.html',
		  controller: 'HranewclaimCtrl'
    })
	.state('hrarecent', {
      url: '/hrarecent',
          templateUrl: 'templates/hra/hrarecent.html',
		  controller: 'HrarecentCtrl'
    })
	.state('hrapayme', {
      url: '/hrapayme',
          templateUrl: 'templates/hra/hrapayme.html',
		  controller: 'HrapaymeCtrl'
    })
	.state('hrapayprovider', {
      url: '/hrapayprovider',
          templateUrl: 'templates/hra/hrapayprovider.html',
		  controller: 'HrapayproviderCtrl'
    })
	.state('hrabal', {
      url: '/hrabal',
          templateUrl: 'templates/hra/hrabal.html',
		  controller: 'HrabalCtrl'
    })
	.state('paymeacoinde', {
      url: '/paymeacoinde',
          templateUrl: 'templates/hra/paymeacoinde.html',
		  controller: 'PaymeacoindeCtrl'
    })
	.state('payprovideracoinde', {
      url: '/payprovideracoinde',
          templateUrl: 'templates/hra/payprovideracoinde.html',
		  controller: 'PayprovideracoindeCtrl'
    })

	
    
    .state('fsapayprovider', {
      url: '/fsapayprovider',
          templateUrl: 'templates/fsa/fsapayprovider.html',
		  controller: 'fsapayproviderCtrl'
    })
    .state('fsatransit', {
      url: '/fsatransit',
          templateUrl: 'templates/fsa/fsatransit.html',
		  controller: 'fsatransitCtrl'
    })
    .state('fsadependent', {
      url: '/fsadependent',
          templateUrl: 'templates/fsa/fsadependent.html',
		  controller: 'fsadependentCtrl'
    })
    .state('fsaparking', {
      url: '/fsaparking',
          templateUrl: 'templates/fsa/fsaparking.html',
		  controller: 'fsaparkingCtrl'
    })
    .state('fsahealthcare', {
      url: '/fsahealthcare',
          templateUrl: 'templates/fsa/fsahealthcare.html',
		  controller: 'fsahealthcareCtrl'
    })
 // cobra
.state('app.cobra', {
    url: "/cobra",
    views: {
      'tab-cobra': {
        templateUrl: "templates/cobra/cobra.html",
		 controller: 'CobraCtrl'
      }
    }
  })

  .state('cobraaccount', {
    url: "/cobraaccount",
    
        templateUrl: "templates/cobra/cobraaccount.html",
		 controller: 'CobraaccountCtrl'
      
  });
  $urlRouterProvider.otherwise('/login');
  

});
