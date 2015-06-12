;(function (app) {

    app.views.PhysicalStateView = app.views.PhysicalTabView.extend({

        railsRoute: '/physical_states/',

        getModalDialog: function () {
            Backbone.Events.trigger('trigger-modal', {
                headers: [
                    'Вiк',
                    'Зріст, см',
                    'Вага, кг',
                    'Окружність грудноі клітки, см',
                    'Життєва ємність легенів, мл'
                ],
                tplName: 'physical_state',
                title: 'Фізичний розвиток'
            });
        },

        afterRender: function () {
            console.warn(this);
            //this.$('[name=date]').datepicker();
            //this.$('button').on('click', this.onSaveEvent.bind(this));
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
            }
        }
    });

} (app));