import { FC } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { IOrder } from "../../../../../../features/order/order.types";
import FileDragAndDrop from "../../../../../ui/FileDragNDrop";
import { IOrderForm } from "../../../types";
import useDocuments from "../../hooks/useDocuments";

const BottomControls: FC<{
  order?: IOrder;
  register: any;
  setValue: UseFormSetValue<IOrderForm>;
}> = ({ order, register, setValue }) => {
  useDocuments(setValue);
  console.log('123')

  return (
    <>
      <div className='flex items-end space-x-8'>
        <div className='w-1/6'>
          <p>Комментарий к заказу</p>
          <textarea
            className={"bg-gray-100 w-full h-6"}
            defaultValue={order?.commentary}
            {...register("commentary")}
          />
        </div>
        <div className='flex items-center space-x-3 w-1/6'>
          <p className='text-xl'>Черновик</p>
          <input
            type='checkbox'
            multiple={true}
            {...register("draft")}
            className='mx-3'
            defaultChecked={order?.draft}
          />
        </div>
      </div>
      <FileDragAndDrop type="document" />
    </>
  );
};

export default BottomControls;
