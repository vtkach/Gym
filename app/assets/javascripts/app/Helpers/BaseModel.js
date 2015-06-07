;(function (app) {

    app.models.BaseModel = Backbone.Model.extend({

        ajax: function (options) {
            return $.ajax(options);
        },

        url: function () {
            var id = this.get('id') || '';

            return this.urlPart + id;
        }

    });

} (app));