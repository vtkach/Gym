;(function (app) {

    app.views.PhysicalTabView = app.views.BaseView.extend({

        onInit: function () {
            this.delegateEvents({
                'click .calculate': this.model.calculate,
                'click .save': this.model.save
            });
        },

        extendBinding: function () {
            this._profileBinder = new Backbone.ModelBinder();
            this._profileBinder.bind(
                app.instances.profile,
                this.$el,
                this.constructor.profileBindings
            );
        }

    });

} (app));
