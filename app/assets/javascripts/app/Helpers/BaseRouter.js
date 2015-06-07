;(function (app) {

    app.routers.BaseRouter = Backbone.Router.extend({

        viewFactoryMethod: function (name, options) {
            return new app.views[name + 'View'](options);
        },

        modelFactoryMethod: function (name, options) {
            return new app.models[name + 'Model'](options);
        }

    });

} (app));
