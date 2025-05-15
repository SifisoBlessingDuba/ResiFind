const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const JWT_SECRET= 'your_jwt-secret_key';

const authenticate =(req,res, next)=>{
    const token= req.headers['authorized'];
    if (!token){
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).send("Forbidden");
        }
        req.user= user;
        next();
    });
};

app.post('/register',(req,res)=>{
    const {name,surname,ID,tel,email,password}= req.body;


bcrypt.hash(password,10,(err,hashedPassword)=>{
    if(err)throw err;

    const query='INSERT INFO admins(name,surname,ID,tel,email,password) VALUES(?,?)';
    db.query(query, [name,surname,ID,tel,email,hashedPassword],(err,results)=>{
        if(err) throw err;
        res.json({success: true});
      });
    });
});


app.post('/login',(req,res)=>{
    const {username, password}=req.body;


    const query="SELECT * FORM admins WHERE username = ?";
    db.query(query,[username], (err,results)=>{
        if(err) throw err;
        if (results.length===0){
            return res.status(401).send('Unauhorized');
        }
        const user= results[0];

        bcrypt.compare(password, user.password,(err,isMatch)=>{
            if (err) throw err;

            if (isMatch){
               const token= jwt.sign({username: user.username}, JWT_SECRET,{expiresIn:'1h'});
               res.json({token}); 
            } 
            else{
                res.status(401).send('Futseka wenazani la!')
            }
        });
    });
});