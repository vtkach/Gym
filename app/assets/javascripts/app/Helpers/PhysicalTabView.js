;(function (app) {

    app.views.PhysicalTabView = app.views.BaseView.extend({

        _archiveCollectionBinder: null,

        _archiveCollection: null,

        _profileBinder: null,

        getModalDialog: _.noop,

        beforeBinding: _.noop,

        onInit: function () {
            this.initArchiveCollection();
            this.extendEvents({
                'click .calculate': 'onCalculate',
                'click #archive': 'getArchive',
                'click .save': 'onSave'
            });

            Backbone.Validation.bind(this);

            this.listenTo(app.instances.profile, 'change:age', this.updateAge.bind(this))
                .listenTo(this.model, 'sync', this.showSuccessMessage.bind(this))
                .listenTo(this.model, 'error', this.showServerError.bind(this));
        },

        initArchiveCollection: function () {
            this._archiveCollection = new app.collections.ArchiveCollection();
            this._archiveCollection.url = this.model.urlPart;
        },

        onCalculate: function () {
            var isValid = this.model.checkData();

            if (!isValid) {
                this.showValidationError(this.model, this.model.validationError);
            }

            return isValid;
        },

        onSave: function () {
            if (this.onCalculate()) {
                this.model.save();
            }
        },

        showModal: function (options) {
            Backbone.Events.trigger('modal:showArchive', options);
        },

        getArchive: function () {
            this._archiveCollection.fetch()
                .done(this.getModalDialog.bind(this));
        },

        extendBinding: function () {
            this._profileBinder = new Backbone.ModelBinder();
            this._profileBinder.bind(
                app.instances.profile,
                this.$('#profile'),
                this.constructor.profileBindings
            );

            Backbone.Events.trigger(
                'modal:updateContent',
                this._archiveCollection,
                this.model.urlPart.replace(/\//g, '')
            );
        },

        binding: function () {
            this.beforeBinding();
            this.updateAge();
            this._modelBinder.bind(
                this.model,
                this.el,
                this.constructor.bindings,
                { modelSetOptions: { validate: false } }
            );
            this.extendBinding();
        },

        updateAge: function () {
            this.model.set('age', app.instances.profile.get('age'));
        },

        onClose: function () {
            this._profileBinder.unbind();
            this._modelBinder.unbind();
            this.datepicker.destroy();
        },

        afterRender: function () {
            this.initDatePicker();
        },

        initDatePicker: function () {
            var $datepicker = this.$('[name=datepicker]');

            this.datepicker = new Pikaday({
                field: $datepicker.get(0),

                onSelect: function ($datepicker, date) {
                    this.model.set('date', date);
                    $datepicker.val(this.dateConverter(null, date));
                }.bind(this, $datepicker),

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

    }, {
        profileBindings: {
            gender: {
                selector: '[name=gender]',
                converter: function (dir, val) {
                    var dict = {
                        male: 'Хлопець',
                        female: 'Дівчина'
                    };

                    if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                        return dict[val];
                    }

                    return val;
                }
            },
            firstName: '[name=firstName]',
            lastName: '[name=lastName]',
            surname: '[name=surname]'
        }
    });

} (app));
