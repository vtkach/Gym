$(function ($) {
    $.ajaxSetup({
        ajaxSend: function () {
            $('.spinner').removeClass('hidden');
        },
        ajaxComplete: function () {
            $('.spinner').addClass('hidden');
        },
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
    });

    app.instances.router = new app.routers.AppRouter();
    Backbone.history.start();
});