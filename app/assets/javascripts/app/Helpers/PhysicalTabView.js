;(function (app) {

    app.views.PhysicalTabView = app.views.BaseView.extend({

        _archiveCollectionBinder: null,

        _archiveCollection: null,

        _profileBinder: null,

        onInit: function () {
            this.initArchiveCollection();
            this.extendEvents({
                'click .calculate': 'onCalculate',
                'click #archive': 'getArchive',
                'click .save': 'onSave',
                'keypress [name=age]': 'disableLetters'
            });

            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'validated:invalid', this.showValidationError.bind(this))
                .listenTo(app.instances.profile, 'change:age', this.updateAge.bind(this))
                .listenTo(this.model, 'sync', this.showSuccessMessage.bind(this))
                .listenTo(this.model, 'error', this.showServerError.bind(this));
        },

        initArchiveCollection: function () {
            this._archiveCollection = new app.collections.ArchiveCollection();
            this._archiveCollection.url = this.model.urlPart;
        },

        onCalculate: function () {
            this.model.checkData();
        },

        onSave: function () {
            this.model.checkData();
            this.model.save();
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

            Backbone.Events.trigger(
                'modal:updateContent',
                this._archiveCollection,
                this.model.urlPart.replace(/\//g, '')
            );
        },

        beforeBinding: function () {

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
            this._modelBinder = this._profileBinder = null;
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
        },

        disableLetters: function (event) {
            var value = Number(event.target.value + String.fromCharCode(event.keyCode));

            if (!value) {
                event.preventDefault();
            }
        }

    }, {
        profileBindings: {
            gender: {
                selector: '[name=gender]',
                converter: function (dir, val) {
                    var dict = {
                        male: 'Мужчина',
                        female: 'Женщина'
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
