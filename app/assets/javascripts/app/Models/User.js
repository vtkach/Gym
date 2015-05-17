;(function (app) {

    app.models.UserModel = Backbone.Model.extend({

        url: 'users/sign_in',

        initialize: function () {
            this.fetch();
        },

        toJSON: function () {
            return {
                user: _.clone(this.attributes)
            };
        },

        checkSession: function () {
            return this.fetch({
                url: '/users/check_session'
            });
        },

        loadUser: function () {
            return this.fetch({
                url: '/users/current_user'
            });
        },

        signOut: function () {
            return this.destroy({
                url: '/users/sign_out'
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
