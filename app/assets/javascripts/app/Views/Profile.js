;(function (app) {

    app.views.ProfileView = app.views.UserActionsView.extend({

        initialize: function () {
            app.views.UserActionsView.prototype.initialize.apply(this, arguments);
            this.listenTo(this.model, 'sync', this.showSuccessMessage.bind(this))
                .listenTo(this.model, 'error', this.showServerError.bind(this));
        },

        onSubmitUserAction: function () {
            this.model.save();
        }

    });

} (app));