;(function (app) {

    app.models.ShoulderIndexModel = app.models.BaseModel.extend({

        urlPart: '/shoulder_indices/',

        defaults: {
            shoulder: '',
            shoulderWidth: '',
            brachialIndex: ''
        },

        calculate: function () {
            var result = this.get('shoulderWidth') / this.get('shoulder') * 100;

            this.set('brachialIndex', result);
        },

        toJSON: function () {
            return {
                shoulderIndex: _.clone(this.attributes)
            }
        }

    });

} (app));