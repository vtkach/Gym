;(function (app) {

    app.helpers.BaseModel = Backbone.Model.extend({

        ajax: function (options) {
            return $.ajax(options);
        }

    });

} (app));