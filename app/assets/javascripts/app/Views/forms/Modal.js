;(function (app) {

    app.views.ModalView = Backbone.View.extend({

        el: '#myModal',

        initialize: function () {
            var viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(this.getArchiveView.bind(this));

            this.tplName = '';
            this._archiveCollectionBinder = new Backbone.CollectionBinder(viewFactory);

            this.listenTo(Backbone.Events, 'modal:updateContent', this.updateContent);
            this.listenTo(Backbone.Events, 'modal:showArchive', this.createTemplate);
        },

        eachHeader: function (accum, elem) {
            return [accum, '<th>', elem, '</th>'].join('');
        },

        createTemplate: function (options) {
            var headers = options.headers;

            this.$('thead').html(headers.reduce(this.eachHeader, '<tr>') + '</tr>');
            this.$('.modal-title').text(options.title);
            this.$el.modal('show');
        },

        getArchiveView: function (model) {
            return new app.views.ArchiveView({
                tplName: this.tplName,
                model: model
            });
        },

        updateContent: function (collection, tpl) {
            this.tplName = tpl;
            this._archiveCollectionBinder.bind(collection, this.$('#archive-container'));
        }

    });

} (app));