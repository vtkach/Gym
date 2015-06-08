;(function (app) {

    app.views.PhysicalTabView = app.views.BaseView.extend({

        onInit: function () {
            this.extendEvents({
                'click .calculate': 'onCalculate',
                'click .save': 'onSave'
            });
        },

        extendBinding: function () {
            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

            this._profileBinder = new Backbone.ModelBinder();
            _.extend(bindings, this.constructor.profileBindings);
            this._profileBinder.bind(
                app.instances.profile,
                this.el,
                bindings
            );
        },

        onCalculate: function () {
            this.model.calculate();
        },

        onSave: function () {
            this.model.calculate();
            this.model.save();
        }

    });

} (app));
