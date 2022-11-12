import { useState } from "react";
import MetaTitle from "../../../../components/MetaTitle";
import ObjectList from "./ObjectList";
import ObjectSelect from "./ObjectSelect";
import { Box, Grid } from "@mui/material";
import { useQueryClient } from "react-query";
import { GETSOUND } from "../../../../apis/api";
import { postMessage } from "../../../../utils/util";
import MasterControl from "./MasterControl";
import { useSelector } from "react-redux";
import { selectDialog } from "../../../../slices/dialog";

export default function Objects() {
  const [openObjects, setOpenObjects] = useState(false);
  const queryClient = useQueryClient();
  const soundData = queryClient.getQueryData<GETSOUND[]>(["dialog", "sound"]);

  const onOpenClick = () => {
    postMessage({ code: "open" });
    setOpenObjects(true);
  };

  const onClose = () => {
    postMessage({ code: "close" });
    setOpenObjects(false);
  };

  const { data, currentDialog } = useSelector(selectDialog);

  if (!soundData) return null;

  return (
    <Box>
      <Grid item>
        <MasterControl />
      </Grid>
      <Box sx={{ mt: 4 }}>
        <MetaTitle>
          <MetaTitle.Title>OBJECTS</MetaTitle.Title>
          <MetaTitle.AddIcon onClick={onOpenClick} />
        </MetaTitle>
      </Box>

      <ObjectList />
      <ObjectSelect
        open={openObjects}
        onClose={onClose}
        master={Boolean(
          data.dialog.find((el) => el.id === currentDialog)?.master
        )}
      />
    </Box>
  );
}
