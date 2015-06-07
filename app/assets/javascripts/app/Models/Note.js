;(function (app) {

    app.models.NoteModel = app.helpers.BaseModel.extend({

        url: '',

        defaults: {
            date: '',
            note: ''
        }

    });

} (app));