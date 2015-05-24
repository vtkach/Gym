$(function ($) {
    $.ajaxSetup({
        ajaxSend: function () {
            $('.spinner').removeClass('hidden');
        },

        ajaxComplete: function () {
            $('.spinner').addClass('hidden');
        },

        error: app.helpers.BaseView.showFlashMessage.bind(null, 'danger')
    });

    app.instances.router = new app.routers.AppRouter();
    Backbone.history.start();
});