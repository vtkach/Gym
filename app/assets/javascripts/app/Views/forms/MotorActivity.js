;(function (app) {

    app.views.MotorActivityView = app.views.PhysicalTabView.extend({

        addRow: function () {
            this.collection.add({});
        },

        onInit: function () {
            app.views.PhysicalTabView.prototype.onInit.apply(this, arguments);
            this.extendEvents({
                'click .glyphicon-plus': 'addRow'
            });
        },

        afterRender: function () {
            var viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(this.getActivityView);

            //this.collection = new app.collections.ActivityCollection(new app.models.ActivityRowModel);
            this.collection = this.model.activityCollection;
            this._collectionBinder = new Backbone.CollectionBinder(viewFactory);
            this._collectionBinder.bind(this.collection, this.$('.activities'));
            this.addRow();
            this.initDatePicker();
        },

        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Час початку діяльності',
                    'Загальний зміст діяльності',
                    'Тривалість діяльності',
                    'Рівень рухової активності'
                ],
                title: 'Рухова активність'
            });
        },

        getActivityView: function (model) {
            return new app.views.ActivityRowView({
                tplName: 'activity-row',
                model: model
            });
        }

    });

} (app));