(function (global) {
    var app = global.app = global.app || {};
   
    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();

        app.application = new kendo.mobile.Application();

        //initializing the responsive images component with your Backend Services API Key
        everliveImages.init("9bWBbo13WFgt2qxs");

        //initializing the feedback comopnent with your Feedback API Key
        //feedback.initialize('5a34f640-0761-11e4-81ff-9b933124bfc8');

    }, false);

    document.addEventListener("orientationchange", function () {
        
        everliveImages.responsiveAll();
    });

})(window);