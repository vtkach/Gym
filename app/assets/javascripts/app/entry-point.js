$(function ($) {
    $.ajaxSetup({
        ajaxSend: function () {
            $('.spinner').removeClass('hidden');
        },
        ajaxComplete: function () {
            $('.spinner').addClass('hidden');
        }
    });

    app.instances.router = new app.routers.AppRouter();
    Backbone.history.start();
});