;(function (app) {

    app.models.ShoulderIndexModel = app.models.PhysicalTabModel.extend({

        urlPart: '/shoulder_indices/',

        wrapperJson: 'shoulderIndex',

        defaults: {
            date: '',
            age: '',
            shoulder: '',
            shoulderWidth: '',
            brachialIndex: ''
        },

        additionalFields: {
            shoulder: {
                range: [10, 100],
                msg: 'Плечова дуга повинна бути в діапазоні від 10 до 100 cм!'

            },
            shoulderWidth: {
                range: [20, 200],
                msg: 'Ширина плечей повинна бути в діапазоні від 20 до 200 см!'
            }
        },

        calculate: function () {
            var result = this.get('shoulderWidth') / this.get('shoulder') * 100;;

            this.set('brachialIndex', result);
        }

    });

} (app));