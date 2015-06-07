;(function (app) {

    app.models.UserModel = app.models.BaseModel.extend({

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
        }

    });

} (app));
