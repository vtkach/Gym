;(function (app) {

    app.views.PhysicalStateView = app.views.PhysicalTabView.extend({

        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Вiк',
                    'Зріст, см',
                    'Вага, кг',
                    'Окружність грудноі клітки, см',
                    'Життєва ємність легенів, мл',
                    'Індекс маси тіла',
                    'Життєвий індекс'
                ],
                tplName: 'physical_state',
                title: 'Фізичний розвиток'
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