
export const getQuery = (queryName, params) => {
    let queryResult;
    let query = queries[queryName];
    let keys = Object.keys(params);
    if (keys.length > 0) {
        keys.forEach((row, index) => {
            query = query.replace(`{${row}}`, params[row]);
        });
        return query;
    } else {
        return query;
    }
}

let queries = {
    getLogin: `{
        getLogin(input:{userName:"{userName}",password:"{password}"})
           { 
               status 
               message 
               token 
           } 
         }`,
    getAllPeriod: `{
        getAllPeriod(token:"{token}"){
            status
            message
            data{
                _id
                flag
                dateFrom
                dateUp
                active
            }
        }
    }`,
    addPeriod:`mutation {
        addPeriod(token:"{token}",input:{flag:"{flag}",dateFrom:"{dateFrom}",dateUp:"{dateUp}"}){
            status
            message
            _id
          }
        }`
}
