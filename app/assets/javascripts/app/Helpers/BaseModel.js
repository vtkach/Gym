;(function (app) {

    app.models.BaseModel = Backbone.Model.extend({

        wrapperJson: '',

        ajax: function (options) {
            return $.ajax(options);
        },

        url: function () {
            var id = this.get('id') || '';

            return this.urlPart + id;
        },

        toJSON: function () {
            var data = _.clone(this.attributes),
                result;

            if (this.wrapperJson) {
                result = {};
                result[this.wrapperJson] = data;
            }

            return result || data;
        }

    });

} (app));