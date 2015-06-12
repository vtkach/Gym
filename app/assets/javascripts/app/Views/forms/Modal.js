;(function (app) {

    app.views.ModalView = Backbone.View.extend({

        el: '#myModal',

        initialize: function () {
            this.listenTo(Backbone.Events, 'trigger-modal', this.createTemplate);
        },

        eachHeader: function (accum, elem) {
            return [accum, '<th>', elem, '</th>'].join('');
        },

        createTemplate: function (options) {
            var headers = options.headers;

            this.$('thead').html(headers.reduce(this.eachHeader, '<tr>') + '</tr>');
            this.$('.modal-title').text(options.title);
            this.$el.modal('show');
        }

    });

} (app));