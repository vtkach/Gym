;(function (app) {

    app.views.MotorActivityView = app.views.PhysicalTabView.extend({

        railsRoute: '/motor_activities/',

        events: {
            'click .glyphicon-plus': 'addRow'
        },

        addRow: function () {
            this.collection.add({});
        },

        afterRender: function () {
            var viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(this.getActivityView);

            this.collection = new app.collections.ActivityCollection(new app.models.ActivityRowModel);
            this._collectionBinder = new Backbone.CollectionBinder(viewFactory);
            this._collectionBinder.bind(this.collection, this.$('.activities'));
        },

        getActivityView: function (model) {
            return new app.views.ActivityRowView({
                tplName: 'activity-row',
                model: model
            });
        }

    });

} (app));