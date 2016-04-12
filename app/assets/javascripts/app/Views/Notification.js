;(function (app, Backbone) {

    app.views.NotificationView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.append(app.views.BaseView.prototype.getTemplate.call(this, 'notification'));

            return this.el;
        },

        onShowNotify: function (messageType, message) {
            var classesToRemove = [
                'alert-warning',
                'alert-success',
                'alert-danger'
            ].join(' '),
            SHOW_TIME = 5000;

            this.$el.removeClass(classesToRemove)
                .find('.text-message')
                .text(message);

            this.$el.addClass('alert-' + messageType + ' notify');

            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.$el.removeClass.bind(this.$el, 'notify'), SHOW_TIME);
        }

    });

} (app, Backbone));