;(function (app) {

    app.views.PhysicalHealthView = app.views.PhysicalTabView.extend({
        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Вiк',
                    'Дата',
                    'Зріст, см',
                    'Вага, кг',
                    'Артеріальний тиск систолічний',
                    'Життєва ємність легенів, мл',
                    'Сила кисті, кг',
                    'Пульс за 1 хв',
                    'Час відновлення пульсу',
                    'Результат'
                ],
                //tplName: 'shoulder_indices',
                title: 'Плечовий індекс та постава'
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

