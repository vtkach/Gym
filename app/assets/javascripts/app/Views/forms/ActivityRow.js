;(function (app) {

    app.views.ActivityRowView = app.views.BaseView.extend({

        tagName: 'tr',

        events: {
            'change [name=description]': 'setActivityLevel',
            'click .glyphicon-remove': 'removeRow'
        },

        onInit: function () {
            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'validated:invalid', this.showRowError.bind(this))
                .listenTo(this.model, 'validated:valid', this.removeRowError.bind(this))
                .listenTo(this.model, 'error', this.showServerError.bind(this));
        },

        removeRow: function () {
            this.model.destroy();
        },

        setActivityLevel: function (event) {
            var $selected = $(event.target).find(':selected');

            this.model.set('activityLevel', $selected.data('activity-level'));
        },

        showRowError: function () {
            this.showValidationError.apply(this, arguments);
            this.$el.addClass('danger');
        },

        removeRowError: function () {
            this.$el.removeClass('danger');
        },

        beforeBinding: function () {
            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

            bindings.activityLevel.converter = function (dir, val) {
                var dict = {
                    ml: 'Середній рівень',
                    bl: 'Базовий рівень',
                    sl: 'Сидячий рівень',
                    sml: 'Малий рівень',
                    hl: 'Високий рівень'
                };


                if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                    return dict[val];
                }

                return val;
            };

            this.constructor.bindings = bindings;
        },

        binding: function () {
            this.beforeBinding();
            this._modelBinder.bind(
                this.model,
                this.el,
                this.constructor.bindings,
                {modelSetOptions: {validate: false}}
            );
            this.extendBinding();
        }

    });

} (app));