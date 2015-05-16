;(function (app) {

    app.views.InfoTabView = app.helpers.BaseView.extend({

        className: 'fade-in',

        onClose: function () {
            app.instances.router.navigate('accessed/home', { trigger: true });
        }

    });

} (app));