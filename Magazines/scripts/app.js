(function (global) {
    var app = global.app = global.app || {};

    function startApp() {
        app.application = new kendo.mobile.Application();

        // initialize the responsive images component with your Backend Services API Key
        everliveImages.init("9bWBbo13WFgt2qxs");
    }

    // allow app to be run on devices and on the web
    if (kendo.support.mobileOS) {
        document.addEventListener("deviceready", function () {
            navigator.splashscreen.hide();

            startApp();

            // initialize the feedback comopnent with your Feedback API Key
            feedback.initialize('5a34f640-0761-11e4-81ff-9b933124bfc8');

        }, false);
    } else {
        startApp();
    }

    document.addEventListener("orientationchange", function () {
        everliveImages.responsiveAll();
    });

})(window);
