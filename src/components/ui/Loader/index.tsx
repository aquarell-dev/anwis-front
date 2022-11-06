import { FC } from 'react';
import { RingLoader } from 'react-spinners';
import { AbsoluteCenteredContainer } from '../Container';

const Loader: FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  return (
    <AbsoluteCenteredContainer>
      <RingLoader
        color={'#059669'}
        loading={isLoading || false}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </AbsoluteCenteredContainer>
  );
};

export default Loader;