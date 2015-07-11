;(function (app) {

    app.views.ShoulderIndexView = app.views.PhysicalTabView.extend({

        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Вiк',
                    'Дата',
                    'Плечова дуга, см',
                    'Ширина плечей, см',
                    'Плечовий індекс (%)'
                ],
                tplName: 'shoulder_indices',
                title: 'Плечовий індекс та постава'
            });
        }


    });

} (app));