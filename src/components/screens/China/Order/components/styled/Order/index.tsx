import styled from 'styled-components'

interface IOrderProps {
  border: string
  hover: string
}

const Order = styled.div<IOrderProps>`
  background-color: #f3f4f6;
  border: 4px solid ${props => props.border};
  border-radius: 3px;
  width: 100%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  min-height: 250px;

  &:hover {
    background-color: ${props => props.hover};
  }
`

export default Order
