;(function (app) {

    app.views.FormView = app.views.BaseView.extend({

        events: {
            'click .calculate': 'onCalculate',
            'click .save': 'onSave'
        },

        onSave: function () {
            this.model.calculate();
            this.model.save();
        },

        onCalculate: function () {
            this.model.calculate();
        },

        extendBinding: function () {
            this._profileBinder = new Backbone.ModelBinder();
            this._profileBinder.bind(app.instances.profile, this.$el, this.constructor.bindings);
        }

    });

} (app));