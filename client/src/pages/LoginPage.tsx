import LoginForm from "../components/LoginForm";
import '../styles/LoginPage.css';

function LoginPage() {
    return (
    <div>
        <div className='login-page-container'>
            <div className="login-form-container">
                <LoginForm />
            </div>
            
        </div> 
    </div>
    );
}

export default LoginPage;