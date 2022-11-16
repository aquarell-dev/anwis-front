import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAcceptanceByIdQuery } from '../../../../store/api/acceptance.api';
import { ContentContainer } from '../../../ui/Container';
import Loader from '../../../ui/Loader';
import AcceptanceInfo from './components/AcceptanceInfo';
import AcceptanceNavigation from './components/AcceptanceNavigation';
import AcceptanceProductGrid from './components/AcceptanceProductGrid';

const AcceptOrder: FC = () => {
  const { id } = useParams();

  const { data: acceptance, isLoading, error } = useGetAcceptanceByIdQuery(parseInt(id ? id : '0'));

  if (isLoading) return <Loader isLoading />;

  if (!acceptance) return <p>error</p>;

  return (
    <ContentContainer>
      <AcceptanceNavigation acceptance={acceptance} />
      <AcceptanceInfo acceptance={acceptance} />
      <AcceptanceProductGrid acceptance={acceptance} />
    </ContentContainer>
  );
};

export default AcceptOrder;
