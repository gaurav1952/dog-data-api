const express = require ('express')
const sqlite = require('sqlite3').verbose()
const cors = require('cors')
const port = 3000;
const app = express()
const db = new sqlite.Database("./dog-breeds.db",sqlite.OPEN_READONLY, (err)=>{
	if(err) return console.error(err)
});

//middlewere
app.use(cors())
app.use(express.json())


app.get('/', (req, res)=>{
	res.send("hello world")
})

app.get('/dogs', async (req,res)=>{
	//logic to get data 
	 // Get pagination parameters from query string
	 const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
	 const limit = parseInt(req.query.limit) || 10; // default to 10 items per page if not provided
   
	 // Validate pagination parameters
	 if (page < 1 || limit < 1) {
	   return res.status(400).json({ status: 400, message: "Invalid pagination parameters" });
	 }
   
	 // Calculate offset for the query
	 const offset = (page - 1) * limit;
   
	 // SQL query with pagination
	 const sql = `SELECT * FROM dog_breeds LIMIT ? OFFSET ?`;
	try{
		db.all(sql, [limit,offset],(err,row)=>{
			if (err) return res.json({
				status: res.status(400),
				message: "Wrong route"
			})
			if (row.length<1) return res.status(200).json({
				status: 200,
				data: row,
				success: true,
				pagination: {
				  page: page,
				  limit: limit,
				},
			  });
		
			return res.json({status: 200, data: row, success: true})
		})
	}catch(err){
		return res.status(500).json({message: err})
	}

})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});