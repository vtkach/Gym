;(function (app) {

    app.views.BodyIndexView = app.helpers.BaseView.extend({

        classification: [{
            min: 0,
            max: 18.5
        }, {
            min: 18.5,
            max: 24.9
        }, {
            min: 25,
            max: 29.9
        }, {
            min: 30,
            max: 34.9
        }, {
            min: 35,
            max: 39.9
        }, {
            min: 40,
            max: 200
        }],

        colors: [
            'warning',
            'success',
            'warning',
            'danger',
            'danger',
            'danger'
        ],

        events: {
            'change [name=weight], [name=height]': 'changeData'
        },

        eachRange: function (range) {
            var bodyindex = this.model.get('bodyindex');

            return range.min < bodyindex && range.max > bodyindex;
        },

        coloredTableRow: function () {
            var neededRow = _.findKey(this.classification, this.eachRange.bind(this));

            this.$('tbody tr').removeAttr('class').eq(neededRow).addClass(this.colors[neededRow]);

        },

        onInit: function () {
            this.listenTo(this.model, 'change:bodyindex', this.coloredTableRow);
        },

        changeData: function () {
            this.model.trigger('change:bodyindex');
        }

    }, {
        bindings: {
            weight: {
                selector: '[name=weight]',
                converter: function (dir, value, attr, model) {
                    model.set('bodyindex', model.get('weight') / (model.get('height')) * 100);

                    return value;
                }
            },
            height: [{
                selector: '[name=height]',
                converter: function (dir, value) {
                    var result;

                    if (Backbone.ModelBinder.Constants.ViewToModel === dir) {
                        result = value / 100;
                    } else {
                        result = value * 100;
                    }

                    return result;
                }
            }, {
                selector: '[name=height]',
                converter: function (dir, value, attr, model) {
                    model.set('bodyindex', model.get('weight') / (model.get('height')) * 100);

                    return value;
                }
            }],

            bodyindex: '[name=bodyindex]'
        }
    });

} (app));