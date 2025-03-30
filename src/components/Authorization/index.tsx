import { useNavigate  } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import styles from './styles.module.scss';
export const Authorization = () => {
    const [form] = Form.useForm();
    const { Link } = Typography;
    const onFinish = () => {
        console.log('Succes');
    }
    const navigate = useNavigate();
    return (
        <div className={styles.containerAuthorization}>
            <div className={styles.formContainer}>
            <h3>Авторизация</h3>
            <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{ margin: 5}}
            >
                <Form.Item
                    style={{ margin: 0, marginBottom: 9}}
                    >
                    <Input
                    placeholder='Логин'/>
                </Form.Item>
                
                <Form.Item
                style={{ marginBottom: 9}}
                >
                    <Input
                    placeholder='Пароль'/>
                </Form.Item>
                <div className={styles.linked}>
                    <Link style={{ color: 'black', opacity: 0.5 }}>Забыли Пароль?</Link>
                    <Link onClick={() => navigate('/registration')} style={{ color: 'black', opacity: 0.5 }}>Регистрация</Link>
                </div>
                <Button 
                        className={styles.button}
                        // type="primary"
                        size="middle"
                        style={{ margin: '0 auto', display: 'block' }}
                    >
                        Войти
                </Button>
            </Form>
        </div>
    </div>
    );
}