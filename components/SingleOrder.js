/* eslint-disable react/jsx-key */
import styled from "styled-components";

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;
  time {
    font-size: 1rem;
    color: #555;
  }
`;

const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;

const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`;

const StatusPaid = styled.span`
  color: green;
`;

const StatusNotPaid = styled.span`
  color: red;
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString('fr-BJ')}</time>
        <Address>
          {rest.name}<br />
          {rest.email}<br />
          {rest.phone}<br />
          {rest.streetAddress}<br />
          {rest.postalCode} {rest.city}, {rest.country}
          {/* Affichage du statut de paiement avec une couleur spécifique */}
          {rest.paid ? (
            <p>Statut: <StatusPaid>PAYÉ</StatusPaid></p>
          ) : (
            <p>Statut: <StatusNotPaid>NON PAYÉ</StatusNotPaid></p>
          )}
        </Address>
      </div>
      <div>
        {line_items.map(item => (
          <ProductRow>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
