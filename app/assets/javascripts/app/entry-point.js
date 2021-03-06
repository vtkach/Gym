$(function ($) {
    var $spinner = $('.spinner');

    Backbone.ModelBinder.SetOptions({
        modelSetOptions: {
            validate: true
        }
    });

    $.ajaxSetup({
        beforeSend: $spinner.removeClass.bind($spinner, 'hidden'),
        complete: $spinner.addClass.bind($spinner, 'hidden'),

        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },

        error: function (xhr, type, message) {
            var errorMessage = (xhr.responseJSON && xhr.responseJSON.errors) || message;
            app.instances.notifier.onShowNotify('danger', errorMessage);
        }

    });

    app.instances.notifier = new app.views.NotificationView({
        el: '.flash-message'
    });

    app.instances.router = new app.routers.AppRouter();
    Backbone.history.start();
});