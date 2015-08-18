;(function (app) {

    app.views.PhysicalStateView = app.views.PhysicalTabView.extend({

        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Дата',
                    'Вiк',
                    'Зріст, см',
                    'Вага, кг',
                    'Окружність грудноі клітки, см',
                    'Життєва ємність легенів, мл',
                    'Індекс маси тіла',
                    'Життєвий індекс'
                ],
                tplName: 'physical_states',
                title: 'Фізичний розвиток'
            });
        }

    });

} (app));