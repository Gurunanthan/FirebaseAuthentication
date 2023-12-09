import { useState }  from 'react'
import { createUserWithEmailAndPassword , signInWithPopup , signOut} from 'firebase/auth'
import { auth ,gooleAuth } from './firebase.utils.js'

const Auth = () => {
  const[email , setEmail] = useState("")
  const[password, setPassword] = useState("")

  console.log(auth?.currentUser?.photoURL);

  const handleSignIn = async () =>{
    try{
    await createUserWithEmailAndPassword(auth , email , password)
  } catch(err){
    console.error(err);
  }}

  const handleGoogleSignIn = async () =>{
    try{
    await signInWithPopup(auth , gooleAuth)
  } catch(err){
    console.error(err);
  }}

  const handleSignOut = async () =>{
    try{
    await signOut(auth)
  } catch(err){
    console.error(err);
  }}

  return (
    <div>
        <input type='email' placeholder='email....' onChange={e => setEmail(e.target.value)}/>
        <input type='password'  placeholder='password...' onChange={e => setPassword(e.target.value)}/>
        <button onClick={handleSignIn}>Sign in</button>
        <button onClick={handleGoogleSignIn}>Sign In With Google</button>
        <button onClick={handleSignOut}>Log Out</button>


    </div>
  )
}

export default Auth