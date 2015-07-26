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
                title: 'Плечовий індекс та постава'
            });
        }
    });

} (app));

