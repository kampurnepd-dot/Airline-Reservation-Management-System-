const pool = require("../db");
const client = require("../client");

async function FlightSearch(req,res) {
    const{dept_airport_code,arr_airport_code,date, passengers} = req.body;

    const dept = await pool.query("select airport_id from Airport where airport_code = $1",[dept_airport_code]) ;
    const arr = await pool.query("select airport_id from Airport where airport_code = $1",[arr_airport_code]) ;

    const cached_flights = await client(hscan )
  try {
     const Flights = await pool.query("select fs*,count(sr.seat_reservation_id) as sno,ar.capacity as c,fp.cabin_class, fp.base_price
        from Flight_Schedule as fs
        left join  Seat_Reservation as sr
        on fs.schedule_id = sr.schedule_id
        join Aircraft as ar
        on fs.aircraft_id = ar.aircraft_id
        join Flight_Fare as fp
        on fs.schedule_id = fp.schedule_id
        WHERE fs.source_airport_id = $1 and fs.destination_airport_id = $2 and Date( departure_time) = $3 and
        sr. reservation_status = 'Reserved'
        group by fs.schedule_id",[dept,arr,date]
      ) ;
    if(!Flights) return ;
    Flights = Flights.filter((f) =>  f.c - f.sno >= passengers );
    return res.json{success:true,fly:Flights};




    }
    catch(error) {

    }








}