;(function (app) {

    app.views.UserActionsView = app.helpers.BaseView.extend({

        className: 'fade-in',

        events: {
            'click .btn-success': 'onSubmitUserAction',
            'click form button': 'prevDefault',
            'click .cancel': 'onCancelForm'
        },

        onInit: function () {
            _.bindAll(this, 'onSuccessCallback', 'onErrorCallback');
            this._modelBinder = new Backbone.ModelBinder();
        },

        onCancelForm: function () {
            app.instances.router.navigate('accessed/home', { trigger: true });
        },

        onSuccessCallback: function (userData) {
            app.instances.user.set(userData);
            Backbone.Events.trigger('success-login');
        },

        onErrorCallback: function () {
            console.warn(arguments, 'errror')
        },

        onSubmitUserAction: function () {
            //TODO: this.model should be Authentication
            app.instances.session.logIn(this.model.toJSON()).then(
                this.onSuccessCallback,
                this.onErrorCallback
            );

            return false;
        }
    });

} (app));
