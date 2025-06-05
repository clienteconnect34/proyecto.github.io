
const express=require('express');
const bodyparser=require('body-parser');
// const mysql=require('mysql2')
const mysql=require('mysql2/promise');
const path=require('path');
const session=require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const moment=require('moment');
const PORT = 3000;

// Middlewares
 const app=express()
 app.use(bodyparser.urlencoded({extended:true}))
 app.use(bodyparser.json())
 app.use(express.static(__dirname))
 app.use(express.static(path.join(__dirname)))

// Conexión a MySQL (XAMPP)
const db = {
  host: 'localhost',
  user: 'root',
  password: '', // por defecto en XAMPP
  database: 'client_connect'
};
// session
app.use(session({
secret:'miSecreto',
resave:false,
saveUninitialized:true
}))


// db.connect((err) => {
//     if (err) {
//       console.error('❌ Database connection failed:', err);
//       process.exit(1);
//     }
//     console.log('✅ Connected to MySQL database');
//   });


// Rutas
app.post('/guardar',async(req,res)=>{
    const { nombre, apellido, usuario, contrasena, email, seccion } = req.body;
    console.log(req.body);
    try{
        const conect=await mysql.createConnection(db)
        const [row]=await conect.execute('SELECT * FROM usuarios WHERE usuario=? AND contraseña=?',[usuario, contrasena])
        if(row.length>0){
            res.status(400).send(
            `
                <script>
                    window.onload=function(){
                        alert("usuario ya existe")
                        window.location.href='index.html'
                    }
                </script>
            `
            )
        }
        else{
            await conect.execute('INSERT INTO usuarios (nombre_usuario, apellido_usuario, usuario, contraseña, correo, ciudad) VALUES (?, ?, ?, ?, ?, ?)',[nombre, apellido, usuario, contrasena, email, seccion])
            await conect.end()
            res.status(400).send(
                `
                    <script>
                        window.onload=function(){
                            alert("usuario creado")
                            window.location.href='./samuel/Slider Client Connect Services/slider.html'
                        }
                    </script>
                `
                )
        }
        await conect.end()
    }
    catch(error){
        console.log("pinche péndejo")
        res.status(501).send(`Error=${error}`)
    }
})

// Registro de usuario

app.post('/registro', async (req, res) => {
    const { nombre, apellido, usuario, contrasena, email, seccion } = req.body;
    console.log(req.body);
  
    // if (|| !apellido || !usuario || !contrasena || !correo || !seccion) {
    //   return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    // }    
  
    try {
      // const hashedPassword = await bcrypt.hash(contrasena, 10);
  
      const sql = `
        INSERT INTO usuarios (nombre_usuario, apellido_usuario, usuario, contraseña, correo, ciudad)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [nombre, apellido, usuario, contrasena, email, seccion];
  
      const conect= await mysql.createConnection(db)
   
      const [row] = await conect.query(sql, values, (err, result) => {
       if(row.length > 0){
          return res.status(409).json({ mensaje: 'El usuario ya existe' });
        }
        else{

          
          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({ mensaje: 'El usuario ya existe' });
            }
            console.error('Error al registrar:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
          }
          
          res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
          console.log('Usuario registrado:', result);
          
        }
      });
    } catch (error) {
      console.error('Error al hashear contraseña:', error);
      res.status(500).json({ mensaje: 'Error interno' });
    }
  });
  

// Inicio de sesión
app.post('/login', async(req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
    try{
      const conect=await mysql.createConnection(db)
      const [rows]= await conect.execute('SELECT * FROM usuarios WHERE usuario=? and contraseña=?',[username,password])
      console.log(rows)
      if(rows.length > 0){
        res.status(201).send (`
          <script>
            window.onload=function(){
              alert("bienvenido")
              window.location.href='./samuel/Slider Client Connect Services/slider.html' 
            }   
          </script>
        `)
      }
      else{
        res.status(401).send(`
          <script>
            window.onload=function(){
              alert("usuario no encontrado")
              window.location.href='/registro.html'
            }   
          </script>
        `)
      }
    }
    catch(error){
      onsole.log('error en:',error)
      res.status(501).send('error=${error}')
  }
});
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
