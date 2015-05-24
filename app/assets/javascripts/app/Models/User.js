;(function (app) {

    app.models.UserModel = app.helpers.BaseModel.extend({

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
