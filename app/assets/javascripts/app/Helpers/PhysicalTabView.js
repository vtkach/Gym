;(function (app) {

    app.views.PhysicalTabView = app.views.BaseView.extend({

        _archiveCollectionBinder: null,

        _archiveCollection: null,

        _profileBinder: null,

        onInit: function () {
            var viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(this.getArchiveView.bind(this));

            this._archiveCollection = new app.collections.ArchiveCollection();
            this._archiveCollection.url = this.model.urlPart;
            this._archiveCollectionBinder = new Backbone.CollectionBinder(viewFactory);
            this.extendEvents({
                'click #archive': 'getArchive',
                'click .calculate': 'onCalculate',
                'click .save': 'onSave'
            });
            Backbone.Validation.bind(this);
        },

        onCalculate: function () {
            this.model.calculate();
        },

        onSave: function () {
            this.model.calculate();
            this.model.save();
        },

        getArchive: function () {
            this._archiveCollection.fetch()
                .done(this.getModalDialog.bind(this));
        },

        getModalDialog: function () {

        },

        getArchiveView: function (model) {
            return new app.views.ArchiveView({
                tplName: this.model.get('urlPart').replace(/\//g, ''),
                model: model
            })
        },

        extendBinding: function () {
            this._profileBinder = new Backbone.ModelBinder();
            this._profileBinder.bind(
                app.instances.profile,
                this.el,
                this.constructor.profileBindings
            );
            this._archiveCollectionBinder.bind(this._archiveCollection, $('#archive-container'));
        },

        onClose: function () {
            this._archiveCollectionBinder.unbind();
            this._profileBinder.unbind();
            this._modelBinder.unbind();

            this._modelBinder = this._archiveCollectionBinder = this._profileBinder = null;
        }

    });

} (app));
