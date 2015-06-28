;(function (app) {

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
            this.datepicker.setDate(new Date());
        },

        binding: function () {
            app.views.BaseView.prototype.binding.call(this);
        }

    });

} (app));