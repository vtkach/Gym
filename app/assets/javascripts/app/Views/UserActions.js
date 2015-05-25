;(function (app) {

    app.views.UserActionsView = app.helpers.BaseView.extend({

        className: 'fade-in',

        events: {
            'click .btn-success': 'onSubmitUserAction',
            'submit form': 'prevDefault',
            'click .cancel': 'onCancelForm'
        },

        onInit: function () {
            this._modelBinder = new Backbone.ModelBinder();
        },

        onCancelForm: function () {
            app.instances.router.navigate('accessed/home', { trigger: true });
        },

        onSuccessCallback: function (userData) {
            app.instances.user.set(userData);
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
