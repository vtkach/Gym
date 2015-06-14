;(function (app) {

    app.views.ShoulderIndexView = app.views.PhysicalTabView.extend({

        getModalDialog: function () {
            Backbone.Events.trigger('trigger-modal', {
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