;(function (app) {

    app.views.MotorActivityView = app.views.PhysicalTabView.extend({

        addRow: function () {
            this.collection.add({});
        },

        onInit: function () {
            app.views.PhysicalTabView.prototype.onInit.apply(this, arguments);
            this.extendEvents({
                'keydown input[type=number]': 'onlyDigits',
                'paste input[type=number]': 'prevDefault',
                'click .glyphicon-plus': 'addRow'
            });
        },

        onlyDigits: function (event) {
         /*   if (event.keyCode < 48 || (event.keyCode > 57 && event.keyCode < 96) || event.keyCode > 105) {
                debugger;
            }*/
        },

        afterRender: function () {
            var viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(this.getActivityView);

            this.collection = this.model.activityCollection;
            this._collectionBinder = new Backbone.CollectionBinder(viewFactory);
            this._collectionBinder.bind(this.collection, this.$('.activities'));
            this.addRow();
            this.initDatePicker();
            this.listenTo(this.collection, 'add remove', this.model.calculate.bind(this.model));
        },

        setEachActivityBinding: function (bindings, key) {
            bindings[key + 'percent'].converter = this.model.converterForActivityPercent;
            bindings[key + 'result'].converter = this.model.converterForActivityLevel;
        },

        beforeBinding: function () {
            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name'),
                activities = ['ml', 'bl', 'sl', 'sml', 'hl'];

            _.each(activities, this.setEachActivityBinding.bind(this, bindings));

            this.constructor.bindings = bindings;
        },

        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Базовий рівень',
                    'Сидячий рівень',
                    'Малий рівень',
                    'Середній рівень',
                    'Високий рівень'
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