;(function (app) {
    //var NotesView = app.views.UserActionsView.extend(app.views.PhysicalTabView.prototype);

    app.views.NotesView = app.views.PhysicalTabView.extend({

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

        onSave: function () {
            this.model.save()
                .done(this.refreshModel.bind(this));
        },

        refreshModel: function () {
            this.showSuccessMessage();
            this.model.clear();
        },

        binding: function () {
            app.views.BaseView.prototype.binding.call(this);
        }

    });

} (app));