import styled from 'styled-components';

interface IOrderProps {
  border: string;
  hover: string;
}

const Order = styled.div<IOrderProps>`
  background-color: #f3f4f6;
  border: 4px solid ${props => props.border};
  padding: 8px 12px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  height: 250px;
  
  &:hover {
    background-color: ${props => props.hover};
  }
`;

export default Order;