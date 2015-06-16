;(function (app) {

    app.models.PhysicalPreparednessModel = app.models.BaseModel.extend({

        defaults: {
            pushUps: '',
            raising: '',
            jumpLength: '',
            jumpHeight: '',
            estafeta: '',
            cooperTest: '',
            inclineBody: '',
            flamingoTest: '',
            inclines: ''
        },

        validation: {
            gender: {
                required: 'true'
            },
            age: {
                required: true,
                oneOf: [15, 16, 17, 18]
            }
        },

        urlPart: '/physical_preparedness_states/',

        wrapperJson: 'physicalPreparedness',

        classes: [
            'danger',
            'warning',
            'success',
            'success',
            'success'
        ],

       /* calculate: function () {
            var fields = Object.keys(this.RANGES.male);

            fields.forEach(this.checkFields.bind(this));
        },*/

        calculate: function (attr, val) {
            var profile = app.instances.profile,
                gender = profile.get('gender'),
                age = profile.get('age'),
             /*   val = this.get(attr),*/
                index;

            index = _.findIndex(this.RANGES[gender || 'm'][attr][age || '15'], function (range) {
                return val > range.min && val < range.max;
            });

            return this.classes[index];
        },

        RANGES: {
            male: {
                pushUps: {
                    15: [{
                        min: 0,
                        max: 19
                    }, {
                        min: 20,
                        max: 25
                    }, {
                        min: 26,
                        max: 30
                    }, {
                        min: 31,
                        max: 36
                    }, {
                        min: 37,
                        max: 500
                    }],
                    16: [{
                        min: 0,
                        max: 21
                    }, {
                        min: 22,
                        max: 27
                    }, {
                        min: 28,
                        max: 33
                    }, {
                        min: 34,
                        max: 39
                    }, {
                        min: 40,
                        max: 500
                    }],
                    17: [{
                        min: 0,
                        max: 23
                    }, {
                        min: 24,
                        max: 29
                    }, {
                        min: 30,
                        max: 35
                    }, {
                        min: 36,
                        max: 41
                    }, {
                        min: 42,
                        max: 500
                    }],
                    18: [{
                        min: 0,
                        max: 25
                    }, {
                        min: 26,
                        max: 31
                    }, {
                        min: 32,
                        max: 37
                    }, {
                        min: 38,
                        max: 43
                    }, {
                        min: 44,
                        max: 500
                    }]
                },
                raising: {
                    15: [{
                        min: 0,
                        max: 28
                    }, {
                        min: 29,
                        max: 35
                    },  {
                        min: 36,
                        max: 42
                    }, {
                        min: 43,
                        max: 48
                    }, {
                        min: 49,
                        max: 500
                    }],
                    16: [{
                        min: 0,
                        max: 30
                    }, {
                        min: 31,
                        max: 36
                    },  {
                        min: 37,
                        max: 43
                    }, {
                        min: 44,
                        max: 49
                    }, {
                        min: 50,
                        max: 500
                    }],
                    17: [{
                        min: 0,
                        max: 31
                    }, {
                        min: 32,
                        max: 37
                    },  {
                        min: 38,
                        max: 44
                    }, {
                        min: 45,
                        max: 50
                    }, {
                        min: 51,
                        max: 500
                    }],
                    18: [{
                        min: 0,
                        max: 32
                    }, {
                        min: 33,
                        max: 38
                    },  {
                        min: 39,
                        max: 45
                    }, {
                        min: 46,
                        max: 51
                    }, {
                        min: 52,
                        max: 500
                    }]
                },
                jumpLength: {
                    15: [{
                        min: 0,
                        max: 178
                    }, {
                        min: 179,
                        max: 194
                    }, {
                        min: 36,
                        max: 42
                    }, {
                        min: 43,
                        max: 48
                    },{
                        min: 49,
                        max: 500
                    }],
                    16: [{
                        min: 0,
                        max: 187
                    }, {
                        min: 188,
                        max: 204
                    }, {
                        min: 205,
                        max: 221
                    }, {
                        min: 221,
                        max: 228
                    },{
                        min: 229,
                        max: 500
                    }],
                    17: [{
                        min: 0,
                        max: 196
                    }, {
                        min: 197,
                        max: 213
                    }, {
                        min: 214,
                        max: 230
                    }, {
                        min: 213,
                        max: 249
                    },{
                        min: 250,
                        max: 500
                    }],
                    18: [{
                        min: 0,
                        max: 209
                    }, {
                        min: 210,
                        max: 224
                    }, {
                        min: 225,
                        max: 239
                    }, {
                        min: 240,
                        max: 264
                    },{
                        min: 265,
                        max: 500
                    }]
                },
                jumpHeight: {
                    15: [{
                        min: 0,
                        max: 34
                    }, {
                        min: 35,
                        max: 40
                    }, {
                        min: 41,
                        max: 46
                    }, {
                        min: 47,
                        max: 51
                    },{
                        min: 52,
                        max: 500
                    }],
                    16: [{
                        min: 0,
                        max: 36
                    }, {
                        min: 37,
                        max: 42
                    }, {
                        min: 43,
                        max: 48
                    }, {
                        min: 49,
                        max: 53
                    },{
                        min: 54,
                        max: 500
                    }],
                    17: [{
                        min: 0,
                        max: 37
                    }, {
                        min: 38,
                        max: 43
                    }, {
                        min: 44,
                        max: 49
                    }, {
                        min: 50,
                        max: 54
                    },{
                        min: 55,
                        max: 500
                    }],
                    18: [{
                        min: 0,
                        max: 38
                    }, {
                        min: 39,
                        max: 44
                    }, {
                        min: 45,
                        max: 50
                    }, {
                        min: 51,
                        max: 55
                    },{
                        min: 56,
                        max: 500
                    }]
                },
                estafeta: {
                    15:[{
                        min: 12,
                        max: 20
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 10,
                        max: 12
                    }, {
                        min: 9,
                        max: 11
                    },{
                        min: 0,
                        max: 10
                    }],
                    16:[{
                        min: 12,
                        max: 20
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 10,
                        max: 12
                    }, {
                        min: 9,
                        max: 11
                    },{
                        min: 0,
                        max: 10
                    }],
                    17:[{
                        min: 13,
                        max: 20
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 10,
                        max: 12
                    },{
                        min: 0,
                        max: 11
                    }],
                    18:[{
                        min: 13,
                        max: 20
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 10,
                        max: 12
                    },{
                        min: 0,
                        max: 11
                    }]
                },
                cooperTest: {
                    15: [{
                        min: 2000,
                        max: 2428
                    }, {
                        min: 2429,
                        max: 2589
                    }, {
                        min: 2590,
                        max: 2691
                    }, {
                        min: 2692,
                        max: 2826
                    },{
                        min: 2827,
                        max: 4000
                    }],
                    16: [{
                        min: 2000,
                        max: 2428
                    }, {
                        min: 2429,
                        max: 2589
                    }, {
                        min: 2590,
                        max: 2691
                    }, {
                        min: 2692,
                        max: 2826
                    },{
                        min: 2827,
                        max: 4000
                    }],
                    17: [{
                        min: 2000,
                        max: 2700
                    }, {
                        min: 2701,
                        max: 2893
                    }, {
                        min: 2894,
                        max: 2951
                    }, {
                        min: 2952,
                        max: 3115
                    },{
                        min: 3116,
                        max: 4500
                    }],
                    18: [{
                        min: 2000,
                        max: 2700
                    }, {
                        min: 2701,
                        max: 2893
                    }, {
                        min: 2894,
                        max: 2951
                    }, {
                        min: 2952,
                        max: 3115
                    },{
                        min: 3116,
                        max: 4500
                    }]
                },
                inclineBody: {
                    15: [{
                        min: 0,
                        max: 9
                    }, {
                        min: 8,
                        max: 10
                    }, {
                        min: 9,
                        max: 11
                    }, {
                        min: 10,
                        max: 12
                    },{
                        min: 11,
                        max: 100
                    }],
                    16: [{
                        min: 0,
                        max: 9
                    }, {
                        min: 8,
                        max: 10
                    }, {
                        min: 9,
                        max: 11
                    }, {
                        min: 10,
                        max: 12
                    },{
                        min: 11,
                        max: 100
                    }],
                    17: [{
                        min: 0,
                        max: 8
                    }, {
                        min: 7,
                        max: 8
                    }, {
                        min: 8,
                        max: 9
                    }, {
                        min: 9,
                        max: 10
                    },{
                        min: 10,
                        max: 100
                    }],
                    18: [{
                        min: 0,
                        max: 8
                    }, {
                        min: 7,
                        max: 8
                    }, {
                        min: 8,
                        max: 9
                    }, {
                        min: 9,
                        max: 10
                    },{
                        min: 10,
                        max: 100
                    }]
                },
                flamingoTest: {
                    15: [{
                        min: 19,
                        max: 100
                    }, {
                        min: 14,
                        max: 20
                    }, {
                        min: 6,
                        max: 15
                    }, {
                        min: 2,
                        max: 7
                    },{
                        min: 0,
                        max: 3
                    }],
                    16: [{
                        min: 16,
                        max: 100
                    }, {
                        min: 12,
                        max: 17
                    }, {
                        min: 5,
                        max: 13
                    }, {
                        min: 1,
                        max: 6
                    },{
                        min: 0,
                        max: 2
                    }],
                    17: [{
                        min: 14,
                        max: 100
                    }, {
                        min: 9,
                        max: 15
                    }, {
                        min: 3,
                        max: 10
                    }, {
                        min: 1,
                        max: 4
                    },{
                        min: 0,
                        max: 2
                    }],
                    18: [{
                        min: 14,
                        max: 100
                    }, {
                        min: 9,
                        max: 15
                    }, {
                        min: 3,
                        max: 10
                    }, {
                        min: 1,
                        max: 4
                    },{
                        min: 0,
                        max: 2
                    }]
                },
                inclines: {
                    15: [{
                        min: 0,
                        max: 16
                    }, {
                        min: 15,
                        max: 18
                    }, {
                        min: 17,
                        max: 20
                    }, {
                        min: 19,
                        max: 22
                    },{
                        min: 22,
                        max: 100
                    }],
                    16: [{
                        min: 0,
                        max: 16
                    }, {
                        min: 15,
                        max: 18
                    }, {
                        min: 17,
                        max: 20
                    }, {
                        min: 19,
                        max: 22
                    },{
                        min: 22,
                        max: 100
                    }],
                    17: [{
                        min: 0,
                        max: 17
                    }, {
                        min: 16,
                        max: 19
                    }, {
                        min: 18,
                        max: 21
                    }, {
                        min: 20,
                        max: 23
                    },{
                        min: 23,
                        max: 100
                    }],
                    18: [{
                        min: 0,
                        max: 17
                    }, {
                        min: 16,
                        max: 19
                    }, {
                        min: 18,
                        max: 21
                    }, {
                        min: 20,
                        max: 23
                    },{
                        min: 23,
                        max: 100
                    }]
                }
            },
            female: {
                pushUps: {
                    15: [{
                        min: 0,
                        max: 6
                    }, {
                        min: 5,
                        max: 9
                    }, {
                        min: 8,
                        max: 13
                    }, {
                        min: 12,
                        max: 17
                    }, {
                        min: 17,
                        max: 500
                    }],
                    16: [{
                        min: 0,
                        max: 6
                    }, {
                        min: 5,
                        max: 9
                    }, {
                        min: 8,
                        max: 13
                    }, {
                        min: 12,
                        max: 17
                    }, {
                        min: 17,
                        max: 500
                    }],
                    17: [{
                        min: 0,
                        max: 6
                    }, {
                        min: 5,
                        max: 10
                    }, {
                        min: 9,
                        max: 14
                    }, {
                        min: 13,
                        max: 18
                    }, {
                        min: 17,
                        max: 500
                    }],
                    18: [{
                        min: 0,
                        max: 6
                    }, {
                        min: 5,
                        max: 10
                    }, {
                        min: 9,
                        max: 14
                    }, {
                        min: 13,
                        max: 18
                    }, {
                        min: 17,
                        max: 500
                    }]
                },
                raising: {
                    15: [{
                        min: 0,
                        max: 25
                    }, {
                        min: 24,
                        max: 30
                    },  {
                        min: 29,
                        max: 34
                    }, {
                        min: 33,
                        max: 39
                    }, {
                        min: 38,
                        max: 500
                    }],
                    16: [{
                        min: 0,
                        max: 26
                    }, {
                        min: 25,
                        max: 31
                    },  {
                        min: 30,
                        max: 36
                    }, {
                        min: 35,
                        max: 40
                    }, {
                        min: 39,
                        max: 500
                    }],
                    17: [{
                        min: 0,
                        max: 27
                    }, {
                        min: 26,
                        max: 32
                    },  {
                        min: 31,
                        max: 36
                    }, {
                        min: 35,
                        max: 41
                    }, {
                        min: 40,
                        max: 500
                    }],
                    18: [{
                        min: 0,
                        max: 28
                    }, {
                        min: 27,
                        max: 33
                    },  {
                        min: 32,
                        max: 37
                    }, {
                        min: 36,
                        max: 42
                    }, {
                        min: 41,
                        max: 500
                    }]
                },
                jumpLength: {
                    15: [{
                        min: 0,
                        max: 138
                    }, {
                        min: 137,
                        max: 150
                    }, {
                        min: 149,
                        max: 162
                    }, {
                        min: 161,
                        max: 174
                    },{
                        min: 173,
                        max: 500
                    }],
                    16: [{
                        min: 0,
                        max: 143
                    }, {
                        min: 144,
                        max: 156
                    }, {
                        min: 155,
                        max: 168
                    }, {
                        min: 167,
                        max: 181
                    },{
                        min: 180,
                        max: 500
                    }],
                    17: [{
                        min: 0,
                        max: 151
                    }, {
                        min: 150,
                        max: 163
                    }, {
                        min: 162,
                        max: 175
                    }, {
                        min: 174,
                        max: 187
                    },{
                        min: 186,
                        max: 500
                    }],
                    18: [{
                        min: 0,
                        max: 166
                    }, {
                        min: 165,
                        max: 176
                    }, {
                        min: 175,
                        max: 185
                    }, {
                        min: 184,
                        max: 199
                    },{
                        min: 198,
                        max: 500
                    }]
                },
                jumpHeight: {
                    15: [{
                        min: 0,
                        max: 30
                    }, {
                        min: 29,
                        max: 36
                    }, {
                        min: 35,
                        max: 40
                    }, {
                        min: 39,
                        max: 44
                    },{
                        min: 43,
                        max: 500
                    }],
                    16: [{
                        min: 0,
                        max: 30
                    }, {
                        min: 29,
                        max: 36
                    }, {
                        min: 35,
                        max: 40
                    }, {
                        min: 39,
                        max: 44
                    },{
                        min: 43,
                        max: 500
                    }],
                    17: [{
                        min: 0,
                        max: 30
                    }, {
                        min: 29,
                        max: 36
                    }, {
                        min: 35,
                        max: 40
                    }, {
                        min: 39,
                        max: 47
                    },{
                        min: 46,
                        max: 500
                    }],
                    18: [{
                        min: 0,
                        max: 30
                    }, {
                        min: 29,
                        max: 36
                    }, {
                        min: 35,
                        max: 40
                    }, {
                        min: 39,
                        max: 47
                    },{
                        min: 46,
                        max: 500
                    }]
                },
                estafeta: {
                    15:[{
                        min: 14,
                        max: 30
                    }, {
                        min: 13,
                        max: 15
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 11,
                        max: 13
                    },{
                        min: 0,
                        max: 12
                    }],
                    16:[{
                        min: 14,
                        max: 30
                    }, {
                        min: 13,
                        max: 15
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 11,
                        max: 13
                    },{
                        min: 0,
                        max: 12
                    }],
                    17:[{
                        min: 15,
                        max: 30
                    }, {
                        min: 14,
                        max: 16
                    }, {
                        min: 13,
                        max: 15
                    }, {
                        min: 12,
                        max: 14
                    },{
                        min: 0,
                        max: 13
                    }],
                    18:[{
                        min: 15,
                        max: 30
                    }, {
                        min: 14,
                        max: 16
                    }, {
                        min: 13,
                        max: 15
                    }, {
                        min: 12,
                        max: 14
                    },{
                        min: 0,
                        max: 13
                    }]
                },
                cooperTest: {
                    15: [{
                        min: 2000,
                        max: 2428
                    }, {
                        min: 2429,
                        max: 2589
                    }, {
                        min: 2590,
                        max: 2691
                    }, {
                        min: 2692,
                        max: 2826
                    },{
                        min: 2827,
                        max: 4000
                    }],
                    16: [{
                        min: 2000,
                        max: 2428
                    }, {
                        min: 2429,
                        max: 2589
                    }, {
                        min: 2590,
                        max: 2691
                    }, {
                        min: 2692,
                        max: 2826
                    },{
                        min: 2827,
                        max: 4000
                    }],
                    17: [{
                        min: 2000,
                        max: 2700
                    }, {
                        min: 2701,
                        max: 2893
                    }, {
                        min: 2894,
                        max: 2951
                    }, {
                        min: 2952,
                        max: 3115
                    },{
                        min: 3116,
                        max: 4500
                    }],
                    18: [{
                        min: 2000,
                        max: 2700
                    }, {
                        min: 2701,
                        max: 2893
                    }, {
                        min: 2894,
                        max: 2951
                    }, {
                        min: 2952,
                        max: 3115
                    },{
                        min: 3116,
                        max: 4500
                    }]
                },
                inclineBody: {
                    15: [{
                        min: 0,
                        max: 15
                    }, {
                        min: 16,
                        max: 17
                    }, {
                        min: 18,
                        max: 19
                    }, {
                        min: 20,
                        max: 21
                    },{
                        min: 22,
                        max: 30
                    }],
                    16: [{
                        min: 0,
                        max: 15
                    }, {
                        min: 16,
                        max: 17
                    }, {
                        min: 18,
                        max: 19
                    }, {
                        min: 20,
                        max: 21
                    },{
                        min: 22,
                        max: 30
                    }],
                    17: [{
                        min: 0,
                        max: 16
                    }, {
                        min: 17,
                        max: 18
                    }, {
                        min: 19,
                        max: 20
                    }, {
                        min: 21,
                        max: 22
                    },{
                        min: 23,
                        max: 30
                    }],
                    18: [{
                        min: 0,
                        max: 16
                    }, {
                        min: 17,
                        max: 18
                    }, {
                        min: 19,
                        max: 20
                    }, {
                        min: 21,
                        max: 22
                    },{
                        min: 23,
                        max: 30
                    }]
                },
                flamingoTest: {
                    15: [{
                        min: 19,
                        max: 100
                    }, {
                        min: 14,
                        max: 20
                    }, {
                        min: 6,
                        max: 15
                    }, {
                        min: 2,
                        max: 7
                    },{
                        min: 0,
                        max: 3
                    }],
                    16: [{
                        min: 16,
                        max: 100
                    }, {
                        min: 12,
                        max: 17
                    }, {
                        min: 5,
                        max: 13
                    }, {
                        min: 1,
                        max: 6
                    },{
                        min: 0,
                        max: 2
                    }],
                    17: [{
                        min: 14,
                        max: 100
                    }, {
                        min: 9,
                        max: 15
                    }, {
                        min: 3,
                        max: 10
                    }, {
                        min: 1,
                        max: 4
                    },{
                        min: 0,
                        max: 2
                    }],
                    18: [{
                        min: 14,
                        max: 100
                    }, {
                        min: 9,
                        max: 15
                    }, {
                        min: 3,
                        max: 10
                    }, {
                        min: 1,
                        max: 4
                    },{
                        min: 0,
                        max: 2
                    }]
                },
                inclines: {
                    15: [{
                        min: 0,
                        max: 13
                    }, {
                        min: 12,
                        max: 15
                    }, {
                        min: 14,
                        max: 17
                    }, {
                        min: 16,
                        max: 19
                    },{
                        min: 18,
                        max: 100
                    }],
                    16: [{
                        min: 0,
                        max: 13
                    }, {
                        min: 12,
                        max: 15
                    }, {
                        min: 14,
                        max: 17
                    }, {
                        min: 16,
                        max: 19
                    },{
                        min: 18,
                        max: 100
                    }],
                    17: [{
                        min: 0,
                        max: 14
                    }, {
                        min: 13,
                        max: 16
                    }, {
                        min: 15,
                        max: 18
                    }, {
                        min: 17,
                        max: 20
                    },{
                        min: 19,
                        max: 100
                    }],
                    18: [{
                        min: 0,
                        max: 14
                    }, {
                        min: 13,
                        max: 16
                    }, {
                        min: 15,
                        max: 18
                    }, {
                        min: 17,
                        max: 20
                    },{
                        min: 19,
                        max: 100
                    }]
                }
            }
        }

    });

} (app));
