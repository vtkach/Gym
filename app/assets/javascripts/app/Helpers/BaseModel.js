;(function (app) {

    app.models.BaseModel = Backbone.Model.extend({

        ajax: function (options) {
            return $.ajax(options);
        }

    });

} (app));