;(function (app) {

    app.models.ShoulderIndexModel = app.models.BaseModel.extend({

        url: function () {
            var id = this.get('id') || '';

            return '/shoulder_indices/' + id;
        },

        defaults: {
            shoulder: '',
            shoulderWidth: '',
            brachialIndex: ''
        },

        calculate: function () {
            this.calculateBrachialIndex();
        },

        calculateBrachialIndex: function () {
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