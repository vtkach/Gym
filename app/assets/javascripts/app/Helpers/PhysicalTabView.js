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
            Backbone.Validation.bind(this, { forceUpdate: true });
            this.listenTo(this.model, 'validated:invalid', this.showValidationError.bind(this));
        },

        onCalculate: function () {
            this.model.checkData();
        },

        onSave: function () {
            this.model.checkData();
            //this.model.set('age', app.instances.profile);
            this.model.save()
                .done(function (data) {
                    this.datepicker.setDate(data);
                }.bind(this));
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
                this.$('#profile'),
                this.constructor.profileBindings
            );
            this._archiveCollectionBinder.bind(this._archiveCollection, $('#archive-container'));
        },

        binding: function () {
            //var properties = this.model.keys();
            //console.warn(properties);
            //var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'id', function (dir, val) {
            //    var value = parseFloat(val);
            //
            //    return isNaN(value) ? '' : value;
            //});

            this._modelBinder.bind(this.model, this.el, this.constructor.bindings);
            this.extendBinding();
        },

        onClose: function () {
            this._archiveCollectionBinder.unbind();
            this._profileBinder.unbind();
            this._modelBinder.unbind();
            this.datepicker.destroy();

            this._modelBinder = this._archiveCollectionBinder = this._profileBinder = null;
        },

        showValidationError: function (model, errors) {
            var errorFields = _.keys(errors);

            this.constructor.showFlashMessage.call(this, 'danger', {
                errors: errors[errorFields[0]]
            });
        },

        afterRender: function () {
            this.initDatePicker();
        },

        initDatePicker: function () {
            this.datepicker = new Pikaday({
                field: this.$('[name=datepicker]').get(0),

                onSelect: function (date) {
                    console.warn(date);
                    this.model.set('date', date);
                }.bind(this),

                i18n: {
                    previousMonth: 'Попередній місяць',
                    nextMonth: 'Наступний місяць',
                    weekdays: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
                    weekdaysShort : ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'],
                    months: [
                        'Січень',
                        'Лютий',
                        'Березень',
                        'Квітень',
                        'Травень',
                        'Червень',
                        'Липень',
                        'Серпень',
                        'Вересень',
                        'Жовтень',
                        'Листопад',
                        'Грудень'
                    ]
                }
            });

            this.datepicker.setDate(new Date());
        }

    });

} (app));
