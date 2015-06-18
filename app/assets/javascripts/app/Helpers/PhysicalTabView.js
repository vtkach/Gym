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
                'click .calculate': 'onCalculate',
                'click #archive': 'getArchive',
                'click .save': 'onSave'
            });
            Backbone.Validation.bind(this/*, {
                invalid: this.showValidationError.bind(this)
            }*/);
            this.listenTo(this.model, 'validated:invalid', this.showValidationError.bind(this));
        },

        onCalculate: function () {
            this.model.checkData();
        },

        onSave: function () {
            this.model.checkData();
            this.model.save();
        },

        showModal: function (options) {
            Backbone.Events.trigger('trigger-modal', options);
        },

        getArchive: function () {
            this._archiveCollection.fetch()
                .done(this.getModalDialog.bind(this));
        },

        getModalDialog: function () {},

        getArchiveView: function (model) {
            return new app.views.ArchiveView({
                tplName: this.model.urlPart.replace(/\//g, ''),
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

        binding: function () {
            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name', function (dir, val) {
                var value = parseFloat(val)

                return isNaN(value) ? '' : value;
            });

            this._modelBinder.bind(this.model, this.el, bindings);
            this.extendBinding();
        },

        onClose: function () {
            this._archiveCollectionBinder.unbind();
            this._profileBinder.unbind();
            this._modelBinder.unbind();

            this._modelBinder = this._archiveCollectionBinder = this._profileBinder = null;
        },

        showValidationError: function (model, errors) {
            var errorFields = _.keys(errors);

            this.constructor.showFlashMessage.call(this, 'danger', errors[errorFields[0]]);
        }

    });

} (app));
