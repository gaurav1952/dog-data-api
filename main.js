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

app.get('/dogs', (req,res)=>{
	//logic to get data 
	const sql = 'SELECT * FROM dog_breeds';
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});