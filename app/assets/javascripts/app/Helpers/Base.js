;(function (win) {

    win.helpers.BaseView = Backbone.View.extend({

        events: {
            'click button': 'prevDefault',
            'click .cancel': 'close'
        },

        initialize: function (options) {
            this.tplName = options.tplName;
        },

        prevDefault: function (event) {
            event.preventDefault();
        },

        onClose: function () {

        },

        getTemplate: function (tplName) {
            var content = document.querySelector('#' + tplName).content;

            return document.importNode(content, true);
        },

        render: function () {
            this.$el.html(this.getTemplate(this.tplName));

            return this;
        },

        close: function () {
            this.stopListening();
            this.remove();
            this.onClose();
        }

    });

} (app));