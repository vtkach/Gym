;(function (app) {

    app.models.NoteModel = app.models.BaseModel.extend({

        urlPart: '/notes/',

        url: '/notes',

        wrapperJson: 'note',

        defaults: {
            date: '',
            note: ''
        }

    });

} (app));