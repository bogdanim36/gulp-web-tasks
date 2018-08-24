var applicationInfo = {
	"name": "AxFramework",
	"version": "1.0.3",
	"type": "",
	"theme": {name: "Bootstrap", url: "components/stylesheets/ax-theme.bootstrap-1.css", type: "bootstrap4"},
	"themes": [
		// {name: "Light blue", url: "components/stylesheets/theme.lightblue.css", type: "ax-frmk", class: "lighblue-theme", rowDataHeight: 24},
		{
			default: true,
			name: "Bootstrap Normal Theme",
			dimensions: {
				url: "components/themes/ax-theme.dimensions.normal.css",
				class: "dimensions-normal",
				rowDataHeight: 28,
				iconButtonWidth: 32,
				leftPanelWidth: 320,
				maxMobileWidth: 800
			},
			appearance: {
				url: "components/themes/ax-theme.appearance.bootstrap-1.css",
				class: "bootstrap1-theme"
			},
			baseOn: "bootstrap4",
		},
		{
			default: false,
			name: "Bootstrap Large Theme",
			dimensions: {
				url: "components/themes/ax-theme.dimensions.large.css",
				class: "dimensions-large",
				rowDataHeight: 32,
				iconButtonWidth: 40,
				leftPanelWidth: 350,
				maxMobileWidth: 800
			},
			appearance: {
				url: "components/themes/ax-theme.appearance.bootstrap-1.css",
				class: "bootstrap1-theme"
			},
			baseOn: "bootstrap4",
		},

		// {name: "Bootstrap34", url: "components/stylesheets/theme.bootstrap-1.css", type: "bootstrap4", class: "bootstrap1-theme", rowDataHeight: 32},
		// {name: "Material", url: "components/stylesheets/theme.material.css", type: "material", class: "material-theme", rowDataHeight: 36},
	]
};

if (typeof window === 'undefined') {
	module.exports = applicationInfo;
} else {
	document.title = applicationInfo.name + " " + applicationInfo.version;
}
var axDateTimeFormat = "dd.MM.yyyy HH:mm:ss";
var axDateFormat = "dd.MM.yyyy";
var axDtLimits = -1;
var axLocale = "ro-RO";
var axNumberFormat = {
	style: "decimal",
	locale: axLocale,
	grouping: "true",
	decimals: 2
};

var pagesTemplates = {
	"not-found": "app-modules/home.html",
	loadExtraRoutes: function ($stateProvider) {
		// $stateProvider.stateAsEmptyPage("docs/overview", "/docs/overview/:type","app-modules/demo-app/overview/demo.html");
	}
};

var leftPanelWidth = 300;
var maxMobileWidth = 900;
var changeAppStyle = function (dataStore) {
	dataStore.isMobileDevice = angular.element(window.document).width() <= maxMobileWidth;
	if (dataStore.isMobileDevice) dataStore.leftPaneCollapsed = true;
	angular.element(window.document).find("body").removeClass("is-mobile");
	if (dataStore.isMobileDevice) angular.element(window.document).find("body").addClass("is-mobile");
};
var mainCtrlExtend = function ($scope, $injector) {
	let dataStore = $injector.get("axDataStore");
	let $storage = $injector.get("$localStorage");
	let $timeout = $injector.get("$timeout");
	dataStore.maxMobileWidth = maxMobileWidth;
	dataStore.isMobileDevice = false;
	$scope.leftPaneToggle = function leftPaneToggle(value) {
		let right = angular.element("#right-pane");
		if (value === undefined) value = dataStore.leftPaneCollapsed;
		if (value) {
			dataStore.leftPaneCollapsed = false;
			$timeout(function () {
				let left = angular.element("#left-pane, #copyright");
				changeAppStyle(dataStore);
				if (left.length) {
					left.width(dataStore.isMobileDevice ? 0 : applicationInfo.theme.dimensions.leftPanelWidth);
					left.slideShow("left", 500, function () {
						$storage.user.leftPaneCollapsed = dataStore.leftPaneCollapsed;
						dataStore.rightPanelCssLeft = dataStore.isMobileDevice ? 0 : applicationInfo.theme.dimensions.leftPanelWidth;
						$timeout(function () {
							axUtils.triggerWindowResize();
						});
					}, right, true);
				}
			}, 300);
		} else {
			let left = angular.element("#left-pane,#copyright");
			if (left.length)
				left.slideHide("left", 500, function () {
					changeAppStyle(dataStore);
					if (dataStore.isMobileDevice) dataStore.leftPaneCollapsed = true;
					left.width(0);
					dataStore.rightPanelCssLeft = 0;
					dataStore.leftPaneCollapsed = true;
					if ($storage.user) $storage.user.leftPaneCollapsed = dataStore.leftPaneCollapsed;
					$timeout(function () {
						axUtils.triggerWindowResize();
					});
				}, right);
		}

	};

	changeAppStyle(dataStore);
	axUtils.addEventListener(window, 'resize', function () {
		changeAppStyle(dataStore);
	});
	mediaStyles(maxMobileWidth);
	if (!dataStore.leftPaneCollapsed) $timeout(function () {
		$scope.leftPaneToggle(dataStore.leftPaneCollapsed === false);
	});
};
var changeTheme = function (theme, $rootScope, $injector) {
	// console.log("change theme", theme);
	switch (theme.name) {
		case "Bootstrap":
			break;
		default:
	}
};