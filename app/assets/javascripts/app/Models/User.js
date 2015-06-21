;(function (app) {

    app.models.UserModel = app.models.BaseModel.extend({

        wrapperJson: 'user',

        parse: function (response) {
            this.updateProfile(response.profile);

            return response.user;
        },

        setUserData: function (data) {
            this.updateProfile(data.profile);
            this.set(data.user);
        },

        updateProfile: function (data) {
            app.instances.profile.set(data);
        },

        loadUser: function () {
            return this.fetch({
                url: '/users/current_user',
                async:false
            });
        }

    });

} (app));
