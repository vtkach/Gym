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
            'click form button': 'prevDefault',
            'change #remember-me': 'onRemember',
            'click .cancel': 'onCancelForm'
        },

        onRemember: function (event) {

        },

        onCancelForm: function () {
            app.instances.router.navigate('views/UserActions/home', { trigger: true });
        },

        onSuccessCallback: function () {
            alert('success!');
            Backbone.Events.trigger('success-login');
        },

        onErrorCallback: function () {
            alert('error!');
            console.warn(arguments, 'errror')
        },

        onSubmitUserAction: function () {
            app.instances.user.save().then(
                this.onSuccessCallback,
                this.onErrorCallback
            );

            return false;
        },

        initialize: function (options) {
            _.bindAll(this, 'onSuccessCallback', 'onErrorCallback');
            this.tplName = options.tplName;
            this.model = options.model;
        }

    }, {

    });

} (app));
