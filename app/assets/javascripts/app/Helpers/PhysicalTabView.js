;(function (app) {

    app.views.PhysicalTabView = app.views.BaseView.extend({

        onInit: function () {
            this.delegateEvents({
                'click .calculate': this.model.calculate,
                'click .save': this.model.save
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
        }

    });

} (app));
