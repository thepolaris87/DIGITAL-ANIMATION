import { alpha, Box, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaTitle from '../../../../components/MetaTitle';
import { DATADIALOG, selectDialog, setSceneEffect, transitionEffects } from '../../../../slices/dialog';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function Effect() {
    const { currentDialog, data, render } = useSelector(selectDialog);
    const [value, setValue] = useState<number>();
    const dispatch = useDispatch();

    const currentEffect: CURRENTEFFECT = data.dialog.find((el: DATADIALOG) => el.id === currentDialog)?.scene.effect || { type: 'disappear', duration: 3000 };

    const onBlurDuration = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(
            setSceneEffect({
                ...currentEffect,
                duration: Number(e.target.value)
            })
        );
    };

    const onChangeDuration = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(Number(e.target.value));
    };

    /*----- TypeEffect -----*/
    // duration에 따라 적용되어야 하므로 내부에 작성함
    const useStyles = useMemo(
        () =>
            makeStyles({
                default: {},
                disappear: {
                    animation: `$disappear ${currentEffect.duration}ms infinite` // ${theme.transitions.easing.easeInOut}
                },
                fadeOut: {
                    animation: `$fadeOut ${currentEffect.duration}ms infinite` // ${theme.transitions.easing.easeInOut}
                },
                flyOutLeft: {
                    animation: `$flyOutLeft ${currentEffect.duration}ms infinite` // ${theme.transitions.easing.easeInOut}
                },
                flyOutRight: {
                    animation: `$flyOutRight ${currentEffect.duration}ms infinite` // ${theme.transitions.easing.easeInOut}
                },
                flyOutTop: {
                    animation: `$flyOutTop ${currentEffect.duration}ms infinite` // ${theme.transitions.easing.easeInOut}
                },
                flyOutBottom: {
                    animation: `$flyOutBottom ${currentEffect.duration}ms infinite` // ${theme.transitions.easing.easeInOut}
                },
                '@keyframes disappear': {
                    '0%': {
                        opacity: 0
                    },
                    '100%': {
                        opacity: 1
                    }
                },
                '@keyframes fadeOut': {
                    '0%': {
                        opacity: 1
                    },
                    '100%': {
                        opacity: 0
                    }
                },
                '@keyframes flyOutLeft': {
                    '0%': {
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        transform: 'translateX(-200%)'
                    }
                },
                '@keyframes flyOutRight': {
                    '0%': {
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        transform: 'translateX(200%)'
                    }
                },
                '@keyframes flyOutTop': {
                    '0%': {
                        transform: 'translateY(0)'
                    },
                    '100%': {
                        transform: 'translateY(-200%)'
                    }
                },
                '@keyframes flyOutBottom': {
                    '0%': {
                        transform: 'translateY(0)'
                    },
                    '100%': {
                        transform: 'translateY(200%)'
                    }
                }
            }),
        [currentEffect.duration]
    );
    const getTypeEffect = (effect: string) => {
        const findType: string | undefined = ['disappear', 'fadeOut', 'flyOutLeft', 'flyOutRight', 'flyOutTop', 'flyOutBottom'].find((str: string) => str === effect);
        if (findType) return effect as 'disappear' | 'fadeOut' | 'flyOutLeft' | 'flyOutRight' | 'flyOutTop' | 'flyOutBottom';
        else return 'default';
    };
    const classes = useStyles();

    /*----- Type -----*/
    type TRANSITIONEFFECTS = {
        value: string;
        display: string;
    };

    type CURRENTEFFECT = {
        type: string;
        duration: number;
    };

    type ARRANGETRANSITIONEFFECTS = {
        value: string;
        display: string;
        isHover: boolean;
    };

    /*----- info -----*/
    const arrangeTransitionEffectsInit = useMemo<ARRANGETRANSITIONEFFECTS[]>(() => {
        return transitionEffects.map((el: TRANSITIONEFFECTS) => {
            return { ...el, isHover: false };
        });
    }, []);

    const [arrangeTransitionEffects, setArrangeTransitionEffects] = useState<ARRANGETRANSITIONEFFECTS[]>(arrangeTransitionEffectsInit);

    const onChangeTypeHover = useCallback(
        (type: string, setHover: boolean) => {
            const newIsHover: ARRANGETRANSITIONEFFECTS[] = arrangeTransitionEffects.map((el: ARRANGETRANSITIONEFFECTS) => {
                if (setHover) {
                    return el.value === type ? { ...el, isHover: setHover } : { ...el, isHover: !setHover };
                } else {
                    return { ...el, isHover: setHover };
                }
            });
            setArrangeTransitionEffects(newIsHover);
        },
        [arrangeTransitionEffects]
    );

    /*----- Click -----*/
    const onChangeType = (type: string) => {
        dispatch(setSceneEffect({ ...currentEffect, type: type }));
    };

    useEffect(() => {
        if (typeof value !== 'number') {
            setValue(currentEffect.duration);
        }
    }, [value, currentEffect.duration]);

    return (
        <Box sx={{ mt: 4 }}>
            {/* 상단 */}
            <MetaTitle>
                <MetaTitle.Title>Transition</MetaTitle.Title>
            </MetaTitle>

            {/* 목록 */}
            {/* container */}
            <Box
                sx={{
                    overflow: 'scroll',
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    height: 200,
                    padding: 1
                }}>
                {arrangeTransitionEffects.map((el: ARRANGETRANSITIONEFFECTS) => {
                    return (
                        // 효과 Wrapper
                        <Box
                            key={el.value}
                            sx={{
                                minWidth: 170,
                                width: 170,
                                height: 170,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 3,
                                ml: 1,
                                cursor: currentEffect.type === el.value ? 'default' : 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10
                            }}
                            onClick={() => {
                                onChangeType(el.value);
                            }}
                            onMouseOver={() => {
                                onChangeTypeHover(el.value, true);
                            }}
                            onMouseLeave={() => {
                                onChangeTypeHover(el.value, false);
                            }}>
                            {/* type title */}
                            <Box
                                sx={{
                                    color: 'white',
                                    bgcolor: currentEffect.type === el.value ? '#E0144C' : '#3C4048',
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: 0.5,
                                    position: 'absolute',
                                    top: 0,
                                    zIndex: 1
                                }}>
                                {el.display}
                            </Box>
                            {/* @ts-ignore */}
                            {(el.isHover || true) && render?.[currentDialog]?.backgroundImage?._element?.src && (
                                <Box
                                    className={el.isHover ? classes[getTypeEffect(el.value)] : ''}
                                    component='img'
                                    sx={{
                                        width: '60%',
                                        height: '60%'
                                    }}
                                    alt='Load Fail'
                                    // @ts-ignore
                                    src={render?.[currentDialog]?.backgroundImage?._element.src}></Box>
                            )}
                            {!el.isHover && (
                                // 재생 cover
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        bgcolor: alpha('#3C4048', 0.5),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <PlayCircleOutlineIcon sx={{ width: '30%', height: '30%', color: 'gray' }} />
                                </Box>
                            )}

                            {/* 시간 설정 영역*/}
                            {currentEffect.type === el.value && (
                                // Wrapper
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        m: 0,
                                        p: 0,
                                        height: 30,
                                        position: 'absolute',
                                        bottom: 0
                                    }}>
                                    <TextField
                                        variant='standard'
                                        name='duration'
                                        value={value || 0}
                                        size='small'
                                        type='number'
                                        sx={{ width: '60px', height: '30px', marginRight: '8px' }}
                                        onChange={onChangeDuration}
                                        onBlur={onBlurDuration}
                                        error={(currentEffect?.duration || 0) < 0}
                                    />
                                    <Box>ms</Box>
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
