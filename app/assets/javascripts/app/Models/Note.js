;(function (app) {

    app.models.NoteModel = app.models.BaseModel.extend({

        url: '/notes',

        defaults: {
            date: '',
            note: ''
        },

        toJSON: function () {
            return {
                note: _.clone(this.attributes)
            };
        }

    });

} (app));