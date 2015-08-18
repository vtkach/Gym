;(function (app) {

    app.views.ArchiveView = app.views.BaseView.extend({

        tagName: 'tr',

        binding: function () {
            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

            bindings.date.converter = this.dateConverter;
            this._modelBinder.bind(
                this.model,
                this.el,
                bindings
            );

            this.extendBinding();
        }

    });

} (app));