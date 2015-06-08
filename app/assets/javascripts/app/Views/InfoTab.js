;(function (app) {

    app.views.InfoTabView = app.views.BaseView.extend({

        events: {
            'click li': 'changeTab'
        },

        className: 'fade-in',

        changeTab: function (event) {
            var $currentTarget = $(event.currentTarget);

            $currentTarget.siblings().removeClass('active');
            $currentTarget.addClass('active');
        }

    });

} (app));