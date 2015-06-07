$(function ($) {
    var $spinner = $('.spinner');

    $.ajaxSetup({
        beforeSend: $spinner.removeClass.bind($spinner, 'hidden'),
        complete: $spinner.addClass.bind($spinner, 'hidden'),
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },

        error: app.views.BaseView.showFlashMessage.bind(null, 'danger')

    });

    app.instances.router = new app.routers.AppRouter();
    Backbone.history.start();
});