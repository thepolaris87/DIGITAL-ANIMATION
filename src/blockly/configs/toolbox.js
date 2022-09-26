const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: '이벤트',
            categorystyle: 'event_category',
            contents: [
                {
                    kind: 'block',
                    type: 'event_start'
                },
                {
                    kind: 'block',
                    type: 'event_keyboard'
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 마우스 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'event_mouse'
                },
                {
                    kind: 'block',
                    type: 'event_mouse_objects'
                }
            ]
        },
        {
            kind: 'category',
            name: '동작',
            categorystyle: 'motion_category',
            contents: [
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯ 기본 이동 ⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'motion_moveDuration_left'
                },
                {
                    kind: 'block',
                    type: 'motion_moveDuration_top'
                },
                {
                    kind: 'block',
                    type: 'motion_moveDuration_lefttop'
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯ 순간 이동 ⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'motion_move_left'
                },
                {
                    kind: 'block',
                    type: 'motion_move_top'
                },
                {
                    kind: 'block',
                    type: 'motion_move_lefttop'
                }
                // {
                //     kind: 'sep',
                //     gap: '50',
                // },
                // {
                //     kind: 'label',
                //     text: '지정값으로 이동하기',
                // },
                // {
                //     kind: 'category',
                //     name: 'hidden',
                //     hidden: 'true',
                //     contents: [
                //         {
                //         kind: 'block',
                //         type: 'motion_move_location_left',
                //         // disabled: 'true'
                //         },
                //         {
                //             kind: 'block',
                //             type: 'motion_move_location_top',
                //         },
                //         {
                //             kind: 'block',
                //             type: 'motion_move_location_lefttop',
                //         },
                //         {
                //             kind: 'block',
                //             type: 'motion_moveDuration_location_left',
                //         },
                //         {
                //             kind: 'block',
                //             type: 'motion_moveDuration_location_top',
                //         },
                //         {
                //             kind: 'block',
                //             type: 'motion_moveDuration_location_lefttop',
                //         },
                //     ],
                // },
            ]
        },
        {
            kind: 'category',
            name: '오브젝트',
            categorystyle: 'list_category',
            contents: [
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯ 오브젝트 제어 ⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'object_select'
                }
            ]
        },
        {
            kind: 'category',
            name: '흐름',
            categorystyle: 'logic_category',
            contents: [
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 조건 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'controls_if'
                },
                {
                    kind: 'block',
                    type: 'controls_ifelse'
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 반복 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'controls_whileUntil'
                },
                {
                    kind: 'block',
                    type: 'controls_repeat_ext',
                    inputs: {
                        TIMES: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 5
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'controls_repeat'
                },
                {
                    kind: 'block',
                    type: 'controls_for'
                },
                {
                    kind: 'block',
                    type: 'controls_forEach'
                },
                {
                    kind: 'block',
                    type: 'controls_flow_statements'
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 판단 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'logic_compare'
                },
                {
                    kind: 'block',
                    type: 'logic_boolean'
                },
                {
                    kind: 'block',
                    type: 'logic_operation'
                },

                {
                    kind: 'block',
                    type: 'logic_negate'
                }
            ]
        },
        {
            kind: 'category',
            name: '변수',
            categorystyle: 'variable_category',
            contents: [
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯ 변수 만들기 ⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'variables_get_dynamic'
                },
                {
                    kind: 'block',
                    type: 'variables_set_dynamic'
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯ 문자 만들기 ⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'text'
                },

                {
                    kind: 'block',
                    type: 'text_append'
                },
                {
                    kind: 'block',
                    type: 'text_join'
                }
            ]
        },
        {
            kind: 'category',
            name: '변수 만들기',
            custom: 'VARIABLE',
            categorystyle: 'variable_category'
        },
        {
            kind: 'category',
            name: '함수',
            custom: 'PROCEDURE',
            categorystyle: 'variable_category'
        },
        {
            kind: 'category',
            name: '계산',
            categorystyle: 'math_category',
            contents: [
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 값 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'math_number'
                },
                {
                    kind: 'block',
                    type: 'math_constant'
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 연산 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'math_arithmetic',
                    inputs: {
                        A: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0
                                }
                            }
                        },
                        B: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'math_single',
                    inputs: {
                        NUM: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'math_trig',
                    inputs: {
                        NUM: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'math_round',
                    inputs: {
                        NUM: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 조건 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'math_number_property',
                    inputs: {
                        NUMBER_TO_CHECK: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 랜덤 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'math_random_int',
                    inputs: {
                        FROM: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1
                                }
                            }
                        },
                        TO: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 100
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'math_random_float'
                }
            ]
        },
        {
            kind: 'category',
            name: '소리',
            categorystyle: 'text_category',
            contents: [
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯ 기본 재생 ⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'sound_play'
                },
                {
                    kind: 'block',
                    type: 'sound_play_time1',
                    inputs: {
                        time1: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 3
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'sound_play_time2',
                    inputs: {
                        time1: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0
                                }
                            }
                        },
                        time2: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 3
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯ 재생 후 진행 ⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'sound_play_next'
                },
                {
                    kind: 'block',
                    type: 'sound_play_time1_next',
                    inputs: {
                        time1: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 3
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'sound_play_time2_next',
                    inputs: {
                        time1: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0
                                }
                            }
                        },
                        time2: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 3
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'sep',
                    gap: '30'
                },
                {
                    kind: 'label',
                    text: '⎯⎯⎯⎯⎯⎯ 기타 ⎯⎯⎯⎯⎯⎯'
                },
                {
                    kind: 'block',
                    type: 'sound_stop'
                },
                {
                    kind: 'block',
                    type: 'sound_volume'
                }
            ]
        },
        {
            kind: 'category',
            name: '분류중',
            categorystyle: 'text_category',
            contents: [
                {
                    kind: 'block',
                    type: 'lists_create_empty'
                },
                {
                    kind: 'block',
                    type: 'lists_repeat'
                },
                {
                    kind: 'block',
                    type: 'lists_reverse'
                },
                {
                    kind: 'block',
                    type: 'lists_isEmpty'
                },
                {
                    kind: 'block',
                    type: 'lists_length'
                },
                {
                    kind: 'block',
                    type: 'colour_picker'
                },
                {
                    kind: 'block',
                    type: 'colour_random'
                },
                {
                    kind: 'block',
                    type: 'colour_rgb'
                },
                {
                    kind: 'block',
                    type: 'colour_blend'
                },
                {
                    kind: 'block',
                    type: 'text_multiline'
                },
                {
                    kind: 'block',
                    type: 'text_length'
                },
                {
                    kind: 'block',
                    type: 'text_isEmpty'
                },
                {
                    kind: 'block',
                    type: 'text_indexOf'
                },
                {
                    kind: 'block',
                    type: 'text_charAt'
                },
                {
                    kind: 'block',
                    type: 'math_on_list'
                },
                {
                    kind: 'block',
                    type: 'math_constrain'
                },
                {
                    kind: 'block',
                    type: 'math_atan2'
                },
                {
                    kind: 'block',
                    type: 'math_change'
                },
                {
                    kind: 'block',
                    type: 'variables_get'
                },
                {
                    kind: 'block',
                    type: 'variables_set'
                },
                {
                    kind: 'block',
                    type: 'logic_ternary'
                },
                {
                    kind: 'block',
                    type: 'controls_if_if'
                },
                {
                    kind: 'block',
                    type: 'controls_if_elseif'
                },
                {
                    kind: 'block',
                    type: 'controls_if_else'
                }
            ]
        },
        {
            kind: 'category',
            name: 'coding',
            categorystyle: 'text_category',
            contents: [
                {
                    kind: 'block',
                    type: 'motion_S'
                },
                {
                    kind: 'block',
                    type: 'motion_SWf'
                },
                {
                    kind: 'block',
                    type: 'motion_SB'
                },
                {
                    kind: 'block',
                    type: 'motion_SWb'
                },
                {
                    kind: 'block',
                    type: 'motion_TR'
                },
                {
                    kind: 'block',
                    type: 'motion_TL'
                },
                {
                    kind: 'block',
                    type: 'motion_TA'
                },
                {
                    kind: 'block',
                    type: 'motion_J'
                },
                {
                    kind: 'block',
                    type: 'motion_SD'
                },
                {
                    kind: 'block',
                    type: 'motion_ST'
                },
                {
                    kind: 'block',
                    type: 'motion_CI'
                },
                {
                    kind: 'block',
                    type: 'motion_CS'
                },
                {
                    kind: 'block',
                    type: 'motion_PU'
                },
                {
                    kind: 'block',
                    type: 'motion_F'
                },
                {
                    kind: 'block',
                    type: 'motion_FI'
                },
                {
                    kind: 'block',
                    type: 'motion_D'
                },
                {
                    kind: 'block',
                    type: 'motion_TN'
                },
                {
                    kind: 'block',
                    type: 'motion_TF'
                },
                {
                    kind: 'block',
                    type: 'motion_DR'
                },
                {
                    kind: 'block',
                    type: 'motion_MG'
                },
                {
                    kind: 'block',
                    type: 'motion_SI'
                },
                {
                    kind: 'block',
                    type: 'motion_T'
                },
                {
                    kind: 'block',
                    type: 'control_R'
                }
            ]
        }
        // {
        //     kind:'category',
        //     name:'test1',
        //     categorystyle:'logic_category',
        //     contents: [
        //         {
        //             kind: 'block',
        //             type:'math_number'
        //         },
        //         {
        //         kind: 'sep',
        //         'gap': '32'
        //         },
        //         {
        //         kind: 'block',
        //         'blockxml': '<block type='math_arithmetic'><field name='OP'>ADD</field></block>'
        //         },
        //         {
        //         kind: 'sep',
        //         'gap': '80'
        //         },
        //         {
        //         kind: 'block',
        //         'blockxml': '<block type='math_arithmetic'><field name='OP'>MINUS</field></block>'
        //         },
        //         {
        //         kind: 'button',
        //         'text': 'A button',
        //         'callbackKey': 'myFirstButtonPressed'
        //         },
        //     ]
        // }
    ]
};

export default toolbox;
