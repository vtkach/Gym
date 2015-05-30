;(function (app) {

    app.models.UserModel = app.helpers.BaseModel.extend({

        toJSON: function () {
            return {
                user: _.clone(this.attributes)
            };
        },

        parse: function (response) {
            this.updateProfile(response.profile);

            return JSON.parse(response.user);
        },

        setUserData: function (data) {
            this.updateProfile(data.profile);
            this.set(JSON.parse(data.user));
        },

        updateProfile: function (data) {
            app.instances.profile.set(JSON.parse(data));
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
        },

        loadProfile: function () {
            return app.instances.profile.fetch();
        }

    });

} (app));
