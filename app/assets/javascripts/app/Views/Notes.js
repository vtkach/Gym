;(function (app) {

    app.views.NotesView = app.views.UserActionsView.extend({

        onSubmitUserAction: function () {
            this.model.save()
                .done(this.refreshModel.bind(this));
        },

        refreshModel: function () {
            this._modelBinder.unbind(this.model);
            this.model = new this.model.constructor();
            this.binding();
        }

    });

} (app));