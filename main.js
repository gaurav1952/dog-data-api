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
//data for now 
// let books = [];

// app.post('/book', (req,res)=>{
// 	//logic to post data 
	
// })

app.get('/dogs', (req,res)=>{
	//logic to get data 
	sql = 'SELECT * FROM dog_breeds';
	try{
		db.all(sql, [],(err,row)=>{
			if (err) return res.json({
				status: res.status(400),
				message: "Wrong route"
			})
			if (row.length<1) return res.json({status:300,success: false, error: "No match" })
		
			return res.json({status: 200, data: row, success: true})
		})
	}catch{
		return res.status(500).json({message: "Server error"})
	}

})

// app.get('/book/:id', (req, res)=>{
// 	//logic to get single data
// })
// app.put('/book/:id', (req,res)=>{
// 	//logic to update data
// })
// app.delete('/book/:id', (req, res)=>{
// 	//logic to delete the data
// })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});