;(function (app) {

    app.models.UserModel = Backbone.Model.extend({

        toJSON: function () {
            return {
                user: _.clone(this.attributes)
            };
        },

        loadUser: function () {
            return this.fetch({
                url: '/users/current_user'
            });
        },

        logIn: function () {
            return this.save({}, {
                url: '/users/sign_in',
                method: 'POST'
            });
        },

        createUser: function (userData) {
            return this.save(userData, {
                url: '/users',
                method: 'POST'
            });
        }

    });

} (app));
