;(function (app, Backbone, document) {

    app.views.NotificationView = Backbone.View.extend({

        initialize: function () {
            this.$el.append(this.render());
        },

        render: function () {
            var tpl = document.querySelector('#notification');

            this.$el.append(document.importNode(tpl.content, true));

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
            this.timeout = setTimeout(this.hideNotify.bind(this), SHOW_TIME);
        },

        hideNotify: function () {
            this.$el.removeClass('notify');
        }

    });

} (app, Backbone, document));