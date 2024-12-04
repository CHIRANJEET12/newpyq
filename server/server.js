import express from "express";
import pg from 'pg';
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from 'dotenv'
import cors from 'cors';


env.config();

const app = express();
const port = process.env.PORT ?? 8282;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true,
}));

app.use(express.json());


app.use(session({
  secret: process.env.SECRET_KEY, // Replace with a secure key
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.get("/auth/google",passport.authenticate("google",{
  scope:["profile","email"],
}))

app.get("/auth/google/callback", (req, res, next) => {
  console.log("Callback route hit");
  next();
}, passport.authenticate("google", {
  successRedirect: "http://localhost:5173/",
  failureRedirect: "http://localhost:5173/login",
}));



passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/google/callback",
}, async (accessToken, refreshToken, profile, cb) => {
  console.log("Access Token:", accessToken);
  console.log("Profile:", profile);
  return cb(null, profile);
}));



passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.listen(port, ()=> console.log(`Server is listening to port:${port}`));