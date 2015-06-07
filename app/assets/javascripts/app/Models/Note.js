;(function (app) {

    app.models.NoteModel = app.models.BaseModel.extend({

        url: '',

        defaults: {
            date: '',
            note: ''
        }

    });

} (app));