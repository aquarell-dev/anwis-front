import { useEffect, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { IOrder } from "../../../../../features/order/order.types";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { IOrderForm } from "../../types";

const useDocuments = (setValue: UseFormSetValue<IOrderForm>, order?: IOrder) => {
  const [documents, setDocuments] = useState<number[]>([]);

  const { lastUpdatedDocument } = useTypedSelector((state) => state.document);

  useEffect(() => {
    if (lastUpdatedDocument)
      setDocuments((prev) => [...prev, lastUpdatedDocument.id]);

    return () => setDocuments([]);
  }, [lastUpdatedDocument]);

  useEffect(() => setValue('documents', documents), [documents]);
};

export default useDocuments;
