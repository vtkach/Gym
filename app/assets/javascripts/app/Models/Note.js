;(function (app) {

    app.models.NoteModel = app.models.BaseModel.extend({

        url: '/notes',

        wrapperJson: 'note',

        defaults: {
            date: '',
            note: ''
        }

    });

} (app));