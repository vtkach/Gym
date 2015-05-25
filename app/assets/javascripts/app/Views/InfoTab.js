;(function (app) {

    app.views.InfoTabView = app.helpers.BaseView.extend({

        className: 'fade-in',

        events: {
            'click .get-forms': 'getForms'
        },

        getForms: function (event) {
            /*var $target = $(event.target),
                parentRoute = $target.parent().data('parent-route'),
                currentRoute = $target.data('route');


            app.instances.navigate(parentRoute + currentRoute, { trigger: true });*/
        },

        onClose: function () {
            app.instances.router.navigate('accessed/home', { trigger: true });
        }

    });

} (app));