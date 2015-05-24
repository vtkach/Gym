;(function (app) {

    app.models.UserActionsModel = app.helpers.BaseModel.extend({

        defaults: {},

        initialize: function (options) {
            this.route = options.route;
        },

        url: function () {
            var routes = {
                register: 'sign_up',
                signin: 'sign_in',
                home: 'sign_out'
            };

            return '/users/' + routes[this.route];
        }

    });

} (app));