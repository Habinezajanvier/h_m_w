export const ewayBillsQuery = `
{
    getEWayBills(limit: 1000){
      id
      ewayBillNumber
      validfrom
      validto
      toDid
      toLocation
    }
  }

`;
