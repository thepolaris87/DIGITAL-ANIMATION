import { EditingTextWrapper, InputColor } from "./OptionToolbox.styles";

import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDialog } from "../../../../slices/dialog";
import { useMemo, useState } from "react";
import { Box } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

export default function FillColor() {
  const { currentTarget } = useSelector(selectDialog);
  const [hex, setHex] = useState("#000000");
  const [open, setOpen] = useState(false);

  const onFillColorClick = () => {
    setOpen(!open);
  };

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value);
  };

  const onApplyClick = () => {
    (currentTarget.object as fabric.Rect).set({ fill: hex });
    (currentTarget.object as fabric.Rect).canvas?.renderAll();
  };

  /*----- type -----*/
  type COLORLIST = {
    class: string;
    color: string;
  };
  //   type COLORPICKER = {
  //     colorList: COLORLIST[];
  //     color: string | null | undefined;
  //     onColorChange: (color: string) => void;
  //   };

  /*----- colorList -----*/
  const AddColorMaxNum: number = 5; // 최대 추가 색상수
  const customColorLocalStorage = window.localStorage; // loacalStorage
  const getColorListData: string | null =
    customColorLocalStorage.getItem("customColor");

  // 초기값 (addColorList)
  const initialState: COLORLIST[] = getColorListData
    ? JSON.parse(getColorListData)
    : Array.from({ length: AddColorMaxNum }, (_v, i: number) => {
        return { class: `${99 - i}`, color: `addInit${i}` };
      });
  const [addColorList, setAddColorList] = useState<COLORLIST[]>(initialState);

  // 초기값 (defaultColorList)
  const defaultColorList: COLORLIST[] = useMemo(() => {
    return ["#ffffff"].map((colorCode: string, i: number) => {
      return { class: String(i), color: colorCode };
    });
  }, []);

  // 기본색상목록 + 커스텀색상목록
  const arrangeColorList = useMemo<COLORLIST[]>(() => {
    return defaultColorList.concat(addColorList);
  }, [addColorList, defaultColorList]);

  return (
    <EditingTextWrapper sx={{ position: "relative" }}>
      <IconButton sx={{ p: 0.5 }} onClick={onFillColorClick}>
        <FormatColorFillIcon />
      </IconButton>
      {open && (
        <Grid
          sx={{
            p: "8px 16px",
            width: "230px",
            borderRadius: "24px",
            position: "absolute",
            zIndex: 100,
            background: "#fff",
          }}
          container
          alignItems="center"
          justifyContent="space-around"
          wrap="nowrap"
        >
          {arrangeColorList.map((el: COLORLIST, i: number) => (
            <Box
              component="div"
              key={el.class + i}
              // onClick={() => !el.color.includes('addInit') && onColorChange(el.color)}
              sx={{
                margin: "4px",
                width: "24px",
                height: "20px",
                border: "1px solid lightgray",
                borderStyle: el.class.includes("add") ? "dashed" : "solid",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color:
                  el.color === "#ffffff" ||
                  el.color === "transparent" ||
                  el.color === "#F5F5F5"
                    ? "red"
                    : "white",
                background: el.color,
              }}
            >
              {el.color === "transparent" && (
                <HorizontalRuleIcon
                  sx={{
                    color: "lightgray",
                    position: "absolute",
                    width: "24px",
                    height: "24px",
                    transform: "rotate(35deg)",
                  }}
                />
              )}
              {el.color.toLowerCase() === hex.toLowerCase() && (
                <CheckIcon
                  sx={{ zIndex: "100", width: "16px", height: "16px" }}
                />
              )}
            </Box>
          ))}

          {/* 커스텀 색상 선택 */}
          <Grid sx={{ mr: 2.5 }} item>
            <InputColor type="color" value={hex} onChange={onColorChange} />
          </Grid>
          <Grid sx={{ flex: 1 }} item>
            <Typography className="jei-intro-subtitle">HEX : {hex}</Typography>
            <Button size="small" variant="outlined" onClick={onApplyClick}>
              APPLY
            </Button>
          </Grid>
        </Grid>
      )}
    </EditingTextWrapper>
  );
}
