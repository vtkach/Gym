;(function (app) {
    var NotesView = app.views.UserActionsView.extend(app.views.PhysicalTabView.prototype);

    app.views.NotesView = NotesView.extend({

        getModalDialog: function () {
            this.showModal({
                headers: [
                   'Дата',
                   'Нотатка'
                ],
                tplName: 'notes',
                title: 'Нотатки'
            });
        },

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