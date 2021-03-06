;(function (app) {

    app.views.UserActionsView = app.views.BaseView.extend({

        className: 'fade-in',

        events: {
            'click .btn-success': 'onSubmitUserAction',
            'change #remember-me': 'onRemember',
            'click form button': 'prevDefault',
            'click .cancel': 'onCancelForm',
            'submit form': 'prevDefault'
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
            app.instances.notifier.onShowNotify('success', 'Ви увійшли!');
        },

        onSubmitUserAction: function () {
            var rememberMe = this.$('[name=remember_me]:checked').length;

            this.model.set('remember_me', rememberMe);
            app.instances.session.logIn(this.model.toJSON())
                .done(this.onSuccessCallback.bind(this));

            return false;
        }
    });

} (app));
