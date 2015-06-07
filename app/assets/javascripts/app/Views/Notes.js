;(function (app) {

    app.views.NotesView = app.views.UserActionsView.extend({


        afterRender: function () {
            console.warn(this.model.toJSON());
        },

        onSubmitUserAction: function () {
            this.model.save();
        }

    });

} (app));