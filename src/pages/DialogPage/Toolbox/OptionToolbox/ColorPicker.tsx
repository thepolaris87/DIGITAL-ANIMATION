import { fabric } from 'fabric';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDialog } from '../../../../slices/dialog';
import { InputColor } from './OptionToolbox.styles';

import CheckIcon from '@mui/icons-material/Check';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

/*----- type -----*/
type COLORLIST = {
    class: string;
    color: string;
};

export default function ColorPicker({ onClick, initialColor: _initialColor }: { onClick: (color: string) => void; initialColor?: string }) {
    const { currentTarget } = useSelector(selectDialog);
    const [hex, setHex] = useState(_initialColor || '#000000');
    const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHex(e.target.value);
    };

    const onApplyClick = () => {
        onClick(hex);

        // 컬러 박스 추가
        if (hex !== 'transparent') addColorBox(hex);
    };

    /*----- colorList -----*/
    const AddColorMaxNum: number = 10; // 최대 추가 색상수
    const customColorLocalStorage = window.localStorage; // loacalStorage
    const getColorListData: string | null = customColorLocalStorage.getItem('customColor');

    // 초기값 (addColorList)
    const initialState: COLORLIST[] = getColorListData
        ? JSON.parse(getColorListData)
        : Array.from({ length: AddColorMaxNum }, (_v, i: number) => {
              return { class: `add_${99 - i}`, color: `addInit${i}` };
          });
    const [addColorList, setAddColorList] = useState<COLORLIST[]>(initialState);

    // 초기값 (defaultColorList)
    const defaultColorList: COLORLIST[] = useMemo(() => {
        return [
            '#000000', // 검은색
            '#ff0000', // 빨간색
            '#ff7f00', // 주황색
            '#ffff00', // 노란색
            '#008000', // 초록색
            '#0000ff', // 파란색
            '#000080', // 남색
            '#800080' // 보라색
        ].map((colorCode: string, i: number) => {
            return { class: String(i), color: colorCode };
        });
    }, []);

    // 기본색상목록 + 커스텀색상목록
    const arrangeColorList = useMemo<COLORLIST[]>(() => {
        return defaultColorList.concat(addColorList);
    }, [addColorList, defaultColorList]);

    /*----- Click -----*/
    // 색상박스 선택시 바로 적용
    const onApplyColor = (color: string) => {
        setHex(color);
        onClick(color);
    };
    // 컬러 박스 추가하기
    const addColorBox = useCallback(
        (colorHex: string) => {
            // 생성여부 확인
            const checkExistColor: COLORLIST | undefined = arrangeColorList.find((el: COLORLIST) => el.color === colorHex);

            //새로운 색상일 경우
            if (!checkExistColor) {
                let newAddColorList: COLORLIST[] = [...addColorList];
                const prevColorInfo: COLORLIST | undefined = newAddColorList.pop();
                if (prevColorInfo)
                    newAddColorList.unshift({
                        class: prevColorInfo.class,
                        color: colorHex
                    });
                customColorLocalStorage.setItem('customColor', JSON.stringify(newAddColorList));
                setAddColorList(newAddColorList);
            }
        },
        [addColorList, arrangeColorList, customColorLocalStorage]
    );

    useEffect(() => {
        if (_initialColor) return;
        if (currentTarget.object instanceof fabric.Textbox) {
            let start = 0;
            let end = currentTarget.object._text.length;
            if (currentTarget.object.isEditing) {
                start = currentTarget.object.selectionStart || 0;
                end = currentTarget.object.selectionEnd || 0;
            }
            const currentColor = currentTarget.object.getSelectionStyles(start, end).reduce((p, c, i) => {
                if (i === 0) return c.fill;
                return p === c.fill ? p : 'none';
            }, '');
            setHex(currentColor || '#000000');
        }
    }, [currentTarget.object, _initialColor]);

    return (
        <Box
            sx={{
                p: '8px 16px',
                width: '230px',
                borderRadius: '24px',
                position: 'absolute',
                zIndex: 100,
                background: '#fff'
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: 200,
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                    {arrangeColorList.map((el: COLORLIST, i: number) => (
                        <Box
                            component='div'
                            key={el.class + i}
                            onClick={() => !el.color.includes('addInit') && onApplyColor(el.color)}
                            sx={{
                                margin: '4px',
                                width: '24px',
                                height: '20px',
                                border: '1px solid lightgray',
                                borderStyle: el.class.includes('add') ? 'dashed' : 'solid',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: el.color === '#ffffff' || el.color === 'transparent' || el.color === '#F5F5F5' ? 'red' : 'white',
                                background: el.color
                            }}>
                            {el.color === 'transparent' && (
                                <HorizontalRuleIcon
                                    sx={{
                                        color: 'lightgray',
                                        position: 'absolute',
                                        width: '24px',
                                        height: '24px',
                                        transform: 'rotate(35deg)'
                                    }}
                                />
                            )}
                            {el.color.toLowerCase() === hex.toLowerCase() && <CheckIcon sx={{ zIndex: '100', width: '16px', height: '16px' }} />}
                        </Box>
                    ))}
                </Box>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <Box
                    sx={{
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <InputColor type='color' value={hex} onChange={onColorChange} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: 100,
                            textAlign: 'center'
                        }}>
                        <Typography className='jei-intro-subtitle'>HEX</Typography>
                        <Typography className='jei-intro-subtitle'>{hex}</Typography>
                    </Box>
                    <Button
                        size='small'
                        variant='outlined'
                        onClick={onApplyClick}
                        sx={{
                            minWidth: 10,
                            width: 50,
                            height: 30,
                            margin: 0,
                            padding: 0
                        }}>
                        적용
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
