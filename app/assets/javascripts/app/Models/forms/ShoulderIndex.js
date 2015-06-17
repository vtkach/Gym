;(function (app) {

    app.models.ShoulderIndexModel = app.models.BaseModel.extend({

        urlPart: '/shoulder_indices/',

        wrapperJson: 'shoulderIndex',

        defaults: {
            date: '',
            age: '',
            shoulder: '',
            shoulderWidth: '',
            brachialIndex: ''
        },

        validation: {
            date: {},
            age: {},
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
            var result;

            this.validate();

            if (!this.isValid()) {
                return ;
            }

            result = this.get('shoulderWidth') / this.get('shoulder') * 100;
            this.set('brachialIndex', result);
        }

    });

} (app));