;(function (app) {

    app.views.ActivityRowView = app.views.BaseView.extend({

        tagName: 'tr',

        events: {
            'click .glyphicon-remove': 'removeRow'
        },

        onInit: function () {
            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'validated:invalid', this.showRowError.bind(this));
            this.listenTo(this.model, 'validated:valid', this.removeRowError.bind(this));
            this.listenTo(this.model, 'error', this.showServerError.bind(this));
        },

        removeRow: function () {
            this.model.destroy();
        },

        showRowError: function () {
            this.showValidationError.apply(this, arguments);
            this.$el.addClass('danger');
        },

        removeRowError: function () {
            this.$el.removeClass('danger');
        },

        binding: function () {
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