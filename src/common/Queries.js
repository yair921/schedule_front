
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
    addPeriod: `mutation {
        addPeriod(token:"{token}",input:{flag:"{flag}",dateFrom:"{dateFrom}",dateUp:"{dateUp}"}){
            status
            message
            _id
          }
        }`,
    deletePeriod: `mutation {
        deletePeriod(token:"{token}",_id:"{_id}"){
          status
          message
        }
      }`,
    getAllTheater:`{
        getAllTheater(token:"{token}"){
          status
          message
          data{
            _id
            nombre
            active
          }
        }
      }`,
    getAllSchedule:`{
        getAllSchedule(token:"{token}"){
        status
        message
        data{
          _id
          idPeriod
          idTheater
          rooms{
            idRoom
            movies{
              idMovie
              trailer
              short
              pattern
              startAt
              startAt
              endAt
            }
          }
          active
        }
      }
    }`,
    getOneSchedule:`{
        getOneSchedule(token:"{token}",idTheater:"{idTheater}",idPeriod:"{idPeriod}"){
          status
          message
          data{
            _id
            idPeriod
            idTheater
            rooms{
              idRoom
              roomName
              roomNumber
              movies{
                idMovie
                movieName
                duration
                trailer
                short
                pattern
                cleaningTime
                startAt
                endAt
              }
            }
            active
          }
        }
      }`,
      getAllRoom:`{
        getAllRoom(token:"{token}"){
          status
          message
          data{
            _id
            idTheater
            roomNumber
            roomName
            numberChairs
            cleaningTimes{
              idMovieFormat
              cleaningTime
            }
            active
          }
        }
      }`
}
