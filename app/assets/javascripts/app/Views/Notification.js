;(function (app, Backbone, document) {

    app.views.NotificationView = Backbone.extend({

        //initialize: function () {
        //    this.listenTo(Backbone.Events, 'show-notify', this.onShowNotify);
        //},

        render: function () {
            var tpl = document.querySelector('#notification');

            this.$el.append(document.importNode(tpl.content, true));

            return this.el;
        },

        onShowNotify: function (messageType, message) {
            var classesToRemove = [
                'alert-warning',
                'alert-success',
                'alert-danger',
                'notify'
            ].join(' ');

            this.$el.removeClass(classesToRemove)
                .find('.text-message')
                .text(message);

            _.delay(this.$el.addClass.bind(this.$el,  'alert-' + messageType + ' notify'), 100);
        }

    });

} (app, Backbone, document));