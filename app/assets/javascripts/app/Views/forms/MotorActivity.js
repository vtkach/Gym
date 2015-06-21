;(function (app) {

    app.views.MotorActivityView = app.views.PhysicalTabView.extend({

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
            this.initDatePicker();
        },

        getActivityView: function (model) {
            return new app.views.ActivityRowView({
                tplName: 'activity-row',
                model: model
            });
        }

    }, {
        profileBindings: {
            gender: {
                selector: '[name=gender]',
                converter: function (dir, val) {
                    var dict = {
                        male: 'Мужчина',
                        female: 'Женщина'
                    };

                    if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                        return dict[val];
                    }

                    return val;
                }
            },

            firstName: '[name=firstName]',
            lastName: '[name=lastName]',
            surname: '[name=surname]'
        }
    });

} (app));