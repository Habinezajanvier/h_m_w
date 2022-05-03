export const getEwayBills = `
query getEwayBills($limit: Float!){
  getEWayBills(limit: $limit){
    id
    ewayBillNumber
    validfrom
    validto
    toDid
    toLocation
  }
}
`;
