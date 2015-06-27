;(function (app) {

    app.routers.BaseRouter = Backbone.Router.extend({

        capitalize: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },

        factoryMethod: function (name, type, options) {
            var classType = this.capitalize(type);

            return new app[type + 's'][name + classType](options);
        }

    });

} (app));
