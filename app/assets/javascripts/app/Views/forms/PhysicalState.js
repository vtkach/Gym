;(function (app) {

    app.views.PhysicalStateView = app.helpers.FormView.extend({

        afterRender: function () {
            this.$('[name=date]').datepicker();
        }


    }, {
        bindings: {
            firstName: '[name=firstName]',
            lastName: '[name=lastName]',
            surname: '[name=surname]',

            gender: {
                selector: '[name=gender]',
                converter: function (dir, value, attr, model) {
                    var gender = {
                        male: 'М',
                        female: 'Ж'
                    };

                    return gender[value];
                }
            }
        }
    });

} (app));