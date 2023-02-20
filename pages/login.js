import {React} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { client } from '../LIB/client';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { urlFor } from '../LIB/client';
import Link from 'next/link';
import Nextimport {toast} from 'react-hot-toast'


const Login = ({logo}) => {

    
    
    
    const router = useRouter();
    const responseGoogle = (response) => {
        const decoded = jwt_decode(response.credential)
    
        const {name, sub, picture, email} = decoded
        
        localStorage.setItem('user', JSON.stringify(decoded));
       
       
       
        const doc ={
            _type:'user',
            _id: sub,
            userId:sub,
            userName:name,
            image: picture,
            email: email,
        };

        

client.createIfNotExists(doc).then(() => { 
            router.push('/')
            toast.success('Login Successful')
        });
        
    };



    return (
        <GoogleOAuthProvider clientId='731443396084-tusaro7e14a6htbri7j3lpkj2hv6erit.apps.googleusercontent.com'>
            <div style={{display: 'flex', justifyContent:'start', alignItems:'center', flexDirection:'column', height:'100vh'}}>
                <div style={{position:'relative', height:'100vh', width:'100vw'}}>
                    

                   
                    <div style={{position: 'absolute', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', top:'0', left:'0', right:'0', bottom:'0', backgroundColor:'#FAF9F6'}}>
                        <div className='p-5' style={{padding:'10px'}}>
                            <img src={urlFor(logo[0].image)} alt='logo' style={{width:'180px', height:'180px', borderRadius:'10px'}}/>
                        </div>
                        <div>
                            <p style={{fontSize:'30px', fontFamily:'sans-serif', padding:' 0px 0px 15px 0px', color:'#FF5733'}}>{logo[0].name}!</p>
                        </div>
                        <div className='shadow-2xl'>
                            <GoogleLogin
                                onSuccess={(res) => responseGoogle(res)}
                                onFailure={(res) => responseGoogle(res)}
                                cookiePolicy="single_host_origin"
                            />
                        </div>
                        <Link href='/' id='guest-link'>Continue as guest</Link>
                    </div>
                    
                </div>
            </div>
        </GoogleOAuthProvider>

    )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "logo"]';
    const logo = await client.fetch(query);
    
  
    return {
      props: { logo }
    }
  }

export default Login

