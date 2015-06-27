;(function (app) {

    app.views.RegistrationView = app.views.UserActionsView.extend({

        onSubmitUserAction: function (e) {
            this.prevDefault(e);

            app.instances.session.createUser(this.model.toJSON())
                .done(this.successRegistration.bind(this));
        },

        successRegistration: function (userData) {
            app.instances.user.setUserData(userData);
            app.instances.router.navigate('/', { trigger: true });
            Backbone.Events.trigger('is-login', true);
        }

    });

} (app));