;(function (app) {

    app.views.PhysicalTabView = app.views.BaseView.extend({

        _archiveCollectionBinder: null,

        _archiveCollection: null,

        _profileBinder: null,

        onInit: function () {
            this._archiveCollection = new app.collections.ArchiveCollection();
            this._archiveCollection.url = this.model.urlPart;

            this.extendEvents({
                'click .calculate': 'onCalculate',
                'click #archive': 'getArchive',
                'click .save': 'onSave'
            });

            Backbone.Validation.bind(this, { forceUpdate: true });
            this.listenTo(this.model, 'validated:invalid', this.showValidationError.bind(this));
            this.listenTo(this.model, 'error', this.showServerError.bind(this));
        },

        onCalculate: function () {
            this.model.checkData();
        },

        onSave: function () {
            this.model.checkData();
            this.model.save()
                .done(function (data) {
                    this.datepicker.setDate(data);
                }.bind(this));
        },

        showModal: function (options) {
            Backbone.Events.trigger('modal:showArchive', options);
        },

        getArchive: function () {
            this._archiveCollection.fetch()
                .done(this.getModalDialog.bind(this));
        },

        getModalDialog: function () {},

        extendBinding: function () {
            this._profileBinder = new Backbone.ModelBinder();
            this._profileBinder.bind(
                app.instances.profile,
                this.$('#profile'),
                this.constructor.profileBindings
            );

            Backbone.Events.trigger('modal:updateContent', this._archiveCollection, this.model.urlPart.replace(/\//g, ''));
        },

        binding: function () {
            this.model.set('age', app.instances.profile.get('age'));
            this._modelBinder.bind(this.model, this.el, this.constructor.bindings);
            this.extendBinding();
        },

        onClose: function () {
            this._profileBinder.unbind();
            this._modelBinder.unbind();
            this.datepicker.destroy();
            this._modelBinder = this._profileBinder = null;
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
