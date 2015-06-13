;(function (app) {

    app.models.ShoulderIndexModel = app.models.BaseModel.extend({

        urlPart: '/shoulder_indices/',

        wrapperJson: 'shoulderIndex',

        defaults: {
            age: '',
            shoulder: '',
            shoulderWidth: '',
            brachialIndex: ''
        },

        calculate: function () {
            var result = this.get('shoulderWidth') / this.get('shoulder') * 100;

            this.set('brachialIndex', result);
        }

    });

} (app));