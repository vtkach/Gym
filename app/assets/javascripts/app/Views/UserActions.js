;(function (app) {

    app.views.UserActionsView = app.views.BaseView.extend({

        className: 'fade-in',

        events: {
            'click .btn-success': 'onSubmitUserAction',
            'submit form': 'prevDefault',
            'change #remember-me': 'onRemember',
            'click form button': 'prevDefault',
            'click .cancel': 'onCancelForm'
        },

        onRemember: function (event) {

        },

        binding: function () {
            this._modelBinder.bind(this.model, this.$el);
        },

        onCancelForm: function (e) {
            this.prevDefault(e);
            app.instances.router.navigate('accessed/home', { trigger: true });
        },

        onSuccessCallback: function (userData) {
            app.instances.user.setUserData(userData);
            app.instances.router.navigate('accessed/home', { trigger: true });
            this.constructor.showFlashMessage('success', { responseText: 'Вы вошли!' });
        },

        onSubmitUserAction: function () {
            //TODO: this.model should be Authentication
            app.instances.session.logIn(this.model.toJSON())
                .done(this.onSuccessCallback.bind(this));

            return false;
        }
    });

} (app));
