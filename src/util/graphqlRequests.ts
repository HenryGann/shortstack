import { gql } from '@apollo/client';

const getByShort = gql`query GetByShort($short: String!) {
  getByShort(short: $short) {
    long
  }
}`;

const createNewMapping = gql`mutation CreateNewMapping($long: String!) {
  createNewMapping(long: $long) {
    message
    success
  }
}`;

export { getByShort, createNewMapping };