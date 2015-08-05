;(function (app) {

    app.views.ArchiveView = app.views.BaseView.extend({

        tagName: 'tr',

        afterInit: function () {
            this._modelBinder = new Backbone.ModelBinder();
        }

    }, {
        bindings: {
            date: {
                selector: '[name=date]',
                converter: function (dir, val) {
                    if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                        return val.slice(0, 10);
                    }

                    return val;
                }
            }
        }
    });

} (app));