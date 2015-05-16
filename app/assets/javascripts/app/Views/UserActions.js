;(function (app) {

    app.views.UserActionsView = app.helpers.BaseView.extend({

        className: 'fade-in',

        viewOptions: {

            signin: {
                url: '/users/sign_in'
            },

            register: {
                url: 'registerurl'
            },

            home: {
                url: 'logouturl'
            },

            profile: {
                url: 'profileurl'
            }

        },

        events: {
            'click .btn-success': 'onSubmitUserAction',
            'change #remember-me': 'onRemember',
            'click form button': 'prevDefault',
            'click .cancel': 'onCancelForm'
        },

        onInit: function () {
            _.bindAll(this, 'onSuccessCallback', 'onErrorCallback');
            this._modelBinder = new Backbone.ModelBinder();
        },

        onRemember: function (event) {

        },

        onCancelForm: function () {
            app.instances.router.navigate('accessed/home', { trigger: true });
        },

        onSuccessCallback: function () {
            Backbone.Events.trigger('success-login');
        },

        onErrorCallback: function () {
            console.warn(arguments, 'errror')
        },

        onSubmitUserAction: function () {
            app.instances.user.save().then(
                this.onSuccessCallback,
                this.onErrorCallback
            );

            return false;
        }
    });

} (app));
