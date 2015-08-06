;(function (app) {

    app.models.UserModel = app.models.BaseModel.extend({

        wrapperJson: 'user',

        parse: function (response) {
            this.updateProfile(response.profile);
            Backbone.Events.trigger('is-login', true);

            return response.user;
        },

        setUserData: function (data) {
            this.updateProfile(data.profile);
            this.set(data.user);
            Backbone.Events.trigger('is-login', true);
        },

        updateProfile: function (data) {
            app.instances.profile.set(data);
        },

        loadUser: function () {
            return this.fetch({
                url: '/users/current_user'
            });
        },

        isValidUser: function () {
            return !_.isEmpty(this.attributes);
        }

    });

} (app));
