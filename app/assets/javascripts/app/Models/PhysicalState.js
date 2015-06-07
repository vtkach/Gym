;(function (app) {

    app.models.PhysicalState = app.models.BaseModel.extend({

        url: function () {
            var id = this.get('id') || '';

            return '/physical_states/' + id;
        },

        defaults: {
            circumference: '',
            volume: '',
            height: '',
            weight: '',
            date: '',
            bodyindex: '',
            lifeindex: ''
        },

        calculate: function () {
            this.calculateBodyIndex();
            this.calculateLifeIndex();
        },

        calculateBodyIndex: function () {
            this.set('bodyindex', this.get('weight') / (this.get('height')) * 100);
        },

        calculateLifeIndex: function () {
            this.set('lifeindex', this.get('volume') / this.get('weight'));
        },

        toJSON: function () {
            return {
                physicalState: _.clone(this.attributes)
            }
        }

    });

} (app));