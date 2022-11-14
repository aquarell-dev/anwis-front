import React, { FC, useState } from "react";
import { GridSelectionModel, GridToolbarContainer } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useDeleteProductsMutation } from "../../../../../../store/api/product.api";
import useNotifications from "../../../../../../hooks/useNotifications";
import { SpinnerComponent } from "react-element-spinner";
import DeletePopup from "../../../components/DeletePopup";

const Toolbar: FC<{ selectionModel: GridSelectionModel }> = ({
  selectionModel,
}) => {
  const [deleteProducts, { isLoading }] = useDeleteProductsMutation();
  const { notifySuccess, notifyError } = useNotifications();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DeletePopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        customContent='Вы уверены, что хотите удалить эти продукты?'
        onDelete={() =>
          deleteProducts(selectionModel as number[])
            .unwrap()
            .then(() => notifySuccess("Товары были удалены"))
            .catch(() => notifyError("Товары не были удалены"))
            .finally(() => setDeleteOpen(false))
        }
      />
      <GridToolbarContainer className='flex items-center justify-end'>
        <Button
          variant={"contained"}
          sx={{
            m: 1,
            width: "350px",
          }}
          onClick={() => setDeleteOpen(!deleteOpen)}
        >
          <SpinnerComponent loading={isLoading} position={"inline"} />
          {!isLoading && <p>Удалить выбранные</p>}
        </Button>
      </GridToolbarContainer>
    </>
  );
};

export default Toolbar;
