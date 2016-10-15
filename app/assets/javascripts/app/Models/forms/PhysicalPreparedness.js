;(function (app) {

    app.models.PhysicalPreparednessModel = app.models.PhysicalTabModel.extend({

        defaults: {
            age: '',
            pushUps: '',
            raising: '',
            jumpLength: '',
            jumpHeight: '',
            estafeta: '',
            cooperTest: '',
            inclineBody: '',
            flamingoTest: '',
            inclines: '',
            pull: '',
            shuttleRunning: '',
            uniformRunning: ''
        },
        // TODO CHANGE RUNNING TO ANOTHER VARIANTS
        additionalFields: {
            pushUps: {
                range: [0, 500]
            },
            raising: {
                range: [0, 500]
            },
            jumpLength: {
                range: [0, 500]
            },
            jumpHeight: {
                range: [0, 500]
            },
            estafeta: {
                range: [10, 12]
            },
            cooperTest: {
                range: [2000, 4000]
            },
            inclineBody: {
                range: [0, 100]
            },
            flamingoTest: {
                range: [3, 19]
            },
            inclines: {
                range: [0, 100]
            },
            pull: {
                range: [0, 50]
            },
            uniformRunning: {
                range: [0, 20]
            },
            shuttleRunning: {
                range: [0, 15]
            }
        },

        urlPart: '/physical_preparedness_states/',

        wrapperJson: 'physicalPreparedness',

        calculateAttr: function (attr, val) {
            var profile = app.instances.profile,
                gender = profile.get('gender'),
                age = profile.get('age');

            return _.findIndex(this.RANGES[gender][attr][age], function (range) {
                return val > range.min && val < range.max;
            });
        },

        RANGES: {
            male: {
                pushUps: {
                    15: [{
                        min: 0,
                        max: 15
                    }, {
                        min: 15,
                        max: 22
                    }, {
                        min: 22,
                        max: 26
                    }, {
                        min: 26,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 16
                    }, {
                        min: 16,
                        max: 23
                    }, {
                        min: 23,
                        max: 30
                    }, {
                        min: 30,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 16
                    }, {
                        min: 15,
                        max: 26
                    }, {
                        min: 26,
                        max: 36
                    }, {
                        min: 36,
                        max: 9999
                    }]
                }, // DONE
                raising: {
                    15: [{
                        min: 0,
                        max: 16
                    }, {
                        min: 16,
                        max: 36
                    }, {
                        min: 36,
                        max: 45
                    }, {
                        min: 45,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 21
                    }, {
                        min: 21,
                        max: 41
                    }, {
                        min: 41,
                        max: 56
                    }, {
                        min: 56,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 21
                    }, {
                        min: 21,
                        max: 49
                    }, {
                        min: 49,
                        max: 59
                    }, {
                        min: 59,
                        max: 9999
                    }]
                }, // DONE
                jumpLength: {
                    15: [{
                        min: 0,
                        max: 191
                    }, {
                        min: 191,
                        max: 201
                    }, {
                        min: 201,
                        max: 211
                    }, {
                        min: 211,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 201
                    }, {
                        min: 201,
                        max: 211
                    }, {
                        min: 211,
                        max: 221
                    }, {
                        min: 221,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 206
                    }, {
                        min: 206,
                        max: 216
                    }, {
                        min: 216,
                        max: 2226
                    }, {
                        min: 226,
                        max: 9999
                    }]
                }, // DONE
                uniformRunning: {
                    15: [{
                        min: 450,
                        max: 9999
                    }, {
                        min: 420,
                        max: 450
                    }, {
                        min: 380,
                        max: 430
                    }, {
                        min: 200,
                        max: 380
                    }],
                    16: [{
                        min: 450,
                        max: 9999
                    }, {
                        min: 420,
                        max: 450
                    }, {
                        min: 380,
                        max: 420
                    }, {
                        min: 200,
                        max: 380
                    }],
                    17: [{
                        min: 440,
                        max: 9999
                    }, {
                        min: 410,
                        max: 440
                    }, {
                        min: 370,
                        max: 410
                    }, {
                        min: 200,
                        max: 370
                    }]
                },
                shuttleRunning: {
                    15: [{
                        min: 9.8,
                        max: 9999
                    }, {
                        min: 9.6,
                        max: 9.8
                    }, {
                        min: 9.4,
                        max: 9.6
                    }, {
                        min: 8,
                        max: 9.4
                    }],

                    16: [{
                        min: 9.8,
                        max: 9999
                    }, {
                        min: 9.6,
                        max: 9.8
                    }, {
                        min: 9.4,
                        max: 9.6
                    }, {
                        min: 8,
                        max: 9.4
                    }],

                    17: [{
                        min: 9.6,
                        max: 9999
                    }, {
                        min: 9.4,
                        max: 9.6
                    }, {
                        min: 9.2,
                        max: 9.4
                    }, {
                        min: 8,
                        max: 9.2
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
                    }, {
                        min: 52,
                        max: 9999
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
                    }, {
                        min: 54,
                        max: 9999
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
                    }, {
                        min: 55,
                        max: 9999
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
                    }, {
                        min: 56,
                        max: 9999
                    }]
                },
                estafeta: {
                    15: [{
                        min: 12,
                        max: 9999
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 10,
                        max: 12
                    }, {
                        min: 9,
                        max: 11
                    }, {
                        min: 0,
                        max: 10
                    }],
                    16: [{
                        min: 12,
                        max: 9999
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 10,
                        max: 12
                    }, {
                        min: 9,
                        max: 11
                    }, {
                        min: 0,
                        max: 10
                    }],
                    17: [{
                        min: 13,
                        max: 9999
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 10,
                        max: 12
                    }, {
                        min: 0,
                        max: 11
                    }],
                    18: [{
                        min: 13,
                        max: 9999
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 10,
                        max: 12
                    }, {
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
                    }, {
                        min: 2827,
                        max: 9999
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
                    }, {
                        min: 2827,
                        max: 9999
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
                    }, {
                        min: 3116,
                        max: 9999
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
                    }, {
                        min: 3116,
                        max: 9999
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
                    }, {
                        min: 11,
                        max: 9999
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
                    }, {
                        min: 11,
                        max: 9999
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
                    }, {
                        min: 10,
                        max: 9999
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
                    }, {
                        min: 10,
                        max: 9999
                    }]
                },
                flamingoTest: {
                    15: [{
                        min: 19,
                        max: 9999
                    }, {
                        min: 14,
                        max: 20
                    }, {
                        min: 6,
                        max: 15
                    }, {
                        min: 2,
                        max: 7
                    }, {
                        min: 0,
                        max: 3
                    }],
                    16: [{
                        min: 16,
                        max: 9999
                    }, {
                        min: 12,
                        max: 17
                    }, {
                        min: 5,
                        max: 13
                    }, {
                        min: 1,
                        max: 6
                    }, {
                        min: 0,
                        max: 2
                    }],
                    17: [{
                        min: 14,
                        max: 9999
                    }, {
                        min: 9,
                        max: 15
                    }, {
                        min: 3,
                        max: 10
                    }, {
                        min: 1,
                        max: 4
                    }, {
                        min: 0,
                        max: 2
                    }],
                    18: [{
                        min: 14,
                        max: 9999
                    }, {
                        min: 9,
                        max: 15
                    }, {
                        min: 3,
                        max: 10
                    }, {
                        min: 1,
                        max: 4
                    }, {
                        min: 0,
                        max: 2
                    }]
                },
                inclines: {
                    15: [{
                        min: 0,
                        max: 4
                    }, {
                        min: 4,
                        max: 7
                    }, {
                        min: 7,
                        max: 10
                    }, {
                        min: 11,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 4
                    }, {
                        min: 4,
                        max: 7
                    }, {
                        min: 7,
                        max: 11
                    }, {
                        min: 11,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 5
                    }, {
                        min: 5,
                        max: 8
                    }, {
                        min: 8,
                        max: 12
                    }, {
                        min: 5,
                        max: 9999
                    }]
                },
                running: {
                    15: [{
                        min: 16,
                        max: 9999
                    }, {
                        min: 15.2,
                        max: 16
                    }, {
                        min: 14.4,
                        max: 15.2
                    }, {
                        min: 8,
                        max: 14.4
                    }],
                    16: [{
                        min: 16,
                        max: 9999
                    }, {
                        min: 15.2,
                        max: 16
                    }, {
                        min: 14.4,
                        max: 15.2
                    }, {
                        min: 8,
                        max: 14.4
                    }],
                    17: [{
                        min: 15.9,
                        max: 9999
                    }, {
                        min: 14.9,
                        max: 15.9
                    }, {
                        min: 14.2,
                        max: 14.9
                    }, {
                        min: 8,
                        max: 14.2
                    }]
                }, // DONE
                pull: {
                    15: [{
                        min: 0,
                        max: 4
                    }, {
                        min: 4,
                        max: 8
                    }, {
                        min: 8,
                        max: 11
                    }, {
                        min: 11,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 5
                    }, {
                        min: 5,
                        max: 9
                    }, {
                        min: 9,
                        max: 12
                    }, {
                        min: 12,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 6
                    }, {
                        min: 6,
                        max: 10
                    }, {
                        min: 10,
                        max: 13
                    }, {
                        min: 13,
                        max: 9999
                    }]
                } // DONE
            },
            female: {
                shuttleRunning: {
                    15: [{
                        min: 11.1,
                        max: 9999
                    }, {
                        min: 10.7,
                        max: 11.1
                    }, {
                        min: 10.3,
                        max: 10.7
                    }, {
                        min: 8,
                        max: 10.3
                    }],

                    16: [{
                        min: 11.1,
                        max: 9999
                    }, {
                        min: 10.7,
                        max: 11.1
                    }, {
                        min: 10.3,
                        max: 10.7
                    }, {
                        min: 8,
                        max: 10.3
                    }],

                    17: [{
                        min: 11.1,
                        max: 9999
                    }, {
                        min: 10.7,
                        max: 11.1
                    }, {
                        min: 10.3,
                        max: 10.7
                    }, {
                        min: 8,
                        max: 10.3
                    }]
                },
                uniformRunning: {
                    15: [{
                        min: 570,
                        max: 9999
                    }, {
                        min: 525,
                        max: 570
                    }, {
                        min: 480,
                        max: 525
                    }, {
                        min: 200,
                        max: 480
                    }],
                    16: [{
                        min: 540,
                        max: 9999
                    }, {
                        min: 510,
                        max: 540
                    }, {
                        min: 465,
                        max: 510
                    }, {
                        min: 200,
                        max: 465
                    }],
                    17: [{
                        min: 530,
                        max: 9999
                    }, {
                        min: 500,
                        max: 530
                    }, {
                        min: 460,
                        max: 500
                    }, {
                        min: 200,
                        max: 460
                    }]
                },
                running: {
                    15: [{
                        min: 18,
                        max: 9999
                    }, {
                        min: 17.4,
                        max: 18
                    }, {
                        min: 16.7,
                        max: 17.4
                    }, {
                        min: 8,
                        max: 16.7
                    }],
                    16: [{
                        min: 18,
                        max: 9999
                    }, {
                        min: 17.4,
                        max: 18
                    }, {
                        min: 16.7,
                        max: 17.4
                    }, {
                        min: 8,
                        max: 16.7
                    }],
                    17: [{
                        min: 18.3,
                        max: 9999
                    }, {
                        min: 17.7,
                        max: 18.3
                    }, {
                        min: 16.8,
                        max: 17.7
                    }, {
                        min: 8,
                        max: 16.8
                    }]
                }, // DONE
                pushUps: {
                    15: [{
                        min: 0,
                        max: 7
                    }, {
                        min: 7,
                        max: 13
                    }, {
                        min: 13,
                        max: 16
                    }, {
                        min: 16,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 8
                    }, {
                        min: 8,
                        max: 13
                    }, {
                        min: 13,
                        max: 16
                    }, {
                        min: 16,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 10
                    }, {
                        min: 10,
                        max: 14
                    }, {
                        min: 14,
                        max: 17
                    }, {
                        min: 17,
                        max: 9999
                    }]
                }, // DONE
                raising: {
                    15: [{
                        min: 0,
                        max: 16
                    }, {
                        min: 16,
                        max: 36
                    }, {
                        min: 36,
                        max: 46
                    }, {
                        min: 46,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 19
                    }, {
                        min: 19,
                        max: 39
                    }, {
                        min: 39,
                        max: 49
                    }, {
                        min: 49,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 21
                    }, {
                        min: 21,
                        max: 46
                    }, {
                        min: 46,
                        max: 56
                    }, {
                        min: 56,
                        max: 9999
                    }]
                }, // DONE
                jumpLength: {
                    15: [{
                        min: 0,
                        max: 151
                    }, {
                        min: 151,
                        max: 161
                    }, {
                        min: 161,
                        max: 181
                    }, {
                        min: 181,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 156
                    }, {
                        min: 156,
                        max: 171
                    }, {
                        min: 171,
                        max: 186
                    }, {
                        min: 186,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 151
                    }, {
                        min: 151,
                        max: 171
                    }, {
                        min: 171,
                        max: 181
                    }, {
                        min: 181,
                        max: 9999
                    }]
                }, // DONE
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
                    }, {
                        min: 43,
                        max: 9999
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
                    }, {
                        min: 43,
                        max: 9999
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
                    }, {
                        min: 46,
                        max: 9999
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
                    }, {
                        min: 46,
                        max: 9999
                    }]
                },
                estafeta: {
                    15: [{
                        min: 14,
                        max: 9999
                    }, {
                        min: 13,
                        max: 15
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 0,
                        max: 12
                    }],
                    16: [{
                        min: 14,
                        max: 9999
                    }, {
                        min: 13,
                        max: 15
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 11,
                        max: 13
                    }, {
                        min: 0,
                        max: 12
                    }],
                    17: [{
                        min: 15,
                        max: 9999
                    }, {
                        min: 14,
                        max: 16
                    }, {
                        min: 13,
                        max: 15
                    }, {
                        min: 12,
                        max: 14
                    }, {
                        min: 0,
                        max: 13
                    }],
                    18: [{
                        min: 15,
                        max: 9999
                    }, {
                        min: 14,
                        max: 16
                    }, {
                        min: 13,
                        max: 15
                    }, {
                        min: 12,
                        max: 14
                    }, {
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
                    }, {
                        min: 2827,
                        max: 9999
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
                    }, {
                        min: 2827,
                        max: 9999
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
                    }, {
                        min: 3116,
                        max: 9999
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
                    }, {
                        min: 3116,
                        max: 9999
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
                    }, {
                        min: 22,
                        max: 9999
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
                    }, {
                        min: 22,
                        max: 9999
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
                    }, {
                        min: 23,
                        max: 9999
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
                    }, {
                        min: 23,
                        max: 9999
                    }]
                },
                flamingoTest: {
                    15: [{
                        min: 19,
                        max: 9999
                    }, {
                        min: 14,
                        max: 20
                    }, {
                        min: 6,
                        max: 15
                    }, {
                        min: 2,
                        max: 7
                    }, {
                        min: 0,
                        max: 3
                    }],
                    16: [{
                        min: 16,
                        max: 9999
                    }, {
                        min: 12,
                        max: 17
                    }, {
                        min: 5,
                        max: 13
                    }, {
                        min: 1,
                        max: 6
                    }, {
                        min: 0,
                        max: 2
                    }],
                    17: [{
                        min: 14,
                        max: 9999
                    }, {
                        min: 9,
                        max: 15
                    }, {
                        min: 3,
                        max: 10
                    }, {
                        min: 1,
                        max: 4
                    }, {
                        min: 0,
                        max: 2
                    }],
                    18: [{
                        min: 14,
                        max: 9999
                    }, {
                        min: 9,
                        max: 15
                    }, {
                        min: 3,
                        max: 10
                    }, {
                        min: 1,
                        max: 4
                    }, {
                        min: 0,
                        max: 2
                    }]
                },
                inclines: {
                    15: [{
                        min: 0,
                        max: 12
                    }, {
                        min: 12,
                        max: 16
                    }, {
                        min: 16,
                        max: 19
                    }, {
                        min: 19,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 12
                    }, {
                        min: 12,
                        max: 16
                    }, {
                        min: 16,
                        max: 19
                    }, {
                        min: 19,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 8
                    }, {
                        min: 8,
                        max: 10
                    }, {
                        min: 10,
                        max: 17
                    }, {
                        min: 17,
                        max: 9999
                    }]
                }, // DONE
                pull: {
                    15: [{
                        min: 0,
                        max: 6
                    }, {
                        min: 6,
                        max: 16
                    }, {
                        min: 16,
                        max: 20
                    }, {
                        min: 20,
                        max: 9999
                    }],
                    16: [{
                        min: 0,
                        max: 7
                    }, {
                        min: 7,
                        max: 17
                    }, {
                        min: 17,
                        max: 21
                    }, {
                        min: 21,
                        max: 9999
                    }],
                    17: [{
                        min: 0,
                        max: 9
                    }, {
                        min: 9,
                        max: 18
                    }, {
                        min: 18,
                        max: 23
                    }, {
                        min: 23,
                        max: 9999
                    }]
                } //DONE
            }
        }
    });

} (app));
