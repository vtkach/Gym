;(function (app) {

    app.views.ActivityRowView = app.views.BaseView.extend({

        tagName: 'tr',

        events: {
            'click .glyphicon-remove': 'removeRow'
        },

        onInit: function () {
            this.listenTo(this.model, 'validated:invalid', this.showValidationError.bind(this));
            this.listenTo(this.model, 'error', this.showServerError.bind(this));
        },

        removeRow: function () {
            this.model.destroy();
        },

        bindings: function () {
            this._modelBinder.bind(
                this.model,
                this.el,
                this.constructor.bindings,
                { modelSetOptions: { validate: false } }
            );

            this.extendBinding();
        }

    });

} (app));