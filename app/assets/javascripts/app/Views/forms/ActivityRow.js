;(function (app) {

    app.views.ActivityRowView = app.views.BaseView.extend({

        tagName: 'tr',

        events: {
            'click .glyphicon-remove': 'removeRow'
        },

        onInit: function () {
            Backbone.Validation.bind(this, { forceUpdate: true });
            this.listenTo(this.model, 'validated:invalid', this.showValidationError.bind(this));
            this.listenTo(this.model, 'error', this.showServerError.bind(this))
        },

        removeRow: function () {
            this.model.destroy();
        }

    });

} (app));