;(function (app) {

    app.views.InfoTabView = app.views.BaseView.extend({

        events: {
            'click .scroll-bar': 'scrollTo',
            'click li': 'changeTab'
        },

        className: 'fade-in',

        scrollTo: function (event) {
            Backbone.trigger('scroll-to-elem', this.$('.' + event.target.id));
        },

        changeTab: function (event) {
            var $currentTarget = $(event.currentTarget);

            $currentTarget.siblings().removeClass('active');
            $currentTarget.addClass('active');
        }

    });

} (app));