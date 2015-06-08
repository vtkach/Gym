;(function (app) {

    app.views.PhysicalStateView = app.views.PhysicalTabView.extend({


        afterRender: function () {
            console.warn(this);
            //this.$('[name=date]').datepicker();
            //this.$('button').on('click', this.onSaveEvent.bind(this));
        }


    }, {
        profileBindings: {
            gender: {
                selector: '[name=gender]',
                converter: function (dir, val) {
                    var dict = {
                        m: 'Мужчина',
                        f: 'Женщина'
                    };

                    if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                        return dict[val];
                    }

                    return val;
                }
            }
        }
    });

} (app));