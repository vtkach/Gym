;(function (app) {

    app.views.ProfileView = app.views.UserActionsView.extend({

        onSubmitUserAction: function () {
            this.model.save();
        }

    });

} (app));