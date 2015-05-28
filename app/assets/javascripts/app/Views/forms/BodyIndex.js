;(function (app) {

    app.views.BodyIndexView = app.helpers.BaseView.extend({

        events: {
            'change [name=weight], [name=height]': 'changeData'
        },

        changeData: function (event) {
            this.model.trigger('change:bodyindex');
        }

    }, {
        bindings: {
            weight: {
                selector: '[name=weight]',
                converter: function (dir, value, attr, model) {
                    model.set('bodyindex', model.get('weight') / model.get('height'));

                    return value;
                }
            },
            height: {
                selector: '[name=height]',
                converter: function (dir, value, attr, model) {
                    model.set('bodyindex', model.get('weight') / model.get('height'));

                    return value;
                }
            },

            bodyindex: '[name=bodyindex]'
        }
    });

} (app));